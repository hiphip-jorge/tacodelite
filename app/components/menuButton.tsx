import React, { Children } from "react";

type Props = {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

const MenuButton = ({ className, children, onClick }: Props) => {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
};

export default MenuButton;
