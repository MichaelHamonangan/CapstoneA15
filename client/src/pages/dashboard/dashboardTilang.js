import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar.jsx";
import NavbarDash from "../../components/Navbar/NavbarDashboard.jsx";
import TilangTable from "../../components/Tables/TilangTable.jsx";
import PlusIcon from "../../assets/icon/plus-icon.png";
import AddTilangModal from "../../components/Modal/AddTilangModal.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DashboardTilang = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        navigate("/");
      } else {
        const res = axios
          .get(
            "http://localhost:5000/api/tilang" + localStorage.getItem("userID")
          )
          .then(function (response) {
            if (response.data.isAdmin === false) {
              navigate("/");
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => setShowModal(false), []);

  return (
    <>
      <Navbar />
      <div className=" text-white bgdefault w-full h-[910px]">
        <div className="flex justify-center items-center pt-16 text-3xl font-bold font-Inter justify-left">
          Hello, <span className=" text-orange">Admins</span>
        </div>
        <NavbarDash />
        <div className="max-w-[1240px] h-[75px]  mx-auto rounded-xl flex justify-end">
          <button
            className=" outline outline-2 outline-red-900 mx-6 mt-8 px-2 py-1 w-[150px] h-[40px] bg-red-900 text-white rounded-[10px]"
            onClick={() => setShowModal(true)}
          >
            <img src={PlusIcon} className="inline w-[25px] mr-2" />
            <p className="inline"> Add Data</p>
          </button>
        </div>
        <div className="max-w-[1256px] mx-auto px-4 pt-8 rounded-[30px]">
          <TilangTable />
        </div>
      </div>
      {showModal ? (
        <AddTilangModal state={showModal} setState={setShowModal} />
      ) : null}
    </>
  );
};

export default DashboardTilang;
