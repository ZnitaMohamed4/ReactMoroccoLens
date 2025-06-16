import { useState } from "react";

import { close, logo, menu } from "../../assets";
import { navLinks } from "../../constants";
import { FaCamera } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaMonument } from "react-icons/fa";



const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);

  return (
<nav className="w-full flex py-4 justify-between items-center bg-white  fixed top-0 left-0 right-0 z-50 px-10 shadow-xl border-b-[1px] border-gray-200">
{/* <img src={logo} alt="hoobank" className="w-[124px] h-[32px]" /> */}
      <div className="font-poppins font-bold cursor-pointer text-[24px] text-[#2A2A2A] hover:text-[#C5A645] transition-colors">
        <h1 className="flex items-center gap-2 drop-shadow-lg">
        {/* <FaCamera className="text-[#C5A645]" /> */}
          <span className="text-[#9A5442]">Morocco</span>
          <span className="text-gradient">Lens</span>
        </h1>
      </div>

      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        {navLinks.map((nav, index) => (
          <li
            key={nav.id}
            className={`font-poppins  cursor-pointer text-[17px] p-2 ${
              active === nav.title ? "text-gradient  font-semibold underline" : "text-black"
            } ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
            onClick={() => setActive(nav.title)}
          >
            <a href={`#${nav.id}`}>{nav.title}</a>
          </li>
        ))}
      </ul>

      <div className="sm:hidden flex flex-1 justify-end items-center">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle(!toggle)}
        />

        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            {navLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins font-medium cursor-pointer text-[16px] ${
                  active === nav.title ? "text-white" : "text-dimWhite"
                } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                onClick={() => setActive(nav.title)}
              >
                <a href={`#${nav.id}`}>{nav.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;