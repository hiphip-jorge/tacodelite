import { Form } from "@remix-run/react";
import { useState } from "react";
import DatePicker from "react-datepicker";

// import "react-datepicker/dist/react-datepicker.css";

type Props = { header: string; subHeader?: string };

const Catering = ({ header, subHeader }: Props) => {
  const [formStartDate, setFormStartDate] = useState(getValidDate(2));

  return (
    <section className="my-8">
      <div>
        <h1 className="primary-outline text-primary text-center text-6xl">
          {header}
        </h1>
        <h2 className="primary-solid text-secondary text-2xl">{subHeader}</h2>
      </div>
      <Form className="flex flex-col gap-2 py-8 pb-80" method="post">
        <input
          className="rounded-2xl border-4 border-[#43B64F] p-2"
          type="text"
          placeholder="Name"
        />
        <input
          className="rounded-2xl border-4 border-[#43B64F] p-2"
          type="email"
          placeholder="email"
        />
        <textarea
          className="rounded-2xl border-4 border-[#43B64F] p-2"
          maxLength={185}
          rows={4}
          cols={30}
        />
        <DatePicker
          className="w-full rounded-2xl border-4 border-[#43B64F] p-2"
          selected={formStartDate}
          onChange={(date: Date) => setFormStartDate(date)}
          minDate={formStartDate}
          filterDate={isWeekday}
          placeholderText="Select a date 2 days from now"
        />
        <button
          className="w-fit rounded-xl bg-[#43B64F] p-3 text-xl text-white "
          type="submit"
        >
          Send off!
        </button>
      </Form>
    </section>
  );
};

export default Catering;

const getValidDate = (offset = 0) => {
  if (!isWeekday(getMinDate(offset))) {
    for (let i = 1; i < 3; i++) {
      if (isWeekday(getMinDate(offset + i))) return getMinDate(offset + i);
    }
  }

  return getMinDate(offset);
};

const getMinDate = (offset = 0) => {
  let minDate = new Date();
  minDate.setDate(minDate.getDate() + offset);
  return minDate;
};

const isWeekday = (date: Date) => {
  const day = new Date(date).getDay();
  return day !== 0 && day !== 6;
};
