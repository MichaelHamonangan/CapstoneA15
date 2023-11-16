import React from "react"

import Navbar from "./../components/Navbar/Navbar.jsx"
import SidePageHome from "./../components/SidePage/SidePageHome.jsx"
import About from "./../components/About/About"
import SidePage from "../components/SidePage/SidePage"
import SidePageTataCara from "../components/SidePage/SidePageTataCara"

const Home = () => {
  return (
    <>
    <div className="bgdefault min-h-screen">
      <Navbar />
      {/* <About className="flex flex-col items-center justify-center w-full" /> */}
      <div className="text-center text-white w-full">
        <SidePageHome />
      </div>
      
        <div className="flex w-full">
          {/* start - left div -> untuk image */}
          <div className="flex w-full  items-center justify-center lg:w-1/2 ">
            <SidePage />
          </div>
          {/* end - left div -> untuk image */}

          {/* start - right div -> untuk desc */}
          <div className="flex w-full  items-center justify-center lg:w-1/2 ">
            <SidePageTataCara />
          </div>
          {/* end - right div -> untuk desc */}
        </div>
        
      <div className="text-center text-white w-full h-full">
        <div id="#about">
          <About />
        </div>
      </div>
    </div>
    </>
  )
}

export default Home
