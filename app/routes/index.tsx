import { useState } from "react";
import { useLoaderData } from "@remix-run/react";
import { ActionFunction, LoaderFunction } from "@remix-run/server-runtime";

// Prisma Imports
import { prisma } from "~/db.server";
import { FoodItem, Announcement } from "@prisma/client";

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
import { scrollTo } from "~/utilities/components/modals.utils";
import AnnouncementBar from "~/components/AnnouncementBar";

// Types
export type category = { name: string; foodItems: Array<FoodItem> };
export type modalContent = { name: string; url: string };
export type LoaderTypes = {
  categories: category[];
  // announcements: Announcement[];
};

// Constants
const doordash = { name: "doordash", url: "https://www.doordash.com" };
const ubereats = { name: "ubereats", url: "https://www.ubereats.com" };

// Remix Data Loader Function
export const loader: LoaderFunction = async () => {
  // let announcements = await prisma.announcement.findMany();
  let categories = await prisma.category.findMany({
    select: {
      name: true,
      foodItems: true,
    },
  });

  return { categories };
};

function Index() {
  // flag for categories in view
  let hasInView = false;
  // states
  const [isOpen, setIsOpen] = useState(false);
  const [currentContent, setCurrentContent] = useState<modalContent[]>();
  const [constentType, setContentType] = useState("links");
  // custom hooks
  const { categories } = useLoaderData<LoaderTypes>();
  const categoryRefs = categories.map(() => {
    const thisCategory = useInView({
      threshold: 1,
      rootMargin: "-50px 0px -100px 0px",
    });

    // if category is inview and there no other is in view, flip flag to true; else, return false
    if (thisCategory.inView && !hasInView) {
      hasInView = true;
      return thisCategory;
    } else {
      return {
        ref: thisCategory.ref,
        inView: false,
        entry: thisCategory.entry,
      };
    }
  });

  const handleToggle = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    setIsOpen((prevState) => !prevState);
  };

  const handleMenu = () => {
    setContentType("buttons");
    setCurrentContent(
      categories.map((category) => {
        return { name: category.name, url: "#" + category.name };
      })
    );
  };

  const handleOrder = () => {
    setContentType("links");
    setCurrentContent([doordash, ubereats]);
  };

  return (
    <div className="bg-white">
      {/* <AnnouncementBar message={announcements[0].message} /> */}
      {/* Taco Delite Header */}
      <header className="header border-b-2 border-green-light" role="banner">
        <p className="font-primary-gris text-4xl text-green-primary md:text-6xl">
          Taco
        </p>
        <figure>
          <img
            src={taco_delite}
            alt="taco delite logo"
            className="w-14 sm:hidden md:inline"
          />
        </figure>
        <p className="font-primary-gris text-4xl text-green-primary md:text-6xl">
          Delite
        </p>
      </header>
      <main>
        {/* Hero Section */}
        <Section
          header="15th Street"
          height="h-[calc(100vh-6rem)] lg:h-[calc(100vh-7em)]"
          sectionClass="flex flex-col items-center justify-around py-10 lg:py-16"
        >
          <picture className="skew-backdrop relative flex flex-col items-center lg:w-[36rem]">
            <img className="z-10" src={catering} alt="plate 1 image" />
          </picture>
          <div className="px-12 md:px-28">
            <h2 className="hero-h2 text-green-primary">Real Ingredients.</h2>
            <h2 className="hero-h2 text-end text-green-dark">
              Fresh Everyday.
            </h2>
          </div>
          <div className="mx-auto flex w-fit gap-4">
            <Button
              className=""
              handleClick={(e) => {
                handleMenu();
                handleToggle(e);
              }}
            >
              Menu
            </Button>
            <Button
              className=""
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
        <Section header="About Us">
          <div className="flex flex-col items-center gap-4 px-16 pl-[calc(4rem-1rem)] md:px-12 xl:my-10 xl:flex-row xl:gap-0">
            <figure className="flex justify-center md:px-8 xl:px-0">
              <img
                src={td_building}
                className="my-4 rounded-3xl shadow-lg md:w-3/4"
                alt=""
              />
            </figure>
            <p className="h-fit font-secondary-secular text-lg text-green-dark md:px-20 md:text-2xl xl:px-0">
              {aboutUs_p}
            </p>
          </div>
        </Section>
        {/* Menu Section  */}
        <Section header="Menu">
          <div className="lg:my-8 lg:flex lg:gap-2 xl:my-16">
            {/* Side nav */}
            <aside className="sticky top-4 left-10 hidden h-fit lg:inline lg:w-1/4">
              <ul>
                {categories.map((category, idx) => {
                  return (
                    <li
                      key={idx}
                      className="flex justify-center p-2 text-green-light"
                    >
                      <button
                        className={`h-full w-full font-primary-solid text-3xl duration-500 ease-in-out xl:text-left ${
                          categoryRefs[idx].inView && "text-green-dark"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          scrollTo(category.name);
                        }}
                      >
                        {category.name}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </aside>
            {/* Menu cards  */}
            <div className="px-2 md:px-6 lg:w-3/4 lg:px-0">
              {categories.map((category, idx) => (
                <div
                  id={category.name.toLowerCase()}
                  key={category.name}
                  className="xl:mb-24"
                >
                  <h1
                    id={category.name}
                    ref={categoryRefs[idx].ref}
                    className={`menuSectionHeader underline-effect ${
                      categoryRefs[idx].inView && "in--view"
                    }`}
                  >
                    {category.name}
                  </h1>
                  <div className="flex flex-wrap justify-start gap-4 px-12 md:px-16 lg:px-4 xl:gap-8 xl:px-8">
                    {category.foodItems.map((item, idx) => (
                      <Card
                        id={item.name.replaceAll(" ", "-")}
                        key={idx}
                        item={item}
                        className="md: sm:w-56"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>
      </main>
      <footer className="flex flex-col justify-center gap-10 bg-green-50 p-10">
        <div className="grid grid-flow-col grid-rows-4 items-center justify-center gap-4 md:grid-rows-2 md:gap-8 lg:flex-row lg:flex-wrap xl:grid-rows-1">
          <div className="w-fit">
            <h1 className="font-primary-solid text-xl text-green-primary">
              Location
            </h1>
            <ul className="flex flex-col font-secondary-secular">
              <li>
                <a
                  href="https://www.google.com/maps/dir/''/Taco+Delite,+West+15th+Street,+Plano,+TX/@33.0210863,-96.7853179,13z/data=!3m2!4b1!5s0x864c22c760f8bec1:0x153e7787779c5cc6!4m8!4m7!1m0!1m5!1m1!1s0x864c22779cbdf961:0x122a03406b2f3e01!2m2!1d-96.7503414!2d33.0210227"
                  className="underline-effect in--hover text-green-dark duration-300 hover:text-dark"
                >
                  2957 W 15th Street, Plano, TX, 75075
                </a>
              </li>
            </ul>
          </div>
          <div className="w-fit">
            <h1 className="font-primary-solid text-xl text-green-primary">
              Contact Us
            </h1>
            <ul className="flex flex-col font-secondary-secular">
              <li>
                <a
                  href="tel: 972-964-5419"
                  className="underline-effect in--hover text-green-dark duration-300 hover:text-dark"
                >
                  972-964-5419
                </a>
              </li>
              <li>
                <a
                  href="mailto:tacodelitewestplano@gmail.com"
                  className="underline-effect in--hover text-green-dark duration-300 hover:text-dark"
                >
                  tacodelitewestplano@gmail.com
                </a>
              </li>
            </ul>
          </div>
          <div className="w-fit">
            <h1 className="font-primary-solid text-xl text-green-primary">
              Follow Us
            </h1>
            <ul className="flex flex-col font-secondary-secular">
              <li>
                <a
                  href="https://www.facebook.com/TacoDeliteWestPlano"
                  className="underline-effect in--hover text-green-dark duration-300 hover:text-dark"
                >
                  Facebook @ Taco Delite West Plano
                </a>
              </li>
            </ul>
          </div>
          <div className="w-fit">
            <h1 className="font-primary-solid text-xl text-green-primary">
              Store Hours
            </h1>
            <ul className="flex flex-col font-secondary-secular">
              <li className="text-green-dark">Mon-Sat: 7am-9pm</li>
              <li className="text-green-dark">Sundays: closed</li>
            </ul>
          </div>
        </div>
        <div className="flex w-full items-center justify-center gap-2">
          <figure className="flex h-8 w-8 items-end justify-start">
            <img src={taco_delite} alt="taco delite logo" className="w-8" />
          </figure>
          <p className="font-secondary-secular text-green-dark ">
            CJN Inc. All right reserved.
          </p>
        </div>
      </footer>
      <Modal
        contentList={currentContent}
        isOpen={isOpen}
        handleClose={handleToggle}
        isButtons={constentType === "buttons"}
      />
    </div>
  );
}

export default Index;
