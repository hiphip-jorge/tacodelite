import { FoodItem } from "@prisma/client";
import { prisma } from "~/db.server";
import { Outlet, useLoaderData } from "@remix-run/react";
import { LoaderFunction } from "@remix-run/server-runtime";
import Header from "~/components/nav";

type category = { name: String; foodItem: Array<FoodItem> };
type loaderData = { categories: Array<category> };

export const loader: LoaderFunction = async () => {
  let categories = await prisma.category.findMany({
    select: {
      name: true,
      foodItems: true,
    },
  });

  return categories;
};

const Menu = () => {
  const categories = useLoaderData<loaderData>();

  return (
    <div>
      <Header />
      <section>
        <h1 className="primary-outline text-primary text-center text-5xl">
          Carousel
        </h1>
        <span className="flex h-8 w-3 justify-center bg-green-500"></span>
      </section>
      <Outlet />
    </div>
  );
};

export default Menu;
