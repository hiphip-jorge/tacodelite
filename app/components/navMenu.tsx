import React, { useEffect, useState } from "react";
import MenuButton from "./menuButton";
import SideMenu from "./sideMenu";
import { taco_menu_icon } from "../assets/svg";

type Props = {};

const NavMenu = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.className = "overflow-hidden";
    } else {
      document.body.className = "";
    }
  }, [isOpen]);

  return (
    <>
      <MenuButton
        className="flex h-1/2 w-12 items-center justify-center"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? (
          <span className="open" />
        ) : (
          <span className="close">{taco_menu_icon}</span>
        )}
      </MenuButton>
      <SideMenu isOpen={isOpen} />
    </>
  );
};

export default NavMenu;
