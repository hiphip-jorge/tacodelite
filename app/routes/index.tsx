import Button from "~/components/button";
import catering from "~/assets/catering.png";
import AboutUs from "~/sections/aboutUs";
import Menu from "~/sections/menu";
import Catering from "~/sections/catering";
import Section from "~/components/section";

import { FoodItem } from "@prisma/client";
import { prisma } from "~/db.server";
import { useLoaderData } from "@remix-run/react";
import { ActionFunction, LoaderFunction } from "@remix-run/server-runtime";
import Nav from "~/components/nav";
import { Form as RemixForm } from "@remix-run/react";
import DatePicker from "react-datepicker";
import { useState } from "react";

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
  const categories = useLoaderData<category[]>();
  const [formStartDate, setFormStartDate] = useState(getValidDate(2));

  return (
    <div className="bg-white">
      {/* Taco Delite Header */}
      <header className="flex h-24 w-full items-center justify-center bg-green-50">
        <p className="primary-gris text-primary text-5xl">Taco Delite</p>
      </header>
      {/* Hero Section */}
      <Section header="15th Street" height="h-[calc(100vh-6rem)]">
        <picture>
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
      </Section>
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
