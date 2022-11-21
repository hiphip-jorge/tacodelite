import { useState } from "react";

type Props = {
  menuProps: { color?: string; header: string; func?: Function };
  subMenuProps: {
    color?: string;
    items: {
      name: string;
      href: string;
    }[];
    func?: Function;
  };
  active?: boolean;
};

const Accordian = ({ menuProps, subMenuProps, active }: Props) => {
  const mColor = menuProps.color ? `text-[${menuProps.color}]` : "text-black";
  const sColor = subMenuProps.color
    ? `text-[${subMenuProps.color}]`
    : "text-gray-800";

  return (
    <section className="flex w-full flex-col gap-2">
      <button
        onClick={menuProps.func}
        className="hover:bg-tertiary flex w-4/5 items-center justify-between rounded-2xl text-left duration-300 ease-in-out hover:shadow-md"
      >
        <h1
          className={`hover:text-white ${mColor} h-full w-full rounded-2xl p-6 py-4 text-3xl duration-300 ease-in-out`}
        >
          {menuProps.header}
        </h1>
      </button>
      {active && (
        <ul className="border-secondary ml-4 flex w-3/5 flex-col border-l-4 px-4 text-lg">
          {subMenuProps.items.map((item) => (
            <li key={item.name + "Accordion"} className="flex">
              <a
                className={
                  sColor +
                  " hover:bg-secondary h-full w-full rounded-md p-2 duration-300 ease-in-out hover:shadow-md"
                }
                href={item.href}
                onClick={subMenuProps.func}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default Accordian;
