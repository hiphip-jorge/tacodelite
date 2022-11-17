import React, { useEffect, useState } from "react";
import MenuButton from "./menuButton";
import SideMenu from "./sideMenu";
import { taco_menu_icon } from "../assets/svg";
import { category } from "~/routes";

type Props = {
  categories: category[];
};

const NavMenu = ({ categories }: Props) => {
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
        className="flex h-1/2 w-12 items-center justify-center z-10"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? (
          <span className="cancel"></span>
        ) : (
          <span>{taco_menu_icon}</span>
        )}
      </MenuButton>
      <SideMenu categories={categories} isOpen={isOpen} />
    </>
  );
};

export default NavMenu;
