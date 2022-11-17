import NavMenu from "~/components/navMenu";
import logo from "../../media/logo_21.svg";
import { category } from "~/routes";

type Props = {
  categories: category[];
};

const Nav = ({ categories }: Props) => {
  return (
    <nav className="flex h-20 flex-row items-center justify-between bg-[#F4FBF5] px-6">
      <figure>
        <img className="w-12" src={logo} alt="Taco Delite Logo" />
      </figure>
      <p className="primary-gris text-primary text-3xl">Taco Delite</p>
      <NavMenu categories={categories} />
    </nav>
  );
};

export default Nav;
