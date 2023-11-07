import * as React from "react"
import button from "../../assets/Images/button.png"
import cars from "../../assets/Images/cars.png"

export default function SideCard() {
  return (
    <div className="flex-col">
      {/* main start */}
      <div className="flex justify-center content-center pt-12 pb-12">
        {/* page left start */}
        <div className="w-full flex flex-col justify-center items-center content-center lg:w-1/3">
          {/*div etilang - logo*/}
          <div className="pt-16 text-8xl font-bold font-Inter justify-left lg:ml-60">
            <span className=" text-orange">e</span>tilang
            <div className="text-2xl">electronic tilang</div>
          </div>
          <div className="pt-16 text-8xl  font-Inter justify-left lg:ml-60">
            <div className="text-xl">etilang merupakan website yang dapat digunakan untuk pengecekan tilang secara elektronik dengan praktis</div>
          </div>
          <div id="button check" className="mt-6 lg:ml-60 h-f14 w-64 my-40">
            <button>
              <a href="/cektilang">
                <img
                  src={button}
                  alt="check now"
                  className="hover:scale-[1.02] ease-in-out rounded-xl w-9/12 h-9/12 m-auto"
                ></img>
              </a>
            </button>
          </div>
        </div>
        {/* page left end */}
        {/* cars start */}
        <div className="hidden m-auto lg:flex lg:w-1/2 lg:mr-12">
          <img
            src={cars}
            alt="cars hello"
            className="rounded-xl w-9/12 h-9/12 m-auto"
          ></img>
        </div>
        {/* cars end */}
      </div>
      {/* main end */}
    </div>
  )
}
