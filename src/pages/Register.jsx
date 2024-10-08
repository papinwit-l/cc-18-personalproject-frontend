import React from "react";

function Register() {
  return (
    <div className="">
      <h1 className="font-bold text-2xl text-center">Create a new account</h1>
      <div className="divider my-0"></div>
      <form className="flex flex-col gap-3 pt-2">
        <label className="input input-bordered flex items-center gap-2">
          <input type="text" className="grow" placeholder="Username" />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <input type="text" className="grow" placeholder="Email" />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <input type="password" className="grow" placeholder="Password" />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="password"
            className="grow"
            placeholder="Confirm Password"
          />
        </label>
        <div className="divider my-0"></div>
        <button className="btn btn-primary text-white">Register</button>
      </form>
    </div>
  );
}

export default Register;
