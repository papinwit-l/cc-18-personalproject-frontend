import React, { useState } from "react";
import Register from "./Register";

import useUserStore from "../stores/userStore";

function Login() {
  const [form, setForm] = useState({
    identity: "",
    password: "",
  });
  const [loginError, setLoginError] = useState(false);
  const [loginErrorMsg, setLoginErrorMsg] = useState("");

  const login = useUserStore((state) => state.login);

  const loginValidate = () => {
    if (!form.identity || !form.password) {
      setLoginError(true);
      setLoginErrorMsg("Please fill in all fields");
      return false;
    }
    setLoginError(false);
    return true;
  };

  const hdlSubmit = async (e) => {
    e.preventDefault();
    if (!loginValidate()) return;
    try {
      const res = await login(form);
      // console.log(res);
    } catch (error) {
      console.log(error);
      setLoginError(true);
      setLoginErrorMsg(error.response.data.message);
    }
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
      <div className="w-screen h-screen flex justify-center items-center bg-[url(./src/assets/pics/bg_logo_repeat.jpg)] bg-[length:300px_300px] bg-[#cfcfcf]">
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
            {loginError && (
              <div className="alert alert-error shadow-lg relative">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current flex-shrink-0 h-6 w-6 absolute right-2 top-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    onClick={() => setLoginError(false)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{loginErrorMsg}</span>
                </div>
              </div>
            )}
            <button className="btn btn-primary text-white">Login</button>
            {/* <a href="#" className="text-center text-[#0000EE] hover:underline">
              Forgot password?
            </a> */}
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
