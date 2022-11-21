import { useEffect, useRef, useState } from "react";
import { Link } from "@remix-run/react";
import { category } from "~/routes";
import NavItems from "./navItems";
import Accordion from "./accordion";
import { Action } from "@remix-run/server-runtime/dist/router";

// TODO:
// [X] - add menu subcontent
// [X] - add smooth scroll to jump to items
// [X] - make Accordion open toggle functional
// []  - fix design

type Props = {
  isOpen: boolean;
  categories: category[];
  handleClose: Function;
};

const doorDashUrl = "https://www.doordash.com";
const uberEatsUrl = "https://www.ubereats.com";

const SideMenu = ({ isOpen, categories, handleClose }: Props) => {
  // active list of accordions; only one active
  const [active, setActive] = useState([false, false]);
  const [fadeOut, setFadeOut] = useState(false);
  const menuClassState = isOpen
    ? "sideMenu-fadeIn"
    : "" + !isOpen && fadeOut
    ? "sideMenu-fadeOut"
    : "" + !isOpen && !fadeOut
    ? "hidden"
    : "";

  const handleActive = (pos: number) => {
    setActive(() => {
      return active.map(({}, idx) => {
        // if this accordion is clicked, reverse state, else state is false
        return idx === pos ? !active[pos] : false;
      });
    });
  };

  useEffect(() => {
    // set true after the first menu open
    if (isOpen && !fadeOut) {
      setFadeOut(true);
    }
    // wait for fade out animation
    if (!isOpen) {
      setTimeout(() => {
        document.querySelector(".sideMenu")?.classList.add("hidden");
        setActive([false, false]);
      }, 350);
    }
  }, [isOpen]);

  return (
    <aside className={`sideMenu ${menuClassState}`}>
      <section className="flex h-full w-full flex-col py-16 px-14">
        <NavItems vertical>
          <Accordion
            menuProps={{ header: "Place Order", func: () => handleActive(0) }}
            subMenuProps={{
              items: [
                { name: "doordash", href: doorDashUrl },
                { name: "ubereats", href: uberEatsUrl },
              ],
              func: handleClose,
            }}
            active={active[0]}
          />
          <Accordion
            menuProps={{ header: "Menu", func: () => handleActive(1) }}
            subMenuProps={{
              items: categories.map((category) => {
                return { name: category.name, href: "#" + category.name };
              }),
              func: handleClose,
            }}
            active={active[1]}
          />
        </NavItems>
      </section>
    </aside>
  );
};

export default SideMenu;
