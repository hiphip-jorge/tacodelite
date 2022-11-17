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
    <section className="flex w-full flex-col gap-1">
      <div className="hover:bg-secondary flex items-center justify-between rounded-2xl p-4">
        <h1 className={`text- w-full rounded-2xl text-3xl ${pColor}`}>
          {menuH1}
        </h1>
      </div>
      {isOpen && (
        <ul className="border-secondary ml-4 flex flex-col gap-2 border-l-4 px-4 text-xl">
          {subMenu.map((item) => (
            <li key={item.name + "Accordion"}>
              <a className={sColor} href={item.href}>
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
