import React from "react";

type Props = { header: string };

const Catering = ({ header }: Props) => {
  return (
    <section className="my-8">
      <h1 className="primary-outline text-primary text-center text-6xl">
        {header}
      </h1>
    </section>
  );
};

export default Catering;
