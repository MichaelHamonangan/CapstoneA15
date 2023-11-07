import React, {useState} from "react";
import Navbar from "../components/Navbar/Navbar.jsx";
import AppLogo from "../components/About/AppLogo.jsx";
import TextField from "@mui/material/TextField";

const cektilang = () => {
    
    return (
    <div className="bgdefault">
        <Navbar /> 
            {/* --------- logo div start --------- */}            
            <div
                className="flex flex-col items-center justify-center text-white w-full py-10"
            >
            <div className="flex flex-col justify-center items-center font-semi-bold w-8/12 mt-10 mb-10">
                <AppLogo />
            </div>
            </div>
            {/* --------- logo div end ---------  */}

            {/* --------- search start ---------  */}
            <div className="place-items-center text-white w-full h-[910px]">
                <div className="max-w-[1256px] mx-auto px-4 rounded-[30px]">
                    <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black">
                        <TextField
                            size="small"
                            variant= "outlined"
                            fullWidth
                            label="Masukkan Nomor Kendaraan"
                            placeholder="AD1RI"
                            color="error"
                        />
                    </div>
                </div>
            </div>

            {/* --------- search end ---------  */}

    </div>
  );
};

export default cektilang;