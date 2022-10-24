import Header from "~/components/header";
import Button from "~/components/button";
import catering from "~/assets/catering.png";
import AboutUs from "~/sections/aboutUs";
import Menu from "~/sections/menu";

import { FoodItem } from "@prisma/client";
import { prisma } from "~/db.server";
import { useLoaderData } from "@remix-run/react";
import { LoaderFunction } from "@remix-run/server-runtime";

export type category = { name: string; foodItems: Array<FoodItem> };

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
  

  return (
    // <div className="bg-[#ECF8EE]">
    <div className="bg-[#ECF8EE]">
      <Header />
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
        <section className="my-8">
          <h1 className="primary-outline text-primary text-center text-6xl">
            Catering
          </h1>
        </section>
      </main>
      <footer></footer>
    </div>
  );
}

export default Index;

let aboutUs_p = `Taco Delite West Plano opened in Feburary of 1989 and is located at
the Prairie Creek Village Shopping Center. Since then, Taco Delite has
earned 4 "Food Safety and Excellence" nominations and continues to
claim the best customers, separating itself as a prestige fast food
restaurant in one of the most competitive cities in Texas.`;
