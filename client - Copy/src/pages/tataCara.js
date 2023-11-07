import React from "react";
import Navbar from "../components/Navbar/Navbar.jsx";
import AppLogo from "../components/About/AppLogo.jsx";
import TataCaraNew from "../assets/Images/TataCaraNew.png"
import CaraAmbilNew from "../assets/Images/CaraAmbilNew.png"

const tatacara = () => {

    return (
    <div className="bgdefault">
        <Navbar /> 
        <div className="w-full bg-cream-pale">
            {/* start - left div -> untuk image */}
            <div className="flex w-full  items-center justify-center lg:w-full py-20 px-20">
                <div
                    className="flex flex-col justify-center 
                    shadow-2xl rounded-xl bg-white px-10 py-16 h-5/6 w-10/12 
                    lg:w-5/6 md:w-1/2 md:px-10"
                >
                {/* start - div for TataCaraImage */}
                <div className="m-auto lg:flex lg:w-6/6">
                    <img
                        src={TataCaraNew}
                        alt="tatacara"
                        className="rounded-xl w-12/12 h-12/12 m-auto"
                    ></img>
                 </div>
                {/* end - div for TataCaraImage */}
                </div>
            </div>

            {/* end - left div -> untuk image */}

            {/* start - right div -> untuk image */}
            
            <div className="flex w-full  items-center justify-center lg:w-full py-20 px-20">
                <div
                    className="flex flex-col justify-center 
                    shadow-2xl rounded-xl bg-white px-10 py-16 h-5/6 w-10/12 
                    lg:w-5/6 md:w-1/2 md:px-10"
                >
                {/* start - div for TataCaraImage */}
                <div className="m-auto lg:flex lg:w-6/6">
                    <img
                        src={CaraAmbilNew}
                        alt="caraambil"
                        className="rounded-xl w-12/12 h-12/12 m-auto"
                    ></img>
                 </div>
                {/* end - div for TataCaraImage */}
                </div>
            </div>
            {/* end - right div -> untuk image */}
        </div>
        <div
            className="flex flex-col items-center justify-center
                  text-white w-full pt-8"
            >
        <div className="flex flex-col justify-center items-center font-semi-bold w-8/12 mt-3 mb-8">
            <AppLogo />
        </div>
        </div>
    </div>
  );
};

export default tatacara;