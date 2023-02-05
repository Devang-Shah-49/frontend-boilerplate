import React from "react";

export const CalendarHeader = ({ onNext, onBack, dateDisplay }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="font-semibold text-xl text-indigo-600 ">
        {dateDisplay}
      </div>
      <div>
        <button
          onClick={onBack}
          className=" m-1 px-4 py-2 border border-indigo-600 text-indigo-600 rounded-md"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="m-1 px-4 py-2 bg-indigo-600 text-white rounded-md"
        >
          Next
        </button>
      </div>
    </div>
  );
};
