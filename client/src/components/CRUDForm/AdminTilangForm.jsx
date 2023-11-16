import React, {useState} from "react";
import PlusIcon from "../../assets/icon/plus-icon.png"

const AdminTilangForm = () => {

  // const availability = []
  // const borrowPeriod = []
  // const condition = []
  // const location
  // const [availability, setAvailability] = useState()

  const [inputs, setInputs] = useState({})

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);
  }


  return (
    <>
      <div className="mt-4 align-center">
        <form onSubmit={handleSubmit} className="flex ">
          <input
            name="nomorKendaraan"
            required
            placeholder="Nomor Kendaraan"
            type="text"
            value={inputs.nomorKendaraan || ""}
            onChange={handleChange}
            className=" flex-1 outline outline-2 outline-white mx-1 mt-8 px-2 py-1 w-[232px] rounded-[10px] text-black"
          />
          <input
            name="tanggal"
            required
            placeholder="Tanggal"
            type="text"
            value={inputs.tanggal || ""}
            onChange={handleChange}
            className=" flex-1 outline outline-2 outline-white mx-1 mt-8 px-2 py-1 w-[232px] rounded-[10px] text-black"
          />
          <input
            name="lokasi"
            required
            placeholder="Lokasi"
            type="text"
            value={inputs.lokasi || ""}
            onChange={handleChange}
            className=" flex-1 outline outline-2 outline-white mx-1 mt-8 px-2 py-1 w-[232px] rounded-[10px] text-black"
          />
          <input
            name="keterangan"
            required
            placeholder="Keterangan"
            type="text"
            value={inputs.keterangan || ""}
            onChange={handleChange}
            className=" flex-1 outline outline-2 outline-white mx-1 mt-8 px-2 py-1 w-[232px] rounded-[10px] text-black"
          />
          <button
          type="submit"
          className=" outline outline-2 outline-blue-dark mx-1 mt-8 px-2 py-1 w-[40px] bg-blue-dark text-white rounded-[10px]"
          onClick={handleSubmit}
        >
          <img src={PlusIcon}/>
        </button>
          {/* <input
            type="submit"
            placeholder="Add / Update"
            className=" flex-1 outline outline-2 outline-white mx-1 mt-8 px-2 py-1 w-[232px] rounded-[10px] text-white"
          ></input> */}
        </form>
      </div>
    </>
  );
};

export default AdminTilangForm;
