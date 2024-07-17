package main

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/lib/pq"
)

type Address struct {
	Address string `json:"address"`
}

type FullName struct {
	Name           string `json:"name"`
	Capitalisation string `json:"capitalisation"`
	Expires        int32  `json:"expires"`
}

type Name struct {
	Name           string `json:"name"`
	Capitalisation string `json:"capitalisation"`
}

func connect(dbConn *DbConn) *sql.DB {
	connStr := fmt.Sprintf("postgresql://%s:%s@%s/%s?sslmode=disable", dbConn.Username, dbConn.Password, dbConn.Host, dbConn.Name)
	// Connect to database
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal(err)
	}

	return db
}

func getNameByAddress(db *sql.DB, addr string, strict bool) ([]Name, error) {

	var rows *sql.Rows
	var err error
	if strict {
		rows, err = db.Query("SELECT Name, Capitalisation FROM \"Names\" INNER JOIN \"Addresses\" addr ON \"Names\".\"linkedAddressId\" = addr.id INNER JOIN \"Addresses\" a ON \"Names\".\"reverseLinkedAddressId\" = a.id where \"Names\".\"linkedAddressId\" = \"Names\".\"reverseLinkedAddressId\" AND addr.address = $1 AND expires >= NOW() AND \"isDeleted\" = false", addr)
	} else {
		rows, err = db.Query("SELECT Name, Capitalisation FROM \"Names\" INNER JOIN \"Addresses\" addr ON \"Names\".\"linkedAddressId\" = addr.id AND addr.address = $1 AND expires >= NOW() AND \"isDeleted\" = false", addr)

	}

	if err != nil {
		fmt.Println(err)

		return []Name{}, err
	}
	defer rows.Close()

	names := []Name{}
	for rows.Next() {
		name := Name{}

		err = rows.Scan(&name.Name, &name.Capitalisation)

		if err != nil {
			fmt.Println(err)
			return []Name{}, err
		}

		names = append(names, name)
	}

	return names, err
}

func getAddressByName(db *sql.DB, name string, strict bool) (Address, error) {

	var rows *sql.Rows
	var err error
	if strict {
		rows, err = db.Query("SELECT addr.address FROM \"Names\" INNER JOIN \"Addresses\" addr ON \"Names\".\"linkedAddressId\" = addr.id INNER JOIN \"Addresses\" a ON \"Names\".\"reverseLinkedAddressId\" = a.id where \"Names\".\"linkedAddressId\" = \"Names\".\"reverseLinkedAddressId\" AND name = $1 AND expires >= NOW() AND \"isDeleted\" = false", name)
	} else {
		rows, err = db.Query("SELECT addr.address FROM \"Names\" INNER JOIN \"Addresses\" addr ON \"Names\".\"linkedAddressId\" = addr.id AND name = $1 AND expires >= NOW() AND \"isDeleted\" = false", name)
	}

	if err != nil {
		fmt.Println(err)

		return Address{}, err
	}
	defer rows.Close()

	addr := Address{}
	for rows.Next() {

		err = rows.Scan(&addr.Address)

		if err != nil {
			fmt.Println(err)
			return Address{}, err
		}
	}

	return addr, err
}
