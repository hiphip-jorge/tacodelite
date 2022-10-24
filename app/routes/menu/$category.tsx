import { useLoaderData } from "@remix-run/react";

const MenuSection = () => {
  const items = useLoaderData();

  console.log("items", items);
};

export default MenuSection;


