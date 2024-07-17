"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const sequelize_1 = require("sequelize");
async function connection() {
    const sequelize = new sequelize_1.Sequelize({ dialect: "postgres", username: process.env.DB_USERNAME ?? "postgres", password: process.env.DB_PASSWORD ?? "postgres", host: process.env.DB_HOST ?? "127.0.0.1", port: Number(process.env.DB_PORT ?? 5432), database: process.env.DB_NAME ?? 'ans', logging: false });
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        return sequelize;
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
exports.connection = connection;
