import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; 

export default function NavBar() {
  const [navbar, setNavbar] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  // if(!token){
  //   button =
  // }
  const handleLogOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userStatus");
    localStorage.removeItem("userID");
    
      navigate("/")
    
  }

  return (
    <nav className="w-full bg-red-nav shadow">
      <div className="navbarbg">
        <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
          <div>
            <div className="flex items-center justify-between py-3 md:py-5 md:block">
              <Link to="/">
                <h2 className="text-2xl font-bold text-white ">
                  <span className="text-yellow-500">e</span>tilang
                </h2>
              </Link>
              <div className="md:hidden">
                <button
                  className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div>
            <div
              className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                navbar ? "block" : "hidden"
              }`}
            >
              <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                <li className="text-white hover:text-indigo-200 font-Inter font-bold">
                  <Link to="/cektilang">CEK TILANG</Link>
                </li>
                <li className="text-white hover:text-indigo-200 font-Inter font-bold">
                  <Link to="/tatacara">TATA CARA PEMBAYARAN</Link>
                </li>
                <li className="text-white hover:text-indigo-200 font-Inter font-bold">
                  <Link to="/admin/tilang">DASHBOARD ADMIN</Link>
                </li>
              </ul>

              
              <div className="mt-3 space-y-2 lg:hidden md:inline-block">
                {token ? (
                  <>
                    <button 
                    onClick={handleLogOut}
                    className="inline-block w-full px-4 py-2 text-center text-gray-800 bg-white rounded-md shadow hover:bg-gray-100">
                      Log Out
                    </button>
                  </>
                ) : (
                  <>
                    <a
                      href="/auth/login"
                      className="inline-block w-full px-4 py-2 text-center text-white bg-yellow-600 rounded-md shadow hover:bg-yellow-400"
                    >
                      Log In
                    </a>
                    <a
                      href="/auth/signup"
                      className="inline-block w-full px-4 py-2 text-center text-gray-800 bg-white rounded-md shadow hover:bg-gray-100"
                    >
                      Sign Up
                    </a>
                  </>
                )}
              </div>


            </div>
          </div>
          
          
          <div className="hidden space-x-2 md:inline-block">
            {token ? (
              <button
                onClick={handleLogOut}
                className="px-6 py-2 text-white bg-yellow-600 rounded-md shadow hover:bg-yellow-400"
              >
                Log Out
              </button>
            ) : (
              <>
                <a
                  href="/auth/login"
                  className="px-6 py-2 text-white bg-yellow-600 rounded-md shadow hover:bg-yellow-400"
                >
                  Log In
                </a>
                <a
                  href="/auth/signup"
                  className="px-4 py-2 text-gray-800 bg-white rounded-md shadow hover:bg-gray-100"
                >
                  Sign Up
                </a>
              </>
            )}
          </div>
          


        </div>
      </div>
    </nav>
  );
}

