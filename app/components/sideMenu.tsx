import { Link } from "@remix-run/react";
import NavItems from "./navItems";
import doorDash from "../../media/DoorDash-D.svg";

type Props = {
  isOpen: boolean;
};

const SideMenu = ({ isOpen }: Props) => {
  if (!isOpen) {
    return <></>;
  }

  return (
    <aside className="absolute top-0 bottom-0 left-0 right-0 bg-[#8FD69788] backdrop-blur-md">
      <section className="my-12 mx-auto flex h-full w-4/5 flex-col">
        {/* <button className="bg-secondary h-16 w-16 self-end rounded-full text-2xl font-bold">
          X
        </button> */}
        <NavItems vertical>
          <li className="">
            <Link to="#menu">menu</Link>
          </li>
          <li>
            <Link to="/food">food pics</Link>
          </li>
          <li className="flex items-center gap-1">
            <Link to="/door-dash">order</Link>
            {/* <img src={doorDash} alt="Doordash logo" /> */}
          </li>
        </NavItems>
      </section>
    </aside>
  );
};

export default SideMenu;
