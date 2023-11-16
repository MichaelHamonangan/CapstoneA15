import * as React from "react"
import AppLogo from "../About/AppLogo"
import ContribBox from "../Contributors/ContribBox"
import TechBox from "../TechStack/TechBox"
import SocialBox from "../Social/SocialBox"
import AllMembers from "../../assets/Images/Contributors/allmembers.png"

export default function About() {
  return (
    // --------- about page div start --------- //
    <div
      className="flex flex-col items-center justify-center
                  text-white w-full pt-8"
    >
      {/* --------- logo div start --------- */}
      <div className="flex flex-col justify-center items-center font-semi-bold w-8/12 mt-6">
        <AppLogo />
      </div>
      {/* --------- logo div end ---------  */}

      {/* --------- desc div start --------- */}
      {/* --------- desc end --------- */}

      {/* start - div contribs untuk image */}
      <div className="w-full bg-cream-pale">
      {/* start - div untuk image */}
      <div className="flex items-center justify-center w-full lg:w-3/4 py-20 px-20 mx-auto">
        <div
            className="flex items-center justify-center 
            shadow-2xl rounded-xl bg-white px-10 py-10 h-5/6 w-full 
            lg:w-5/6 md:w-1/2 md:px-10"
        >
            {/* start - div for members */}
            <div className="m-auto lg:flex lg:w-full">
                <img
                    src={AllMembers}
                    alt="allmember"
                    className="rounded-xl w-12/12 h-12/12 m-auto"
                />
            </div>
            {/* end - div for members */}
        </div>
      </div>
      </div>


      {/* --------- contributor div end --------- */}

      {/* --------- tech div start --------- */}
      <div className="flex flex-col justify-center items-center w-8/12 mt-16 font-bold ">
        <TechBox />
      </div>
      {/* --------- tech div end --------- */}

      {/* --------- follow us (SocialBox) div start --------- */}
      <div className="flex flex-col justify-center items-center w-8/12 mt-16 mb-8 font-bold">
        <SocialBox />
      </div>
      {/* --------- follow us div end --------- */}
    </div>
    // --------- about div end --------- //
  )
}
