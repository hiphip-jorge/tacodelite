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
      <h1 className="font-primary-outline text-center text-6xl text-green-primary">
        {header}
      </h1>
      <h2 className="font-primary-solid text-2xl text-green-light">
        {subHeader}
      </h2>
      {children}
    </section>
  );
};

export default Catering;
