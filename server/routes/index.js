import express from "express";
import { db } from "../config/Database.js";
import { user_GETALL, user_CREATE, user_UPDATE, user_DELETE, user_GETDATA_BYID, CREATE_DATA_SAMPEL } from "../controllers/userController.js";
import { user_db } from "../models/user_models.js";
const router = express.Router();

router.get("/user", user_GETALL);
router.post("/user", user_CREATE);
router.get("/user/:id", user_GETDATA_BYID);
router.patch("/user/:id", user_UPDATE);
router.delete("/user/:id", user_DELETE);
// router.get("/buatData", CREATE_DATA_SAMPEL);

export default router;
