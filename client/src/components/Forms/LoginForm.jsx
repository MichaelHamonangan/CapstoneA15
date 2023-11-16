import * as React from "react";
import { useState } from "react";

import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

export default function Form() {
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const [alert, setAlert] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = alert;

  const handleClose = () => {
    setAlert({ ...alert, open: false });
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(inputs);

    try {
      const res = axios
        .post("http://localhost:5000/api/auth/login", inputs)
        .then(function (response) {
          localStorage.setItem("accessToken", response.data.token);
          localStorage.setItem("userID", response.data.user._id);
          localStorage.setItem("userStatus", response.data.user.isAdmin);
          navigate("/");
        })
        .catch(function (error) {
          console.log(error);
          if (error.message === "Request failed with status code 400") {
            setAlert({ open: true, vertical: "bottom", horizontal: "right" });
          }
        });
    } catch (error) {
      console.log("error axios");
    }
  };

  return (
    <>
      <div
        className="flex flex-col justify-center 
                shadow-2xl rounded-xl bg-white px-10 py-16 h-5/6 w-10/12 
                lg:w-9/12 lg:pl-24 md:w-1/2 md:px-10"
      >
        {/* start - div for loginTitle */}
        <div id="loginTitle" className="flex gap-x-2">
          <h1 className="text-4xl font-bold text-red-700">Welcome</h1>
          <h1 className="text-4xl font-bold text-black-800">Back!</h1>
        </div>
        {/* end - div for loginTitle */}

        <p className="font-normal mt-2 text-black-800">Log in to etilang</p>

        {/* start - div for inputs, buttons, descriptions */}
        <div>
          <form onSubmit={handleSubmit}>
            {/* start - div for inputs */}
            <div className="mt-8">
              <div className="flex flex-col gap-y-1">
                <label className="text-lg font-medium text-black-800">
                  Email
                </label>
                <input
                  name="email"
                  type="text"
                  onChange={handleChange}
                  value={inputs.email || ""}
                  className="w-full border-2 border-black-800 rounded-lg p-3 mt-1 mb-3 lg:w-3/4"
                  placeholder="admin@xxxxx.com"
                />
              </div>
              <div className="flex flex-col gap-y-1">
                <label className="text-lg font-medium text-black-800">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  onChange={handleChange}
                  value={inputs.password || ""}
                  className="w-full border-2 border-black-800 rounded-lg p-3 mt-1 mb-3 lg:w-3/4"
                  placeholder="admin"
                />
              </div>
            </div>
            {/* end - div for inputs */}

            {/* start - div for buttons */}
            <div className="mt-8 flex flex-col gap-y-2">
              <div>
                <button
                  onClick={handleSubmit}
                  className="w-full text-lg font-bold text-white py-2 rounded-xl shadow-xl
          active:scale-[.99] active:duration-75 transition-all hover:scale-[1.02] ease-in-out
          lg:w-3/4
          bg-gradient-to-r from-red-700 to-red-500 hover:from-red-300 hover:via-red-500 hover:to-red-700
          hover:duration-700"
                >
                  Log In
                </button>
              </div>
              <div>
                <button
                  onClick={() => {
                    navigate("/auth/signup");
                  }}
                  className="w-full text-lg font-bold  text-orange-dark bg-white border-2 border-black-800 py-2 rounded-xl shadow-xl
          active:scale-[.99] active:duration-75 transition-all hover:scale-[1.02] ease-in-out]
          lg:w-3/4
          bg-gradient-to-r hover:from-white hover:via-gray-300 hover:to-gray-500 
          hover:duration-700"
                >
                  Sign Up
                </button>
              </div>
            </div>
            {/* end - div for buttons */}
          </form>
        </div>
        {/* end - div for inputs, buttons, descriptions */}
      </div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Error, Wrong Password or Email
        </Alert>
      </Snackbar>
    </>
  );
}
