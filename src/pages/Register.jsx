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
  const [registerError, setRegisterError] = useState(false);
  const [registerErrorMsg, setRegisterErrorMsg] = useState("");

  const registerValidate = () => {
    if (
      !form.username ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      setRegisterError(true);
      setRegisterErrorMsg("Please fill in all fields");
      return false;
    }
    if (form.password !== form.confirmPassword) {
      setRegisterError(true);
      setRegisterErrorMsg("Passwords do not match");
      return false;
    }
    setRegisterError(false);
    return true;
  };

  const hdlSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!registerValidate()) return;
      const res = await register(form);
      console.log(res);
    } catch (error) {
      console.log(error);
      setRegisterError(true);
      setRegisterErrorMsg(error.response.data.message);
    }
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
        {registerError && (
          <div className="alert alert-error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{registerErrorMsg}</span>
          </div>
        )}
        <div className="divider my-0"></div>
        <button className="btn btn-primary text-white">Register</button>
      </form>
    </div>
  );
}

export default Register;
