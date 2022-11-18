import { useState } from "react";

type subMenuItem = {
  name: string;
  href: string;
};

type Props = {
  primaryColor?: string;
  subColor?: string;
  menuH1: string;
  subMenu: subMenuItem[];
  isOpen?: boolean;
};

const Accordian = ({
  menuH1,
  subMenu,
  subColor,
  isOpen,
  primaryColor,
}: Props) => {
  const pColor = primaryColor ? `text-[${primaryColor}]` : "text-black";
  const sColor = subColor ? `text-[${subColor}]` : "text-gray-800";

  return (
    <section className="flex w-full flex-col gap-2">
      <div className="hover:bg-tertiary flex w-4/5 items-center justify-between rounded-2xl duration-300 ease-in-out hover:shadow-md">
        <h1
          className={`hover:text-white ${pColor} h-full w-full rounded-2xl p-6 py-4 text-3xl duration-300 ease-in-out`}
        >
          {menuH1}
        </h1>
      </div>
      {isOpen && (
        <ul className="border-secondary ml-4 flex w-3/5 flex-col border-l-4 px-4 text-lg">
          {subMenu.map((item) => (
            <li key={item.name + "Accordion"} className="flex">
              <a
                className={
                  sColor +
                  " hover:bg-secondary h-full w-full rounded-md p-2 duration-300 ease-in-out hover:shadow-md"
                }
                href={item.href}
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
