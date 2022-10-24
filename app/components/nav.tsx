import React, { useState } from "react";
import MenuButton from "./menuButton";
import SideMenu from "./sideMenu";
import { taco_menu_icon } from "../assets/svg";

type Props = {};

const Nav = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <MenuButton
        className="flex h-1/2 w-12 items-center justify-center"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? <span className="close" /> : taco_menu_icon}
      </MenuButton>
      {/* <SideMenu isOpen={isOpen} /> */}
    </>
  );
};

export default Nav;
