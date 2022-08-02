import express from "express";
import { db } from "../config/Database.js";
import { user_GETALL, user_CREATE, user_UPDATE, user_DELETE, user_GETDATA_BYID } from "../controllers/userController.js";
import { user_db } from "../models/user_models.js";
const router = express.Router();

router.get("/user", user_GETALL);
router.post("/user", user_CREATE);
router.get("/user/:id", user_GETDATA_BYID);
router.patch("/user/:id", user_UPDATE);
router.delete("/user/:id", user_DELETE);
router.get("/", (req, res) => {
    let ids = [];
    let idTotal = [];
    for (let i = 1; i < 201; i++) {
        let id_tahun = 0;
        while (id_tahun < 2022) {
            id_tahun = Math.floor(Math.random() * 2023);
        }

        if (!ids.includes(id_tahun)) {
            ids.push(id_tahun);
        } else {
            const id_bulan = `0${Math.floor(Math.random() * 6) + 1}`.slice(-2);
            let id_identity = `0000`;
            let id_identity2 = 1;
            let id_identity3 = `${id_identity}${id_identity2}`.slice(-4);
            let id_identity4 = `${id_tahun}${id_bulan}${id_identity3}`;
            while (idTotal.includes(id_identity4)) {
                id_identity2 += 1;
                id_identity3 = `${id_identity}${id_identity2}`.slice(-4);
                id_identity4 = `${id_tahun}${id_bulan}${id_identity3}`;
            }
            idTotal.push(id_identity4);
        }
    }
    idTotal.forEach(async (id) => {
        const name = `User ${id}`;
        const email = `email_${id}@email.com`;
        const integer_1 = Math.floor(Math.random() * 4) + 2;
        const integer_2 = Math.floor(Math.random() * 10000000000001);
        const mobile = "08" + `${integer_2}`.slice(-12);
        let birthday_year = Math.floor(Math.random() * 2003) + 2;
        const birthday_month = `0${Math.floor(Math.random() * 12) + 1}`.slice(-2);
        while (birthday_year < 1950) {
            birthday_year = Math.floor(Math.random() * 2007) + 2;
        }
        const birthday_date = `0${Math.floor(Math.random() * 27) + 1}`.slice(-2);
        const birthday = `${birthday_year}-${birthday_month}-${birthday_date}`;
        const address = [];
        for (let j = 1; j <= integer_1; j++) {
            const data_Address = `User ${id} address ${j}`;
            address.push(data_Address);
        }
        try {
            await user_db.create({
                id,
                name,
                email,
                mobile,
                birthday,
                address,
            });
            console.log(`sukses menambahkan data ke - ${idTotal.indexOf(id) + 1}/200`);
        } catch (error) {
            console.log(error);
        }
    });
    console.log(ids);
    res.json({ msg: "completed" });
});

export default router;
