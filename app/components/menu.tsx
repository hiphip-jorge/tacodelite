import { useLoaderData } from "@remix-run/react";
import React from "react";
import Card from "~/components/Card";
import { menuItem } from "../routes";
import download from "../../media/download-icon.svg";

const Menu = () => {
  let data = useLoaderData();
  let menu = nodifyMenu(data);

  console.log("menu :>> ", menu);

  return (
    <main className="secondary-open-sans py-4">
      <header className="flex justify-between">
        <h1 className="primary-solid text-primary items-center text-3xl">
          Menu
        </h1>
        <a href="/">
          <img className="h-full w-6" src={download} alt="download arrow" />
        </a>
      </header>
      {menu}
    </main>
  );
};

export default Menu;

const nodifyMenu = (menu: object) => {
  let node = [];

  // for every category in menu object ('breakfast', 'tacos', etc),
  //   push list of items in respective category to node
  for (let category in menu) {
    node.push(
      menu[category as keyof object].map((item: menuItem, index: number) => {
        // if first item in category (index = 0), prepend category header
        return (
          <React.Fragment key={item.id}>
            <Card id={String(item.id)}>
              <h2 className="primary-solid text-md">{item.title}</h2>
              <p className="secondary-open-sans h-[125px] text-xs">
                {item.description}
              </p>
              <p className="secondary-open-sans text-md">{"$" + item.price}</p>
            </Card>
          </React.Fragment>
        );
      })
    );
  }

  // return a node of entire menu by iterating through node list,
  //  prepending the category, and wrapping each node array with <section> to add gap
  return node.map((cards: React.ReactNode, index: number) => {
    let category = Object.keys(menu)[index];

    return (
      <React.Fragment key={index}>
        <h2 className="text-secondary mt-8 mb-2 text-center text-2xl">
          {category}
        </h2>
        <section className="flex flex-col gap-3">{cards}</section>
      </React.Fragment>
    );
  });
};
