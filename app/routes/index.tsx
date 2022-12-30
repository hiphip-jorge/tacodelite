import { useState } from "react";
import { useLoaderData } from "@remix-run/react";
import { ActionFunction, LoaderFunction } from "@remix-run/server-runtime";
import { Form as RemixForm } from "@remix-run/react";
// Prisma
import { prisma } from "~/db.server";
import { FoodItem } from "@prisma/client";
// Components
import Card from "~/components/Card";
import Button from "~/components/Button";
import Section from "~/components/Section";
import IconButton from "~/components/IconButton";
// Utilities
import { useInView } from "react-intersection-observer";
// import DatePicker from "react-datepicker";
// assets/imgs
import catering from "~/assets/catering.png";
import td_building from "~/assets/taco_delite.jpeg";
import { car, utensils } from "~/assets/svg";

import Catering from "~/sections/catering";
import { useEffect } from "react";
import Modal from "~/components/Modal";

export type category = { name: string; foodItems: Array<FoodItem> };

const action: ActionFunction = async ({ request }) => {
  let formData = await request.formData();
  let email = formData.get("email");
  console.log("email", email);
};

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
  // const [formStartDate, setFormStartDate] = useState(getValidDate(2));
  const categories = useLoaderData<category[]>();
  const categoryRefs = categories.map(() => {
    return useInView({ threshold: 1, rootMargin: "-100px 0px -250px 0px" });
  });

  const toggle = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div className="bg-white">
      {/* Taco Delite Header */}
      <header className="flex h-24 w-full items-center justify-center bg-green-50">
        <p className="primary-gris text-primary text-5xl">Taco Delite</p>
      </header>
      <main>
        {/* Hero Section */}
        <Section header="15th Street" height="h-[calc(100vh-6rem)]">
          <picture>
            <img src={catering} alt="plate 1 image" />
          </picture>
          <div className="px-12">
            <h2 className="primary-solid text-tertiary text-[2rem] leading-9">
              Fresh Everyday.
            </h2>
            <h2 className="primary-solid text-primary text-end text-[2rem] leading-9">
              Real Ingredients.
            </h2>
          </div>
          <div className="mx-auto flex w-fit gap-4">
            <Button className="h-12 w-32 rounded-[14px]" handleClick={toggle}>
              Menu
            </Button>
            <Button
              className="h-12 w-32 rounded-[14px]"
              handleClick={toggle}
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
            handleClick={() => {}}
          />
          <div className="bg-secondary h-1 w-full" />
          <IconButton
            iconSVG={utensils("hover:fill-[#43B64Fdd] fill-[#297031]")}
            handleClick={() => {}}
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
            <p className="text-tertiary secondary-secular-one text-lg">
              {aboutUs_p}
            </p>
          </div>
        </Section>
        {/* Menu Section  */}
        <Section header="Menu">
          {categories.map((category, idx) => (
            <div id={category.name.toLowerCase()} key={category.name}>
              <h1
                id={category.name}
                ref={categoryRefs[idx].ref}
                className={`text-tertiary secondary-secular-one underline-effect ml-20 mt-8 w-fit text-4xl ${
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
        </Section>
      </main>
      <footer>
        <Section header="footer">
          <div className="h-[1000px]"></div>
        </Section>
      </footer>
      <aside>
        <button className="fixed top-8 right-8 z-30 h-10 w-10" onClick={toggle}>
          {isOpen && <span className="cancel"></span>}
        </button>
        <Modal categories={categories} isOpen={isOpen} handleClose={toggle} />
      </aside>
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
  /* <Nav categories={categories} />
<section className="flex h-[calc(100vh-5rem)] flex-col justify-around py-10">
  <h1 className="primary-outline text-primary text-center text-6xl">
    15th Street
  </h1>
  <picture className="flex justify-between">
    <img src={catering} className="" alt="plate 1 image" />
  </picture>
  <div className="px-12">
    <h2 className="primary-solid text-tertiary text-[2rem] leading-9">
      Fresh Everyday.
    </h2>
    <h2 className="primary-solid text-primary text-end text-[2rem] leading-9">
      Real Ingredients.
    </h2>
  </div>
  <div className="mx-auto flex w-fit gap-4">
    <Button className="h-12 w-32 rounded-[14px]">Menu</Button>
    <Button className="h-12 w-32 rounded-[14px]" primary>
      Order
    </Button>
  </div>
</section>
<main className="px-12">
  <AboutUs header="About Us">{aboutUs_p}</AboutUs>
  <Menu header="Menu" categories={categories} />
  <Catering
    header="Cater"
    subHeader="Just can't get enough? Personalize your order to fit your party."
  >
    {" "}
    <RemixForm className=" pb-80" method="post">
      <fieldset className="">
        <label
          className="primary-solid text-tertiary ml-2 text-xl"
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
          className="primary-solid text-tertiary ml-2 text-xl"
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
          className="primary-solid text-tertiary ml-2 text-xl"
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
          className="primary-solid text-tertiary ml-2 text-xl"
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
  </Catering>
</main>
<footer></footer> */
}
