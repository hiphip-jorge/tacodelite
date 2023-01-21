// import DatePicker from "react-datepicker";
// import { Form as RemixForm } from "@remix-run/react";

export let aboutUs_p = `Taco Delite West Plano opened in Feburary of 1989 and is located at
the Prairie Creek Village Shopping Center. Since then, Taco Delite has
earned 4 "Food Safety and Excellence" nominations and continues to
claim the best customers, separating itself as a prestige fast food
restaurant in one of the most competitive cities in Texas.`;

export const getValidDate = (offset = 0) => {
    if (!isWeekday(getMinDate(offset))) {
      for (let i = 1; i < 3; i++) {
        if (isWeekday(getMinDate(offset + i))) return getMinDate(offset + i);
      }
    }
  
    return getMinDate(offset);
};

export const getMinDate = (offset = 0) => {
    let minDate = new Date();
    minDate.setDate(minDate.getDate() + offset);
    return minDate;
};

export const isWeekday = (date) => {
    const day = new Date(date).getDay();
    return day !== 0 && day !== 6;
};
  // const [formStartDate, setFormStartDate] = useState(getValidDate(2));

{
    /* <Catering
      header="Cater"
      subHeader="Just can't get enough? Personalize your order to fit your party."
    >
      {" "}
      <RemixForm className=" pb-80" method="post">
        <fieldset className="">
          <label
            className="font-primary-solid text-green-dark ml-2 text-xl"
            htmlFor=""
          >
            Name
          </label>
          <input
            className="mb-1 w-full rounded-2xl border-4 border-[#43B64F] p-2"
            type="text"
            placeholder="Nombre"
            //   onChange={(e) => setName(e.target.value)}
          />
          <label
            className="font-primary-solid text-green-dark ml-2 text-xl"
            htmlFor=""
          >
            Email
          </label>
          <input
            className="mb-1 w-full rounded-2xl border-4 border-[#43B64F] p-2"
            type="email"
            placeholder="example@burrito.com"
            // onChange={e => setEmail(e.target.value)}
          />
          <label
            className="font-primary-solid text-green-dark ml-2 text-xl"
            htmlFor=""
          >
            Event Description
          </label>
          <textarea
            className="mb-1 rounded-2xl border-4 border-[#43B64F] p-2"
            placeholder="Tell us about your event."
            //   onChange={(e) => setDescription(e.target.value)}
            aria-label="Event Description"
            maxLength={185}
            rows={4}
            cols={30}
          />
          <label
            className="font-primary-solid text-green-dark ml-2 text-xl"
            htmlFor=""
          >
            Date
          </label>
          <DatePicker
            className="mb-6 w-full rounded-2xl border-4 border-[#43B64F] p-2"
            selected={formStartDate}
            onChange={(date: Date) => setFormStartDate(date)}
            minDate={getValidDate(2)}
            filterDate={isWeekday}
          />
          <button
            className="w-fit rounded-xl bg-[#43B64F] p-3 text-xl text-white"
            type="submit"
          >
            Send Off
          </button>
        </fieldset>
      </RemixForm>
    </Catering> */
}
  