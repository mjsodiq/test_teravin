import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../features/app_slice";

const AddressInput = (item_id) => {
    const [value, setValue] = useState("");
    return (
        <input
            key={item_id}
            type="text"
            className="border flex-1 p-1"
            value={value}
            onInput={(e) => {
                setValue(e.target.value);
            }}
        />
    );
};

function UserCreate() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [errorName, setErrorName] = useState({ error: true, msg: "" });

    const [email, setEmail] = useState("");
    const [errorEmail, setErrorEmail] = useState({ error: true, msg: "Email tidak valid" });

    const [mobile, setMobile] = useState(0);
    const [errorMobile, setErrorMobile] = useState({ error: true, msg: "" });

    const [birthday, setBirthday] = useState("");
    const [errorBirthday, setErrorBirthday] = useState({ error: true, msg: "" });

    const address_ref = useRef();
    const [addressIndex, setAddressIndex] = useState([0]);
    const [address, setAddress] = useState([
        {
            id: addressIndex[0],
            detail: <AddressInput item_id={addressIndex[0]} />,
        },
    ]);
    const button_address_onClick = (item_id) => {
        const list_id_address = addressIndex.sort(function (a, b) {
            return a - b;
        });
        const new_address_id = addressIndex[list_id_address.length - 1] + 1;

        if (list_id_address.includes(item_id) && item_id !== list_id_address[list_id_address.length - 1]) {
            setAddress([...address].filter((item) => item.id !== item_id));
        } else {
            setAddress([...address, { id: new_address_id, detail: <AddressInput item_id={new_address_id} /> }]);
            setAddressIndex([...addressIndex, new_address_id]);
        }
    };
    const [errorAddress, setErrorAddress] = useState({ error: true, msg: "" });

    const button_cancel_onClick = () => {
        navigate("../");
    };

    const verify = () => {
        // verify email
        function verify_email() {
            const sQtext = "[^\\x0d\\x22\\x5c\\x80-\\xff]";
            const sDtext = "[^\\x0d\\x5b-\\x5d\\x80-\\xff]";
            const sAtom = "[^\\x00-\\x20\\x22\\x28\\x29\\x2c\\x2e\\x3a-\\x3c\\x3e\\x40\\x5b-\\x5d\\x7f-\\xff]+";
            const sQuotedPair = "\\x5c[\\x00-\\x7f]";
            const sDomainLiteral = "\\x5b(" + sDtext + "|" + sQuotedPair + ")*\\x5d";
            const sQuotedString = "\\x22(" + sQtext + "|" + sQuotedPair + ")*\\x22";
            const sDomain_ref = sAtom;
            const sSubDomain = "(" + sDomain_ref + "|" + sDomainLiteral + ")";
            const sWord = "(" + sAtom + "|" + sQuotedString + ")";
            const sDomain = sSubDomain + "(\\x2e" + sSubDomain + ")*";
            const sLocalPart = sWord + "(\\x2e" + sWord + ")*";
            const sAddrSpec = sLocalPart + "\\x40" + sDomain; // complete RFC822 email address spec
            const sValidEmail = "^" + sAddrSpec + "$"; // as whole string

            const validateEmail = new RegExp(sValidEmail);
            if (!email) {
                setErrorEmail({
                    error: true,
                    msg: "Email tidak valid",
                });

                return false;
            }
            if (validateEmail.test(email) && email !== "") {
                setErrorEmail({
                    error: false,
                    msg: "",
                });
                return true;
            } else {
                setErrorEmail({
                    error: true,
                    msg: "Email tidak valid",
                });
                return false;
            }
        }
        // verify name
        function verify_name() {
            switch (name) {
                case "":
                    setErrorName({
                        error: true,
                        msg: "Nama tidak boleh kosong",
                    });
                    return false;
                default:
                    setErrorName({
                        error: false,
                        msg: "",
                    });
                    return true;
            }
        }

        function verify_mobile() {
            const re = new RegExp(/^\d+$/);
            if (mobile.length === 0) {
                setErrorMobile({
                    error: true,
                    msg: "Nomor Telepon Harus Diisi",
                });

                return false;
            } else if (!re.test(mobile)) {
                setErrorMobile({
                    error: true,
                    msg: "Nomor Telepon Harus Berupa Angka",
                });
                return false;
            } else {
                setErrorMobile({
                    error: false,
                    msg: "",
                });
                return true;
            }
        }

        function verify_birthday() {
            if (birthday.length === 0) {
                setErrorBirthday({
                    error: true,
                    msg: "Tanggal Lahir Harus Diisi",
                });
                return false;
            } else {
                setErrorBirthday({
                    error: false,
                    msg: "",
                });
                return true;
            }
        }

        function verify_address() {
            const address_array = address_ref.current;
            const result = [];
            const address_result = [];
            let error_message = "";
            Object.entries(address_array.children).forEach(([key, value]) => {
                Object.entries(value.children).forEach(([key2, value2]) => {
                    if (value2.nodeName === "INPUT") {
                        if (!value2.value) {
                            error_message = "Semua alamat harus diisi";
                            result.push(false);
                        } else {
                            address_result.push(value2.value);
                            result.push(true);
                        }
                    }
                });
            });
            if (result.includes(false)) {
                setErrorAddress({
                    error: true,
                    msg: error_message,
                });
                return false;
            } else {
                setErrorAddress({
                    error: false,
                    msg: "",
                });
                return true;
            }
        }

        if (verify_name() && verify_email() && verify_mobile() && verify_birthday() && verify_address()) {
            return true;
        } else {
            return false;
        }
    };

    const button_submit_onClick = () => {
        if (!verify()) {
            return;
        } else {
            const address_array = address_ref.current;
            const address_result = [];
            Object.entries(address_array.children).forEach(([key, value]) => {
                Object.entries(value.children).forEach(([key2, value2]) => {
                    if (value2.nodeName === "INPUT") {
                        if (!value2.value) {
                        } else {
                            address_result.push(value2.value);
                        }
                    }
                });
            });

            dispatch(
                addUser({
                    name: name,
                    email: email,
                    mobile: mobile,
                    birthday: birthday,
                    address: address_result,
                })
            );
            navigate("../");
        }
    };

    return (
        <div className="w-full flex items-center flex-col p-5">
            <div className="w-[500px] border relative flex rounded-t-md bg-black py-1 px-4">
                <div className=" text-xl font-bold text-white">Add Employee</div>
                <div className="absolute top-2 right-2 border rounded-full w-5 h-5 text-xs text-center ring-1 select-none text-white cursor-pointer bg-red-500 hover:bg-red-400 active:bg-red-600" onClick={button_cancel_onClick}>
                    {" "}
                    x{" "}
                </div>
            </div>
            <div className="w-[500px] border relative flex flex-col gap-4 rounded-b-md bg-white py-1 px-4">
                {/* NAMA */}
                <div className="flex w-full">
                    <label className="min-w-[150px] p-1">Name</label>
                    <div className="flex flex-col flex-1">
                        <input
                            type="text"
                            className="border flex-1 p-1"
                            value={name}
                            onInput={(e) => {
                                setName(e.target.value);
                            }}
                        />
                        <label className={`text-xs ${errorName.error ? "text-red-500 italic" : "text-white"}`}>{errorName.msg}</label>
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
                            onInput={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                        <label className={`text-xs ${errorEmail.error ? "text-red-500 italic" : "text-white"} invisible peer-invalid:visible`}>{errorEmail.msg}</label>
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
                            onChange={(e) => {
                                setMobile(e.target.value);
                            }}
                        />
                        <label className={`text-xs ${errorMobile.error ? "text-red-500 italic" : "text-white"}`}>{errorMobile.msg}</label>
                    </div>
                </div>

                {/* BIRTHDATE */}
                <div className="flex w-full">
                    <label className="min-w-[150px] p-1">Birthdate</label>
                    <div className="flex flex-col flex-1">
                        <input
                            type="date"
                            className="border flex-1 p-1"
                            value={birthday}
                            onInput={(e) => {
                                setBirthday(e.target.value);
                            }}
                        />
                        <label className={`text-xs ${errorBirthday.error ? "text-red-500 italic" : "text-white"}`}>{errorBirthday.msg}</label>
                    </div>
                </div>

                {/* ADDRESS */}
                <div className="flex w-full">
                    <label className="min-w-[150px] p-1">Address</label>
                    <div ref={address_ref} className="flex flex-col flex-1">
                        {address.map((item) => (
                            <div className="w-full flex" key={item.id}>
                                {item.detail}
                                <button
                                    className="w-[34px] h-[34px] border rounded-sm"
                                    onClick={() => {
                                        button_address_onClick(item.id);
                                    }}>
                                    {address.indexOf(item) === address.length - 1 ? "+" : "-"}
                                </button>
                            </div>
                        ))}
                        <label className={`text-xs ${errorAddress.error ? "text-red-500 italic" : "text-white"}`}>{errorAddress.msg}</label>
                    </div>
                </div>

                {/* SUBMIT BUTTON */}
                <div className="flex gap-4 items-center justify-center p-5">
                    <button className="border rounded px-5 py-1 text-sm bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white" onClick={button_cancel_onClick}>
                        Cancel
                    </button>
                    <button className="border rounded px-5 py-1 text-sm bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white" onClick={button_submit_onClick}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UserCreate;
