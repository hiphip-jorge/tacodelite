import React, { useEffect, useState } from "react";
import MenuButton from "./menuButton";
import SideMenu from "./Modal";
import { taco_menu_icon } from "../assets/svg";
import { category } from "~/routes";

type Props = {
  categories: category[];
};

const NavMenu = ({ categories }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen((prevState) => !prevState);
  };

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
        className="z-10 flex h-1/2 w-12 items-center justify-center"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? (
          <div className="cancel-bg shadow-sm shadow-[#29703175]">
            <span className="cancel"></span>
          </div>
        ) : (
          <div className="toggleAnimation">{taco_menu_icon}</div>
        )}
      </MenuButton>
      <SideMenu categories={categories} isOpen={isOpen} handleClose={toggle} />
    </>
  );
};

export default NavMenu;
