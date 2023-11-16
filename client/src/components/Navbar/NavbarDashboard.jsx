import React from "react"

const NavbarDashboard = () => {
  return (
    <>
      <div className="flex items-center justify-center pt-10 mx-4">
        <div className="flex items-center justify-center bg-red-900 px-0 rounded-[15px]">
          <a href="/admin/tilang" className="flex-1">
            <button className="flex-1 py-2 px-10 lg:px-14 bg-red-900 hover:bg-c-yellow hover:text-red-900 rounded-[15px] w-full focus:bg-c-yellow focus:text-red-900">
              TILANG
            </button>
          </a>
          <a href="/admin/member" className="flex-1">
            <button className="flex-1 py-2 px-10 lg:px-14 bg-red-900 hover:bg-c-yellow hover:text-red-900 rounded-[15px] w-full focus:bg-c-yellow focus:text-red-900">
              MEMBER
            </button>
          </a>
        </div>
      </div>
    </>
  )
}

export default NavbarDashboard
