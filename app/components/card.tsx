import { useState } from "react";
import { menu_arrow } from "~/assets/svg";

type item = {
  name: string;
  description: string;
  price: string;
};

type Props = {
  item: item;
  id: string;
};

const Card = ({ item, id }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="card" id={id}>
      <div className="flex items-center justify-between">
        <h3 className="primary-solid text-tertiary text-2xl leading-6">
          {item.name}
        </h3>
        <button
          className={`h-fit ${open ? "open" : "close"}`}
          onClick={() => setOpen((prev) => !prev)}
        >
          {menu_arrow}
        </button>
      </div>
      {open && <p className="secondary-secular-one">{item.description}</p>}
      <p className="secondary-secular-one text-primary text-2xl">
        {"$" + item.price}
      </p>
    </div>
  );
};

export default Card;
