import React from "react";

type Props = {
  header: string;
  subHeader?: string;
  children: React.ReactNode;
  height?: string;
  width?: string;
};

const Section = ({ header, subHeader, children, height, width }: Props) => {
  return (
    <section
      className={`flex flex-col justify-around py-10 ${height ? height : ""} ${
        width ? width : ""
      }`}
    >
      <h1 className="primary-outline text-primary text-center text-6xl">
        {header}
      </h1>
      {subHeader && <h2>{subHeader}</h2>}
      {children}
    </section>
  );
};

export default Section;
