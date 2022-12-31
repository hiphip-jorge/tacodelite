import { useState } from "react";
import { useLoaderData } from "@remix-run/react";
import { ActionFunction, LoaderFunction } from "@remix-run/server-runtime";

// Prisma Imports
import { prisma } from "~/db.server";
import { FoodItem } from "@prisma/client";

// Components Imports
import Button from "~/components/Button";
import Card from "~/components/Card";
import IconButton from "~/components/IconButton";
import Modal from "~/components/Modal";
import Section from "~/components/Section";

// Utilities Imports
import { useInView } from "react-intersection-observer";
import { aboutUs_p } from "~/utilities/index.utils";

// Assets/imgs Imports
import catering from "~/assets/catering.png";
import td_building from "~/assets/taco_delite.jpeg";
import taco_delite from "~/assets/td-logo_2021.png";
import { car, utensils } from "~/assets/svg";

// Types
export type category = { name: string; foodItems: Array<FoodItem> };
export type modalContent = { name: string; url: string };

// Constants
const doordash = { name: "doordash", url: "https://www.doordash.com" };
const ubereats = { name: "ubereats", url: "https://www.ubereats.com" };

// Remix Data Loader Function
export const loader: LoaderFunction = async () => {
  let categories = await prisma.category.findMany({
    select: {
      name: true,
      foodItems: true,
    },
  });

  return categories;
};

function Index() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentContent, setCurrentContent] = useState<modalContent[]>();

  const categories = useLoaderData<category[]>();
  const categoryRefs = categories.map(() => {
    return useInView({ threshold: 1, rootMargin: "0px 0px -295px 0px" });
  });

  const handleToggle = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    setIsOpen((prevState) => !prevState);
  };

  const handleMenu = () => {
    setCurrentContent(
      categories.map((category) => {
        return { name: category.name, url: "#" + category.name };
      })
    );
  };

  const handleOrder = () => {
    setCurrentContent([doordash, ubereats]);
  };

  return (
    <div className="bg-white">
      {/* Taco Delite Header */}
      <header className="header">
        <p className="font-primary-gris text-5xl text-green-primary">Taco</p>
        <figure>
          <img
            src={taco_delite}
            alt="taco delite logo"
            className="w-10 sm:hidden md:inline"
          />
        </figure>
        <p className="font-primary-gris text-5xl text-green-primary">Delite</p>
      </header>
      <main>
        {/* Hero Section */}
        <Section header="15th Street" height="h-[calc(100vh-6rem)]">
          <picture>
            <img src={catering} alt="plate 1 image" />
          </picture>
          <div className="px-12">
            <h2 className="hero-h2 text-green-dark">Fresh Everyday.</h2>
            <h2 className="hero-h2 text-end text-green-primary">
              Real Ingredients.
            </h2>
          </div>
          <div className="mx-auto flex w-fit gap-4">
            <Button
              className="h-12 w-32 rounded-[14px]"
              handleClick={(e) => {
                handleMenu();
                handleToggle(e);
              }}
            >
              Menu
            </Button>
            <Button
              className="h-12 w-32 rounded-[14px]"
              handleClick={(e) => {
                handleOrder();
                handleToggle(e);
              }}
              primary
            >
              Order
            </Button>
          </div>
        </Section>
        {/* Quick Icon Buttons  */}
        <aside className="iconButton">
          <IconButton
            iconSVG={car("hover:fill-[#43B64Fdd] fill-[#297031]")}
            handleClick={(e) => {
              handleOrder();
              handleToggle(e);
            }}
          />
          <div className="h-1 w-full rounded-lg bg-green-light" />
          <IconButton
            iconSVG={utensils("hover:fill-[#43B64Fdd] fill-[#297031]")}
            handleClick={(e) => {
              handleMenu();
              handleToggle(e);
            }}
          />
        </aside>
        {/* About Us Section */}
        <Section header="About Us" hClass="ml-10">
          <div className="px-16 pl-[calc(4rem-1rem)]">
            <figure>
              <img
                src={td_building}
                className="my-4 rounded-3xl shadow-lg"
                alt=""
              />
            </figure>
            <p className="font-secondary-secular text-lg text-dark">
              {aboutUs_p}
            </p>
          </div>
        </Section>
        {/* Menu Section  */}
        <Section header="Menu">
          <div>
            {categories.map((category, idx) => (
              <div id={category.name.toLowerCase()} key={category.name}>
                <h1
                  id={category.name}
                  ref={categoryRefs[idx].ref}
                  className={`menuSectionHeader underline-effect ${
                    categoryRefs[idx].inView && "in--view"
                  }`}
                >
                  {category.name}
                </h1>
                {category.foodItems.map((item, idx) => (
                  <Card
                    id={item.name.replaceAll(" ", "-")}
                    key={idx}
                    item={item}
                  />
                ))}
              </div>
            ))}
          </div>
        </Section>
      </main>
      <footer>
        <Section header="footer">
          <div className="h-[1000px]"></div>
        </Section>
      </footer>
      <Modal
        contentList={currentContent}
        isOpen={isOpen}
        handleClose={handleToggle}
      />
    </div>
  );
}

export default Index;
