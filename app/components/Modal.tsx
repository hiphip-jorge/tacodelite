import { useEffect, useState } from "react";
import { modalContent } from "~/routes";

type Props = {
  isOpen: boolean;
  contentList: modalContent[] | undefined;
  handleClose: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

const Modal = ({ isOpen, contentList, handleClose }: Props) => {
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
        document.querySelector(".modalMask")?.classList.add("hidden");
      }, 350);
    }
  }, [isOpen]);

  return (
    <aside className={`modalMask ${menuClassState}`} onClick={handleClose}>
      <div className="modalContainer">
        <button
          className="bg-primary animate-grow-n-shrink-subtle absolute -right-6 -top-6 z-30 h-14 w-14 rounded-full p-4"
          onClick={handleClose}
        >
          <div className="h-5/6 w-5/6">
            {isOpen && <span className="cancel"></span>}
          </div>
        </button>
        <ul className="flex flex-col">
          {contentList?.map((item, idx) => {
            return (
              <li
                key={idx}
                className="text-tertiary flex justify-center p-2 after:absolute after:left-1/2 after:h-[2px] after:w-5/6 after:-translate-x-1/2 after:translate-y-8 after:rounded-sm after:bg-green-100 after:last:content-none"
              >
                <a
                  className="primary-solid h-full w-full text-center text-lg"
                  href={item.url}
                >
                  {item.name}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

export default Modal;
