import { Sequelize } from 'sequelize';
import env from "dotenv"
import User from "../models/userModel"
env.config();

const sequelize = new Sequelize(
    process.env.MYSQL_DB as string,
    process.env.MYSQL_USER as string,
    process.env.MYSQL_PASSWORD as string,
    {
        host: process.env.MYSQL_HOST,
        port: 3306,
        dialect: 'mysql',

    }
);

export const connectToMysql = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connected to MySql database");
        await sequelize.sync({ alter: true })
        console.log("model synced ");
    } catch (err) {
        console.log("Mysql connection error", err);
    }
}



export default sequelize;
