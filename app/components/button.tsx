type Props = {
  children: string;
  className?: string;
  handleClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  primary?: boolean;
};

const Button = (props: Props) => {
  return (
    <button
      className={
        (props.primary
          ? "bg-green-primary font-primary-solid text-white duration-300 hover:bg-green-dark " +
            props.className
          : "border-2 border-green-primary bg-white font-primary-solid text-green-primary duration-300 hover:border-0 hover:bg-green-light hover:text-white ") +
        props.className
      }
      onClick={props.handleClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
