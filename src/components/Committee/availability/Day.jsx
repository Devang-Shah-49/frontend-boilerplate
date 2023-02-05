import React from "react";

export const Day = ({ day, onClick }) => {
  const className = `hover:cursor-pointer hover:bg-indigo-600 hover:text-white w-[100px] px-[50px] py-[20px] border-indigo-200 bg-indigo-50 text-indigo-900 h-[100px] border flex ${
    day.value === "padding" ? "padding" : ""
  } ${day.isCurrentDay ? "currentDay" : ""}`;
  return (
    <div onClick={onClick} className={className}>
      {day.value === "padding" ? "" : day.value}

      {day.event && (
        <div className="text-center items-center">{day.event.title}</div>
      )}
    </div>
  );
};
