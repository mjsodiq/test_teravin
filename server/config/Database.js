import { Sequelize } from "sequelize";
import SQLite from "sqlite3";

export const db = new Sequelize("user_db", "root", "", {
    dialect: "sqlite",
    storage: "./data.sqlite",
    dialectOptions: {
        mode: SQLite.OPEN_READWRITE | SQLite.OPEN_CREATE | SQLite.OPEN_FULLMUTEX,
    },
    define: {
        timestamps: false,
    },
});
