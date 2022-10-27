import { useInView } from "react-intersection-observer";
import { category } from "~/routes";

import Card from "~/components/card";

type Props = { header: string; categories: Array<category> };

// TODO:
// [] animate: implement slide up animation for cards
// [X] styling: add depth to cards

const Menu = ({ header, categories }: Props) => {
  const categoryRefs = categories.map(() => {
    return useInView({ threshold: 1, rootMargin: "-100px 0px -250px 0px" });
  });

  return (
    <section className="my-8">
      <h1 className="primary-outline text-primary  text-center text-6xl">
        {header}
      </h1>
      {categories.map((category, idx) => (
        <div id={category.name.toLowerCase()} key={category.name}>
          <h1
            ref={categoryRefs[idx].ref}
            className={`text-tertiary secondary-secular-one underline-effect ml-4 mt-4 w-fit text-4xl ${
              categoryRefs[idx].inView && "in--view"
            }`}
          >
            {category.name}
          </h1>
          {category.foodItems.map((item, idx) => {
            let { ref, inView } = useInView();

            return (
              <Card
                id={item.name.replaceAll(" ", "-")}
                ref={ref}
                className={inView && "slideInUp"}
                key={idx}
                item={item}
              />
            );
          })}
        </div>
      ))}
    </section>
  );
};

export default Menu;
