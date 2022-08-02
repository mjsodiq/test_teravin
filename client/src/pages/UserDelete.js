import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getUser, userSelector, deleteUser } from "../features/app_slice";

function Input({ default_value }) {
    const [value, setValue] = useState(default_value);
    return <input type="text" readOnly={true} value={value} onInput={(e) => setValue(e.target.value)} className="border rounded p-1 flex-1" />;
}

function UserDelete() {
    const dispatch = useDispatch();
    const params = useParams();
    const id = params.id;
    const user = useSelector((state) => userSelector.selectById(state, id));
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState(0);
    const [birthday, setBirthday] = useState("");
    const [address, setAddress] = useState([]);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setMobile(user.mobile);
            // setBirthday(user.birthday);

            const birthday = user.birthday;
            const newdate = new Date(birthday).toLocaleDateString("id", { year: "numeric", month: "long", day: "2-digit" });
            setBirthday(newdate);

            setAddress(user.address);
        }
    }, [user]);

    const button_cancel_onClick = () => {
        navigate("../");
    };

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    const yes = () => {
        dispatch(deleteUser(id));
    };

    return (
        <div className="w-full flex items-center flex-col p-5">
            <div className="w-[500px] border relative flex rounded-t-md bg-black py-1 px-4">
                <div className=" text-xl font-bold text-white">Delete Employee</div>
                <div className="absolute top-2 right-2 border rounded-full w-5 h-5 text-xs text-center ring-1 select-none text-white cursor-pointer bg-red-500 hover:bg-red-400 active:bg-red-600" onClick={button_cancel_onClick}>
                    {" "}
                    x{" "}
                </div>
            </div>
            <div className="w-[500px] border relative flex flex-col gap-4 rounded-b-md bg-white py-1 px-4">
                <div className="font-bold">Detail User : </div>
                {/* ID */}
                <div className="flex w-full">
                    <label className="min-w-[150px] p-1">ID</label>
                    <div className="flex flex-col flex-1">
                        <input
                            type="text"
                            className="border flex-1 p-1 bg-slate-300"
                            value={id}
                            readOnly={true}
                            onInput={(e) => {
                                setName(e.target.value);
                            }}
                        />
                    </div>
                </div>

                {/* NAMA */}
                <div className="flex w-full">
                    <label className="min-w-[150px] p-1">Name</label>
                    <div className="flex flex-col flex-1">
                        <input
                            type="text"
                            className="border flex-1 p-1"
                            value={name}
                            readOnly={true}
                            onInput={(e) => {
                                setName(e.target.value);
                            }}
                        />
                    </div>
                </div>

                {/* EMAIL */}
                <div className="flex w-full">
                    <label className="min-w-[150px] p-1">Email</label>
                    <div className="flex flex-col flex-1">
                        <input
                            type="email"
                            className="border flex-1 p-1 peer"
                            value={email}
                            readOnly={true}
                            onInput={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                    </div>
                </div>

                {/* MOBILE */}
                <div className="flex w-full">
                    <label className="min-w-[150px] p-1">Mobile</label>
                    <div className="flex flex-col flex-1">
                        <input
                            type="text"
                            pattern="[0-9]*"
                            className="border flex-1 p-1"
                            value={mobile}
                            readOnly={true}
                            onChange={(e) => {
                                setMobile(e.target.value);
                            }}
                        />
                    </div>
                </div>

                {/* BIRTHDATE */}
                <div className="flex w-full">
                    <label className="min-w-[150px] p-1">Birthdate</label>
                    <div className="flex flex-col flex-1">
                        <input type="test" className="border flex-1 p-1" value={birthday} readOnly={true} />
                    </div>
                </div>

                {/* ADDRESS */}
                <div className="flex w-full">
                    <label className="min-w-[150px] p-1">Address</label>
                    <div className="flex flex-col flex-1 gap-1">
                        {[...address].map((item, id) => {
                            return (
                                <div key={id} className={`flex flex-1 items-center justify-between gap-1`}>
                                    <Input default_value={item} />
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="text-center">Yakin ingin menghapus user ini ?</div>

                {/* SUBMIT BUTTON */}
                <div className="flex justify-end p-5">
                    <button className="border rounded px-5 py-1 text-sm bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white" onClick={button_cancel_onClick}>
                        Cancel
                    </button>
                    <button className="border rounded px-5 py-1 text-sm bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white" onClick={yes}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
export default UserDelete;
