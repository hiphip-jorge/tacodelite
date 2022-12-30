import React from "react";

type Props = {
  header: string;
  hClass?: string;
  subHeader?: string;
  children: React.ReactNode;
  height?: string;
  width?: string;
};

const Section = ({ header, hClass, subHeader, children, height, width }: Props) => {
  return (
    <section
      className={`flex flex-col justify-around py-10 ${height ? height : ""} ${
        width ? width : ""
      }`}
    >
      <h1 className={`primary-outline text-primary text-6xl w-fit mx-auto ${hClass ? hClass : ''}`}>
        {header}
      </h1>
      {subHeader && <h2>{subHeader}</h2>}
      {children}
    </section>
  );
};

export default Section;
