// import mongoose, { Document } from "mongoose";
import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize";

interface IUser {
    id?: number,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: "user" | "admin"
}
class User extends Model<IUser> implements IUser {
    public id!: number;
    public firstName!: string;
    public lastName!: string;
    public email!: string;
    public password!: string;
    public role!: "user" | "admin";

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM("user", "admin"),
            defaultValue: "user"
        },
    },
    {
        sequelize,
        modelName: "User",
        tableName: "users",
        timestamps: true,
    }
)

export default User;



