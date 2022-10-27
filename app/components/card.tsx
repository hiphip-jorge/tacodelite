import { useState } from "react";
import { motion } from "framer-motion";
import { menu_arrow } from "~/assets/svg";

type item = {
  name: string;
  description: string;
  price: string;
};

type Props = {
  item: item;
  id: string;
  className?: false | string;
  ref?: (node?: Element | null | undefined) => void;
};

const Card = ({ item, id, className }: Props) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <motion.div
      className={"card" + " " + className}
      id={id}
      layout
      transition={{ layout: { duration: 0.25, type: "spring" } }}
    >
      <motion.div
        className="flex items-center justify-between"
        layout="position"
      >
        <h3 className="primary-solid text-tertiary text-2xl leading-6">
          {item.name}
        </h3>
        <button
          className={`h-fit ${isOpen ? "open" : "close"}`}
          onClick={() => setOpen((prev) => !prev)}
        >
          {menu_arrow}
        </button>
      </motion.div>
      {isOpen && (
        <motion.p
          className="secondary-secular-one"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {item.description}
        </motion.p>
      )}
      <p className="secondary-secular-one text-primary text-2xl">
        {"$" + item.price}
      </p>
    </motion.div>
  );
};

export default Card;
