import React from "react"
import SignUpForm from "../components/Forms/SignUpForm"
import SidePageLogin from "../components/SidePage/SidePageLogin"

const signup = () => {
  return (
    <div className="flex w-full h-screen bg-cream-pale">
      {/* start - left div -> untuk form */}
      <div className="flex w-full  items-center justify-center lg:w-1/2 ">
        <SignUpForm />
      </div>
      {/* end - left div -> untuk form */}

      {/* start - right div -> untuk image */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-start h-full">
        <SidePageLogin />
      </div>
      {/* end - right div -> untuk image */}
    </div>
  )
}

export default signup
