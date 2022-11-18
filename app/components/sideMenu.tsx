import { useEffect, useState } from "react";
import { Link } from "@remix-run/react";
import { category } from "~/routes";
import NavItems from "./navItems";
import doorDash from "../../media/DoorDash-D.svg";
import Accordion from "./accordion";

// TODO:
// [X] - add menu subcontent
// [X] - add smooth scroll to jump to items
// [] - make Accordion open toggle functional

type Props = {
  isOpen: boolean;
  categories: category[];
};

const doorDashUrl = "https://www.doordash.com";
const uberEatsUrl = "https://www.ubereats.com";

const SideMenu = ({ isOpen, categories }: Props) => {
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
        document.querySelector(".sideMenu")?.classList.add("hidden");
      }, 350);
    }
  }, [isOpen]);

  return (
    <aside className={`sideMenu ${menuClassState}`}>
      <section className="flex h-full w-full flex-col py-16 px-14">
        <NavItems vertical>
          <Accordion
            menuH1="place order"
            subMenu={[
              { name: "doordash", href: doorDashUrl },
              { name: "ubereats", href: uberEatsUrl },
            ]}
            // primaryColor="tertiary"
            // isOpen
          />
          <Accordion
            menuH1="menu"
            subMenu={categories.map((category) => {
              return { name: category.name, href: "#" + category.name };
            })}
            // primaryColor="tertiary"
            isOpen
          />
        </NavItems>
      </section>
    </aside>
  );
};

export default SideMenu;
