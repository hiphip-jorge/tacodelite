import React from "react";

type Props = {
  iconSVG: JSX.Element;
  handleClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

const IconButton = ({ iconSVG, handleClick }: Props) => {
  return (
    <button onClick={handleClick} className="flex items-center justify-center p-2">
      {iconSVG}
    </button>
  );
};

export default IconButton;