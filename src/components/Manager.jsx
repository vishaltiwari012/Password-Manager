import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef();
    const passwordRef = useRef();
    const [form, setForm] = useState({ site: "", username: "", password: "" });
    const [passwordArray, setPasswordArray] = useState([]);

    const showPassword = () => {
        passwordRef.current.type = "text";
        if (ref.current.src.includes("icons/eye-cross.svg")) {
            passwordRef.current.type = "password";
            ref.current.src = "icons/eye.svg";
        } else {
            ref.current.src = "icons/eye-cross.svg";
            passwordRef.current.type = "text";
        }
    };

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords));
        }
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: [e.target.value] });
    };

    const savePassword = (e) => {
        e.preventDefault();
        setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
        localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]));
        setForm({ site: "", username: "", password: "" })
        toast.success("Password saved successfully!!");
    };

    const deletePassword = (id) => {
        let c = confirm("Do you really want to delete this password?")
        if (c) {
            setPasswordArray(passwordArray.filter((item) => item.id !== id));
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter((item) => item.id !== id)))
            toast.success("Password deleted successfully!!");
        }
    };

    const editPassword = (id) => {
        setForm(passwordArray.filter((item) => item.id === id)[0])
        setPasswordArray(passwordArray.filter((item) => item.id !== id));
    };

    const copyText = (text) => {
        toast.success("Copy to Clipboard!!");
        navigator.clipboard.writeText(text);
    };

    return (
        <>

            <div
                className="absolute inset-0 -z-10 h-full w-full 
        bg-blue-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),
            linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] 
            bg-[size:14px_24px]"
            >
                <div
                    className="absolute left-0 right-0 top-0 -z-10 m-auto 
                h-[310px] w-[310px] rounded-full bg-green-500 
                opacity-20 blur-[100px]"
                ></div>
            </div>

            <div className="md:my-container p-3 ">
                <h1 className="text-green-700 text-4xl font-bold text-center">
                    <span className="text-blue-700">&lt;</span>
                    <span>Pass</span>
                    <span className="text-blue-700">OP/&gt;</span>
                </h1>
                <p className="text-green-900 text-center text-lg">
                    Your own Password Manager
                </p>
                <form onSubmit={savePassword}>
                <div className="flex flex-col p-4 text-black gap-8 items-center">
                    <input
                        type="text"
                        name="site"
                        id="site"
                        required
                        value={form.site}
                        onChange={handleChange}
                        placeholder="Enter website name"
                        className="rounded-full border border-blue-500 w-full p-4 py-1"
                    />
                    <div className="flex flex-col md:flex-row w-full justify-between gap-5">
                        <input
                            type="text"
                            name="username"
                            placeholder="Enter username"
                            value={form.username}
                            required
                            onChange={handleChange}
                            id="username"
                            className="rounded-full border border-blue-500 w-full p-4 py-1"
                        />
                        <div className="relative">
                            <input
                                ref={passwordRef}
                                type="password"
                                name="password"
                                required
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Enter password"
                                id="password"
                                className="rounded-full border border-blue-500 w-full p-4 py-1"
                            />

                            <span
                                className="absolute right-[8px] top-[10px] cursor-pointer"
                                onClick={showPassword}
                            >
                                <img ref={ref} width={14} src="icons/eye.svg" alt="" />
                            </span>
                        </div>
                    </div>
                    <button type="submit"
                        className="flex justify-center items-center gap-2 bg-green-500 rounded-full px-8 py-2 w-fit hover:bg-green-400 border border-green-400"
                    >
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover"
                        ></lord-icon>
                        Save
                    </button>
                </div>
                </form>

                <div className="passwords">
                    <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No passwords to show</div>}
                    {passwordArray.length !== 0 && (
                        <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                            <thead className="bg-green-800 text-white">
                                <tr>
                                    <th className="py-2">Website</th>
                                    <th className="py-2">Username</th>
                                    <th className="py-2">Password</th>
                                    <th className="py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-green-100">
                                {passwordArray.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className="py-2 border border-white text-center">
                                                <div className="flex items-center justify-center ">
                                                    <a href={item.site} target="_blank">
                                                        {item.site}
                                                    </a>
                                                    <div
                                                        className="lordiconcopy size-7 cursor-pointer"
                                                        onClick={() => {
                                                            copyText(item.site);
                                                        }}
                                                    >
                                                        <lord-icon
                                                            style={{
                                                                width: "25px",
                                                                height: "25px",
                                                                paddingLeft: "3px",
                                                                paddingTop: "5px",
                                                            }}
                                                            src="https://cdn.lordicon.com/iykgtsbt.json"
                                                            trigger="hover"
                                                        ></lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-2 border border-white text-center">
                                                <div className="flex items-center justify-center ">
                                                    <span>{item.username}</span>
                                                    <div
                                                        className="lordiconcopy size-7 cursor-pointer"
                                                        onClick={() => {
                                                            copyText(item.username);
                                                        }}
                                                    >
                                                        <lord-icon
                                                            style={{
                                                                width: "25px",
                                                                height: "25px",
                                                                paddingLeft: "3px",
                                                                paddingTop: "5px",
                                                            }}
                                                            src="https://cdn.lordicon.com/iykgtsbt.json"
                                                            trigger="hover"
                                                        ></lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-2 border border-white text-center">
                                                <div className="flex items-center justify-center ">
                                                    <span>{"******"}</span>
                                                    <div
                                                        className="lordiconcopy size-7 cursor-pointer"
                                                        onClick={() => {
                                                            copyText(item.password);
                                                        }}
                                                    >
                                                        <lord-icon
                                                            style={{
                                                                width: "25px",
                                                                height: "25px",
                                                                paddingLeft: "3px",
                                                                paddingTop: "5px",
                                                            }}
                                                            src="https://cdn.lordicon.com/iykgtsbt.json"
                                                            trigger="hover"
                                                        ></lord-icon>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="py-2 border border-white text-center">
                                                <span className="cursor-pointer mx-1" onClick={() => { editPassword(item.id) }}>
                                                    <lord-icon
                                                        style={{
                                                            width: "25px",
                                                            height: "25px",
                                                            paddingLeft: "3px",
                                                            paddingTop: "5px",
                                                        }}
                                                        src="https://cdn.lordicon.com/gwlusjdu.json"
                                                        trigger="hover"
                                                    ></lord-icon>
                                                </span>
                                                <span className="cursor-pointer mx-1" onClick={() => { deletePassword(item.id) }}>
                                                    <lord-icon
                                                        style={{
                                                            width: "25px",
                                                            height: "25px",
                                                            paddingLeft: "3px",
                                                            paddingTop: "5px",
                                                        }}
                                                        src="https://cdn.lordicon.com/skkahier.json"
                                                        trigger="hover"
                                                    ></lord-icon>
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </>
    );
};

export default Manager;
