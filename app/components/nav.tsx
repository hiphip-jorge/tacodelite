import NavMenu from "~/components/navMenu";
import logo from "../../media/logo_21.svg";

const Nav = () => {
  return (
    <nav className="flex h-20 flex-row items-center justify-between bg-[#F4FBF5] px-8">
      <figure>
        <img className="w-12" src={logo} alt="Taco Delite Logo" />
      </figure>
      <p className="primary-gris text-primary text-3xl">Taco Delite</p>
      <NavMenu />
    </nav>
  );
};

export default Nav;
