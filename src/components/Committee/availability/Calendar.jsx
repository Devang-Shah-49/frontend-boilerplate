import React, { useState, useEffect } from "react";
import { CalendarHeader } from "./CalendarHeader";
import { Day } from "./Day";
import { NewEventModal } from "./NewEventModal";
import { DeleteEventModal } from "./DeleteEventModal";
import { useDate } from "./useDate";

export const Calendar = () => {
  const [nav, setNav] = useState(0);
  const [slotArray, setSlotArray] = useState([]);
  const [clicked, setClicked] = useState();
  const [events, setEvents] = useState(
    localStorage.getItem("events")
      ? JSON.parse(localStorage.getItem("events"))
      : []
  );

  const eventForDate = (date) => events.find((e) => e.date === date);
  console.log(clicked);

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const { days, dateDisplay } = useDate(events, nav);

  const slots = [
    {
      date: "2023-02-06",
      slots: [
        ["1pm", "2pm"],
        ["2pm", "3pm"],
        ["3pm", "4pm"],
        ["4pm", "5pm"],
      ],
    },
  ];

  let timeSlot = [
    ["11am", "12pm"],
    ["12pm", "1pm"],
    ["1pm", "2pm"],
    ["1pm", "2pm"],
    ["2pm", "3pm"],
    ["3pm", "4pm"],
    ["4pm", "5pm"],
    ["5pm", "6pm"],
    ["6pm", "7pm"],
    ["7pm", "8pm"],
    ["8pm", "9pm"],
  ];

  let bookedSlot = [
    ["1pm", "2pm"],
    ["2pm", "3pm"],
    ["3pm", "4pm"],
    ["4pm", "5pm"],
  ];

  let newArr = [];
  const slotChecker = () => {
    for (let i = 0; i < timeSlot.length; i++) {
      for (let j = 0; j < bookedSlot.length; j++) {
        if (JSON.stringify(timeSlot[i]) === JSON.stringify(bookedSlot[j])) {
          newArr.push(bookedSlot[j]);
        }
      }
    }
    // setSlotArray(newArr);
  };

  slotChecker();

  return (
    <>
      <div className="w-full flex">
        <div className="w-1/2 m-6">
          <CalendarHeader
            dateDisplay={dateDisplay}
            onNext={() => setNav(nav + 1)}
            onBack={() => setNav(nav - 1)}
          />

          <div className="w-[740px] flex flex-wrap justify-evenly my-3">
            <div className="font-semibold text-indigo-400">Sun</div>
            <div className="font-semibold text-indigo-400">Mon</div>
            <div className="font-semibold text-indigo-400">Tues</div>
            <div className="font-semibold text-indigo-400">Wed</div>
            <div className="font-semibold text-indigo-400">Thur</div>
            <div className="font-semibold text-indigo-400">Fri</div>
            <div className="font-semibold text-indigo-400">Sat</div>
          </div>

          <div className="mx-4 flex w-full flex-wrap">
            {days.map((d, index) => (
              <Day
                key={index}
                day={d}
                onClick={() => {
                  if (d.value !== "padding") {
                    setClicked(d.date);
                  }
                }}
              />
            ))}
          </div>
        </div>
        <div class="min-h-screen w-full border-l my-4">
          <div className="px-4 py-2 mx-4 my-2 border bg-indigo-100 rounded border-indigo-300 flex justify-between">
            <h1 className="text-xl font-semibold text-indigo-600">
              {" "}
              Time Slots{" "}
            </h1>

            <h3 className="text-lg  text-indigo-600">Date :{clicked}</h3>
          </div>
          <div className={`mx-4 grid grid-cols-4 gap-2`}>
            {timeSlot.map((slot) => (
              <>
                <div
                  className={` ${
                    JSON.stringify(newArr).includes(JSON.stringify(slot))
                      ? " bg-gray-50 shadow-none border-gray-300 text-gray-400 hover:disabled"
                      : "text-indigo-500 border-indigo-400 shadow hover:cursor-pointer hover:bg-indigo-500 hover:text-white"
                  } col-span-2 px-4 py-2 m-1 text-center  rounded-md border `}
                >
                  {slot[0]} - {slot[1]}
                </div>
              </>
            ))}
          </div>
        </div>
      </div>

      {clicked &&
        !eventForDate(clicked) &&
        // <NewEventModal
        //   onClose={() => setClicked(null)}
        //   onSave={(title) => {
        //     setEvents([...events, { title, date: clicked }]);
        //     setClicked(null);
        //   }}
        // />
        null}

      {clicked && eventForDate(clicked) && (
        <DeleteEventModal
          eventText={eventForDate(clicked).title}
          onClose={() => setClicked(null)}
          onDelete={() => {
            setEvents(events.filter((e) => e.date !== clicked));
            setClicked(null);
          }}
        />
      )}
    </>
  );
};
