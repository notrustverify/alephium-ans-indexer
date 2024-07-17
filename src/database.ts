import { Sequelize } from "sequelize";


export async function connection(){
   const sequelize = new Sequelize({dialect: "postgres", username: process.env.DB_USERNAME ?? "postgres", password: process.env.DB_PASSWORD ?? "postgres", host: process.env.DB_HOST ?? "127.0.0.1", port: Number(process.env.DB_PORT ?? 5432), database: process.env.DB_NAME ?? 'ans', logging: false})

   try {
      await sequelize.authenticate()
      console.log('Connection has been established successfully.');
      return sequelize

    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
}