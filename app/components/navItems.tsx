import React from "react";

type Props = {
  children: React.ReactNode;
  vertical?: boolean;
};

const NavItems = ({ children, vertical = false }: Props) => {
  let isVertical = vertical
    ? "flex flex-col gap-5 text-4xl primary-solid"
    : "flex-row";

  return <ul className={isVertical}>{children}</ul>;
};

export default NavItems;
