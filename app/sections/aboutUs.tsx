import React from "react";
import td_building from "~/assets/taco_delite.jpeg";

type Props = {
  header: string;
  children: string;
};

const AboutUs = (props: Props) => {
  return (
    <section className="my-8">
      <h1 className="primary-outline text-primary text-center text-6xl">
        {props.header}
      </h1>
      <figure>
        <img src={td_building} className="my-4 rounded-3xl shadow-lg" alt="" />
      </figure>
      <p className="text-tertiary secondary-secular-one text-lg">
        {props.children}
      </p>
    </section>
  );
};

export default AboutUs;
