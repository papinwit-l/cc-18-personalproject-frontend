import React, { useState } from "react";
import Register from "./Register";

function Login() {
  const [form, setForm] = useState({
    identity: "",
    password: "",
  });

  const hdlSubmit = (e) => {
    e.preventDefault();
  };

  const hdlOnchange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const showRegisterModal = (e) => {
    e.preventDefault();
    document.getElementById("register-modal-form").showModal();
  };
  return (
    <>
      <div className="w-screen h-screen bg-slate-300 flex justify-center items-center">
        <div className="mx-auto card bg-base-200 w-96 shadow-xl">
          <form className="card-body flex flex-col gap-3" onSubmit={hdlSubmit}>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                type="text"
                className="grow"
                placeholder="Username or Email"
                name="identity"
                value={form.identity}
                onChange={hdlOnchange}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                className="grow"
                placeholder="Password"
                name="password"
                value={form.password}
                onChange={hdlOnchange}
              />
            </label>
            <button className="btn btn-primary text-white">Login</button>
            <a href="#" className="text-center text-[#0000EE] hover:underline">
              Forgot password?
            </a>
            <div className="divider my-2">or</div>
            <button
              className="btn btn-secondary text-white"
              onClick={showRegisterModal}
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
      <dialog id="register-modal-form" className="modal mx-auto ">
        <div className="modal-box w-96 bg-base-200 ">
          {/* if there is a button in form, it will close the modal */}
          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={(e) => e.target.closest("#register-modal-form").close()}
          >
            ✕
          </button>
          <Register />
        </div>
      </dialog>
    </>
  );
}

export default Login;
