import React from "react";

const Navbar = () => {
  return (
    <div className="flex bg-sky-400 justify-between p-4 text-blue-100 text-2xl">
      <h1 className="font-extrabold mx-2">TickIt</h1>
      <ul className="flex mx-3 gap-4 ">
        <li className="hover:text-blue-200 mx-2 font-bold cursor-pointer">
          Home
        </li>
        <li className="hover:text-blue-200 mx-2 font-bold cursor-pointer">
          Tasks
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
