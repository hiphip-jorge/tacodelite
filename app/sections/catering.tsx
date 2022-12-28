import { ReactNode, useState } from "react";

type Props = {
  header: string;
  subHeader?: string;
  children: ReactNode;
  height?: string;
  width?: string;
};

const Catering = ({ header, subHeader, children }: Props) => {
  return (
    <section className="my-8">
      <h1 className="primary-outline text-primary text-center text-6xl">
        {header}
      </h1>
      <h2 className="primary-solid text-secondary text-2xl">{subHeader}</h2>
      {children}
    </section>
  );
};

export default Catering;
