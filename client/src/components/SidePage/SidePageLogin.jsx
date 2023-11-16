import * as React from "react"
import cars from "../../assets/Images/cars.png"

export default function SideCard() {
  return (
    <div
      className="flex flex-col justify-center items-center
       px-6 py-6 rounded-br-xl h-full w-full
    bg-gradient from-yellow-300 to-yellow-500 hover:from-yellow-200 hover:via-yellow-500 hover:to-yellow-700 
    transition-colors duration-1000 delay-150"
    >
      <div className="m-auto">
        <img src={cars} alt="cars" 
            className="rounded-xl w-9/12 h-9/12 m-auto"></img>
      </div>
    </div>
  )
}
