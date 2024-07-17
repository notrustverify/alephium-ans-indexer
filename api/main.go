package main

import (
	"database/sql"
	"fmt"
	"net/http"
	"os"
	"strconv"
	"strings"

	_ "alephium-ans-indexer/api/docs"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

var db *sql.DB

const ONE_ALPH = 10e18

type DbConn struct {
	Username string
	Password string
	Host     string
	Name     string
}

// @title			ANS Indexer API
// @version		1.0
// @description	Find name or address associated to ANS
// @host			api.ans.notrustverify.ch
// @schemes		https
// @BasePath		/
func main() {

	err := godotenv.Load(".env")

	// get and set mode from env file for gin
	mode := os.Getenv("GIN_MODE")

	dbConn := DbConn{
		os.Getenv("DB_USERNAME"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_HOST"),
		os.Getenv("DB_NAME"),
	}

	if err != nil {
		fmt.Println("No env file, will use system variable")
	}

	corsConfig := cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type"},
		AllowCredentials: true,
	}

	db = connect(&dbConn)

	gin.SetMode(mode)
	router := gin.Default()
	router.Use(cors.New(corsConfig))
	router.GET("/address", getNameByAddressEndpoint)
	router.GET("/name", getAddressByNameEndpoint)

	// redict to index.html
	router.GET("/docs", func(c *gin.Context) {
		c.Redirect(http.StatusMovedPermanently, "/docs/index.html")
	})
	router.GET("/docs/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	router.Run("0.0.0.0:8080")

}

// GetNameByAddressEndpoint godoc
//
//	@Summary	Get names associated to an address
//	@Tags		name
//	@Produce	json
//	@Success	200	{array}	Name
//	@Router		/address [get]
//	@Param		strict	query	string	false	"Must fulfilled reverse and forward link"

// @Param		strict	query	string	false	"Must fulfilled reverse and forward link"
func getNameByAddressEndpoint(c *gin.Context) {
	strictFlag, err := strconv.ParseBool(c.DefaultQuery("strict", "false"))
	if err != nil {
		strictFlag = false
	}

	address := c.Query("address")
	name, err := getNameByAddress(db, address, strictFlag)
	if len(name) > 0 && err == nil {
		c.JSON(http.StatusOK, name)
	} else {
		c.JSON(http.StatusOK, make([]string, 0))
	}
}

// GetAddressByNameEndpoint godoc
//
//	@Summary	Get address associated to a name
//	@Tags		name
//	@Produce	json
//	@Success	200	{}	Address
//	@Router		/name [get]
//	@Param		name	query	string	false	"Name to resolve"
//	@Param		strict	query	string	false	"Must fulfilled reverse and forward link"
func getAddressByNameEndpoint(c *gin.Context) {
	strictFlag, err := strconv.ParseBool(c.DefaultQuery("strict", "false"))
	if err != nil {
		strictFlag = false
	}
	name := strings.ToLower(c.Query("name"))
	fmt.Println(name)

	addr, err := getAddressByName(db, name, strictFlag)
	if addr.Address != "" && err == nil {
		c.JSON(http.StatusOK, addr)
	} else {
		c.JSON(http.StatusOK, Address{})
	}
}
