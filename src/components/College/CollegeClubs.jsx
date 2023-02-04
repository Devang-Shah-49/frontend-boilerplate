import React from 'react';
import CollegeCards from "./CollegeCards";

export default function CollegeClubs() {
  return (
    <div>
        <div class="container px-5 mx-auto">
        <div class="flex flex-col text-center w-full mb-20">
          <h2 class="text-lg text-purple-500 tracking-widest font-medium title-font mb-1">
            COMMITTEE INFORMATION
          </h2>
          <CollegeCards/>
        </div>
      </div>
    </div>
  )
}
