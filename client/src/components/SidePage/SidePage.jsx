import * as React from "react"
import CaraAmbil2 from "../../assets/Images/CaraAmbil2.png"

export default function SideCard() {
  return (
    <div
    className="flex flex-col justify-center 
            shadow-2xl rounded-xl bg-white px-10 py-16 h-5/6 w-10/12 
            lg:w-5/6 md:w-1/2 md:px-10"
    >
    {/* start - div for CaraAmbilImage */}
    <div className="m-auto lg:flex lg:w-6/6">
          <img
            src={CaraAmbil2}
            alt="tata cara"
            className="rounded-xl w-12/12 h-12/12 m-auto"
          ></img>
        </div>
    {/* end - div for CaraAmbilImage */}

    </div>
  )
}
