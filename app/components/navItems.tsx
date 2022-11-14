import React from "react";

type Props = {
  children: React.ReactNode;
  vertical?: boolean;
};

const NavItems = ({ children, vertical = false }: Props) => {
  let isVertical = vertical
    ? "flex flex-col w-fit gap-5 text-5xl primary-solid text-primary"
    : "flex-row";

  return <ul className={isVertical}>{children}</ul>;
};

export default NavItems;
