import * as React from "react"

import ContribPerson from "../Contributors/ContribPerson"

import krabs from "../../assets/Images/Contributors/krabs.jpg"
import spongebob from "../../assets/Images/Contributors/spongebob.jpg"
import sandy from "../../assets/Images/Contributors/sandy.jpeg"
import patrick from "../../assets/Images/Contributors/patrick.jpeg"
import plankton from "../../assets/Images/Contributors/plankton.jpg"

export default function ContribBox() {
  return (
    <>
      <h4 className="text-xl">A15 Team Members</h4>
      {/* --------- contributor card div start --------- */}
      <div className="flex flex-wrap justify-center items-center gap-4 lg:flex-nowrap md:flex-nowrap">
        <ContribPerson
          personImg={krabs}
          personAlt="Michael"
          personName="Michael"
        />
        <ContribPerson
          personImg={spongebob}
          personAlt="Irfan"
          personName="Irfan"
        />
        <ContribPerson personImg={sandy} personAlt="Laili" personName="Laili" />
        <ContribPerson personImg={patrick} personAlt="Yusron" personName="Yusron" />
        <ContribPerson personImg={plankton} personAlt="Risat" personName="Risat" />
      </div>
      {/* --------- contributor card div end --------- */}
    </>
  )
}

