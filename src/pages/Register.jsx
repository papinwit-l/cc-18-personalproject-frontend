import React, { useState } from "react";

import useUserStore from "../stores/userStore";

function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const register = useUserStore((state) => state.register);

  const hdlSubmit = async (e) => {
    e.preventDefault();
    const res = await register(form);
    console.log(res);
  };

  const hdlOnchange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="">
      <h1 className="font-bold text-2xl text-center">Create a new account</h1>
      <div className="divider my-0"></div>
      <form className="flex flex-col gap-3 pt-2" onSubmit={hdlSubmit}>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Username"
            name="username"
            onChange={hdlOnchange}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Email"
            name="email"
            onChange={hdlOnchange}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="password"
            className="grow"
            placeholder="Password"
            name="password"
            onChange={hdlOnchange}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="password"
            className="grow"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={hdlOnchange}
          />
        </label>
        <div className="divider my-0"></div>
        <button className="btn btn-primary text-white">Register</button>
      </form>
    </div>
  );
}

export default Register;
