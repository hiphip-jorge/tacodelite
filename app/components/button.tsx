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
          ? "bg-primary hover:bg-tertiary primary-solid text-white duration-300 " +
            props.className
          : "primary-solid text-primary border-primary hover:bg-secondary border-2 bg-transparent duration-300 hover:border-0 hover:text-white ") +
        props.className
      }
      onClick={props.handleClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
