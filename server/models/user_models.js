import { db } from "../config/Database.js";
import { DataTypes } from "sequelize";

export const user_db = db.define("user_db", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    mobile: {
        type: DataTypes.STRING,
    },
    birthday: {
        type: DataTypes.STRING,
    },
    address: {
        type: DataTypes.JSON,
    },
});
