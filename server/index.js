import express from "express";
import { user_db } from "./models/user_models.js";
import { db } from "./config/Database.js";
import router from "./routes/index.js";
import cors from "cors";

const app = express();

// AUTHENTICATE DATABASE CONNECTION
try {
    db.authenticate();
    // user_db.sync();
    console.log("Terhubung dengan database user");
} catch (error) {
    console.log(error);
}

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(5000, () => {
    console.log("App running di port 5000");
});
