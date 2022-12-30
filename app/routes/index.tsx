import { useState } from "react";
import { useLoaderData } from "@remix-run/react";
import { ActionFunction, LoaderFunction } from "@remix-run/server-runtime";
import { Form as RemixForm } from "@remix-run/react";
// Prisma
import { prisma } from "~/db.server";
import { FoodItem } from "@prisma/client";
// Components
import Button from "~/components/Button";
import Card from "~/components/Card";
import IconButton from "~/components/IconButton";
import Modal from "~/components/Modal";
import Section from "~/components/Section";
// Utilities
import { useInView } from "react-intersection-observer";
// import DatePicker from "react-datepicker";
// assets/imgs
import catering from "~/assets/catering.png";
import td_building from "~/assets/taco_delite.jpeg";
import { car, utensils } from "~/assets/svg";

import Catering from "~/sections/catering";

const doordash = { name: "doordash", url: "https://www.doordash.com" };
const ubereats = { name: "ubereats", url: "https://www.ubereats.com" };

export type category = { name: string; foodItems: Array<FoodItem> };
export type modalContent = { name: string; url: string };

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
  // const [formStartDate, setFormStartDate] = useState(getValidDate(2));

  const categories = useLoaderData<category[]>();
  const categoryRefs = categories.map(() => {
    return useInView({ threshold: 1, rootMargin: "0px 0px -295px 0px" });
  });

  const toggle = (e: React.SyntheticEvent) => {
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
      <header className="flex h-24 w-full items-center justify-center bg-green-50">
        <p className="font-primary-gris text-5xl text-green-primary">
          Taco Delite
        </p>
      </header>
      <main>
        {/* Hero Section */}
        <Section header="15th Street" height="h-[calc(100vh-6rem)]">
          <picture>
            <img src={catering} alt="plate 1 image" />
          </picture>
          <div className="px-12">
            <h2 className="font-primary-solid text-[2rem] leading-9 text-green-dark">
              Fresh Everyday.
            </h2>
            <h2 className="text-end font-primary-solid text-[2rem] leading-9 text-green-primary">
              Real Ingredients.
            </h2>
          </div>
          <div className="mx-auto flex w-fit gap-4">
            <Button
              className="h-12 w-32 rounded-[14px]"
              handleClick={(e) => {
                handleMenu();
                toggle(e);
              }}
            >
              Menu
            </Button>
            <Button
              className="h-12 w-32 rounded-[14px]"
              handleClick={(e) => {
                handleOrder();
                toggle(e);
              }}
              primary
            >
              Order
            </Button>
          </div>
        </Section>
        {/* Quick Icon Buttons  */}
        <aside className="sticky top-32 right-full left-4 z-10 float-left flex w-fit flex-col gap-2">
          <IconButton
            iconSVG={car("hover:fill-[#43B64Fdd] fill-[#297031]")}
            handleClick={(e) => {
              handleOrder();
              toggle(e);
            }}
          />
          <div className="h-1 w-full rounded-lg bg-green-light" />
          <IconButton
            iconSVG={utensils("hover:fill-[#43B64Fdd] fill-[#297031]")}
            handleClick={(e) => {
              handleMenu();
              toggle(e);
            }}
          />
        </aside>
        {/* About Us Section */}
        <Section header="About Us" hClass="ml-14">
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
                  className={`underline-effect ml-20 mt-8 w-fit font-secondary-secular text-4xl text-dark ${
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
        handleClose={toggle}
      />
    </div>
  );
}

export default Index;

let aboutUs_p = `Taco Delite West Plano opened in Feburary of 1989 and is located at
the Prairie Creek Village Shopping Center. Since then, Taco Delite has
earned 4 "Food Safety and Excellence" nominations and continues to
claim the best customers, separating itself as a prestige fast food
restaurant in one of the most competitive cities in Texas.`;

const getValidDate = (offset = 0) => {
  if (!isWeekday(getMinDate(offset))) {
    for (let i = 1; i < 3; i++) {
      if (isWeekday(getMinDate(offset + i))) return getMinDate(offset + i);
    }
  }

  return getMinDate(offset);
};

const getMinDate = (offset = 0) => {
  let minDate = new Date();
  minDate.setDate(minDate.getDate() + offset);
  return minDate;
};

const isWeekday = (date: Date) => {
  const day = new Date(date).getDay();
  return day !== 0 && day !== 6;
};

{
  /* <Catering
    header="Cater"
    subHeader="Just can't get enough? Personalize your order to fit your party."
  >
    {" "}
    <RemixForm className=" pb-80" method="post">
      <fieldset className="">
        <label
          className="font-primary-solid text-green-dark ml-2 text-xl"
          htmlFor=""
        >
          Name
        </label>
        <input
          className="mb-1 w-full rounded-2xl border-4 border-[#43B64F] p-2"
          type="text"
          placeholder="Nombre"
          //   onChange={(e) => setName(e.target.value)}
        />
        <label
          className="font-primary-solid text-green-dark ml-2 text-xl"
          htmlFor=""
        >
          Email
        </label>
        <input
          className="mb-1 w-full rounded-2xl border-4 border-[#43B64F] p-2"
          type="email"
          placeholder="example@burrito.com"
          // onChange={e => setEmail(e.target.value)}
        />
        <label
          className="font-primary-solid text-green-dark ml-2 text-xl"
          htmlFor=""
        >
          Event Description
        </label>
        <textarea
          className="mb-1 rounded-2xl border-4 border-[#43B64F] p-2"
          placeholder="Tell us about your event."
          //   onChange={(e) => setDescription(e.target.value)}
          aria-label="Event Description"
          maxLength={185}
          rows={4}
          cols={30}
        />
        <label
          className="font-primary-solid text-green-dark ml-2 text-xl"
          htmlFor=""
        >
          Date
        </label>
        <DatePicker
          className="mb-6 w-full rounded-2xl border-4 border-[#43B64F] p-2"
          selected={formStartDate}
          onChange={(date: Date) => setFormStartDate(date)}
          minDate={getValidDate(2)}
          filterDate={isWeekday}
        />
        <button
          className="w-fit rounded-xl bg-[#43B64F] p-3 text-xl text-white"
          type="submit"
        >
          Send Off
        </button>
      </fieldset>
    </RemixForm>
  </Catering> */
}
