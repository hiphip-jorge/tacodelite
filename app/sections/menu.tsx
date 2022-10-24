import { useEffect, useState } from "react";
import { category } from "~/routes";
import { isInViewport } from "~/utils";

import Card from "~/components/card";

type Props = { header: string; categories: Array<category> };

const Menu = ({ header, categories }: Props) => {
  let elInView: string | undefined = "";

  useEffect(() => {
    const elIds = categories.map((category) => category.name.toLowerCase());

    document.addEventListener("scroll", () => {
      elInView = findElInView(elIds);
      console.log("elInView :>> ", elInView);
    });

    return document.removeEventListener("scroll", () => {
      elInView = findElInView(elIds);
    });
  }, []);

  return (
    <section className="my-8">
      <h1 className="primary-outline text-primary text-center text-6xl">
        {header}
      </h1>
      {categories.map((category) => (
        <div id={category.name.toLowerCase()} key={category.name}>
          <h1
            className={`text-tertiary secondary-secular-one ml-4 mt-4 text-4xl ${
              elInView === category.name ? "underline-hover-effect" : ""
            }`}
          >
            {category.name}
          </h1>
          {category.foodItems.map((item, idx) => (
            <Card id={item.name.replaceAll(" ", "-")} key={idx} item={item} />
          ))}
        </div>
      ))}
    </section>
  );
};

export default Menu;

const findElInView = (elList: string[]) => {
  const el = elList.find((el) =>
    isInViewport(document.getElementById(el).firstElementChild)
  );

  console.log("el :>> ", el);
  return el;
};
