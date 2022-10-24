import React from "react";
import { Link } from "@remix-run/react";
import NavItems from "./navItems";
import doorDash from "../../media/DoorDash-D.svg";

type Props = {
  isOpen: boolean;
};

const SideMenu = ({ isOpen }: Props) => {
  return (
    <aside className="absolute top-0 bottom-0 left-[30%] right-0 rounded-tl-[2rem] bg-[#8FD697]">
      <div className="flex flex-col w-4/5 mr-0 ml-auto h-full my-10">
        <NavItems vertical>
          <li className="">
            <Link to="#menu">menu</Link>
          </li>
          <li>
            <Link to="/food">food pics</Link>
          </li>
          <li className="flex items-center gap-1">
            <Link to="/door-dash">order</Link>
            <img src={doorDash} alt="Doordash logo" />
          </li>
        </NavItems>
      </div>
    </aside>
  );
};

export default SideMenu;
