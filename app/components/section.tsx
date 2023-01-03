import React from "react";

type Props = {
  header: string;
  hClass?: string;
  subHeader?: string;
  children: React.ReactNode;
  height?: string;
  width?: string;
};

const Section = ({
  header,
  hClass,
  subHeader,
  children,
  height,
  width,
}: Props) => {
  return (
    <section
      className={`flex flex-col justify-around py-10 ${height ? height : ""} ${
        width ? width : ""
      }`}
    >
      <h1
        className={`font-primary-outline mx-auto w-fit text-6xl md:text-7xl text-green-primary ${
          hClass ? hClass : ""
        }`}
      >
        {header}
      </h1>
      {subHeader && <h2>{subHeader}</h2>}
      {children}
    </section>
  );
};

export default Section;
