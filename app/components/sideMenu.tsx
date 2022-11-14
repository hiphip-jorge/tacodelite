import { useEffect, useState } from "react";
import { Link } from "@remix-run/react";
import NavItems from "./navItems";
import doorDash from "../../media/DoorDash-D.svg";

// TODO:
// [] - add menu subcontent
// [] - add smooth scroll to jump to items

type Props = {
  isOpen: boolean;
};

const SideMenu = ({ isOpen }: Props) => {
  const [fadeOut, setFadeOut] = useState(false);
  const menuClassState = isOpen
    ? "sideMenu-fadeIn"
    : "" + !isOpen && fadeOut
    ? "sideMenu-fadeOut"
    : "" + !isOpen && !fadeOut
    ? "hidden"
    : "";

  useEffect(() => {
    // set true after the first menu open
    if (isOpen && !fadeOut) {
      setFadeOut(true);
    }
    // wait for fade out animation
    if (!isOpen) {
      setTimeout(() => {
        document.querySelector(".sideMenu").classList.add("hidden");
      }, 350);
    }
  }, [isOpen]);

  return (
    <aside className={`sideMenu ${menuClassState}`}>
      <section className="flex h-full w-full flex-col py-20 px-10">
        {/* <button className="bg-secondary h-16 w-16 self-end rounded-full text-2xl font-bold">
          X
        </button> */}
        <NavItems vertical>
          <li className="flex items-center gap-1">
            <Link to="/door-dash">place order</Link>
            {/* <img src={doorDash} alt="Doordash logo" /> */}
          </li>
          <li>
            <Link className="" to="#menu">
              menu
            </Link>
          </li>
        </NavItems>
      </section>
    </aside>
  );
};

export default SideMenu;
