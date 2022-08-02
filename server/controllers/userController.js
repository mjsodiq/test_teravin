import { user_db } from "../models/user_models.js";

export const user_GETALL = async (req, res) => {
    try {
        const data = await user_db.findAll();
        res.json(data);
    } catch (error) {}
};

export const user_GETDATA_BYID = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await user_db.findAll({
            where: {
                id: id,
            },
        });
        res.json({ status: "success", msg: "data ditemukan", data: data[0] });
    } catch (error) {
        res.status(400).json({ status: "gagal", msg: "data tidak ditemukan" });
    }
};

export const user_GETDATA_BYNAME = async (req, res) => {
    const name = req.body.name;
    try {
        const data = await user_db.findAll({
            where: {
                name: name,
            },
        });
        res.json({ status: "success", msg: "data ditemukan", data: data });
    } catch (error) {
        res.status(400).json({ status: "gagal", msg: "data tidak ditemukan" });
    }
};

export const user_GETDATA_BYEMAIL = async (req, res) => {
    const email = req.body.email;
    try {
        const data = await user_db.findAll({
            where: {
                email: email,
            },
        });
        res.json({ status: "success", msg: "data ditemukan", data: data });
    } catch (error) {
        res.status(400).json({ status: "gagal", msg: "data tidak ditemukan" });
    }
};

export const user_CREATE = async (req, res) => {
    console.log(req.body);

    // Definisikan data input
    const name = req.body.name;
    const email = req.body.email;
    const mobile = req.body.mobile;
    const birthday = req.body.birthday;
    const address = req.body.address;

    // Definisikan data yang telah terdaftar
    const Data_Terdaftar = await user_db.findAll({
        attributes: ["id", "name", "email"],
    });

    // Periksa apakah ada email yang telah terdaftar
    const Email_Terdaftar_array = Data_Terdaftar.map((item) => item.dataValues["email"]);
    if (Email_Terdaftar_array.includes(email)) return res.status(400).json({ status: "gagal", msg: "email sudah terdaftar" });

    // Generate ID Baru
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = `0${currentDate.getMonth() + 1}`.slice(-2);
    const ID_Terdaftar_array = Data_Terdaftar.map((item) => item.dataValues.id);
    let nomorUrut = 1;
    let currentID = `0000${nomorUrut}`.slice(-4);
    let newID = `${currentYear}${currentMonth}${currentID}`;
    while (ID_Terdaftar_array.includes(newID)) {
        nomorUrut += 1;
        currentID = `0000${nomorUrut}`.slice(-4);
        newID = `${currentYear}${currentMonth}${currentID}`; //ID BARU TERBUAT
    }

    // Tentukan data yang akan diinput ke database
    const data = {
        id: newID,
        name,
        email,
        mobile,
        birthday,
        address,
    };

    // Input data ke database
    try {
        await user_db.create(data);
        res.json(data);
    } catch (error) {
        console.log(error.errors[0].message);
        res.json({
            status: "error",
            msg: "tidak dapat membuat user",
        });
    }
};

export const user_UPDATE = async (req, res) => {
    /**Membutuhkan body yang berisi 2 paramter :
     * {"id": int, "data": {"name": string, "email": string, "mobile": string, address: array}}
}
     */
    console.log("user updated");
    const data = req.body.data;
    const id = req.params.id;
    try {
        await user_db.update(data, {
            where: {
                id: id,
            },
        });
        res.json({ status: "success", msg: "data berhasil diupdate" });
    } catch (error) {
        console.log(error);
        res.json({
            status: "error",
            msg: "data gagal",
        });
    }
};

export const user_DELETE = async (req, res) => {
    try {
        user_db.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.json({
            status: "success delete",
            msg: `Data ${id} telah dihapus`,
        });
    } catch (error) {}
};
