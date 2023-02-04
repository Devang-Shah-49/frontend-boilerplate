import React from "react";

const userNames = [
  {
    name: "Jesse",
    position: "Chairperson",
    mail: "jesse@gmail.com",
  },
];

export default function Team() {
  return (
    <div>
      <h6 class=" flex flex-col text-center  text-2xl text-bdazzledblue tracking-widest font-bold title-font my-4">
        TEAM MEMBERS
      </h6>
      <div class="flex justify-center mb-10">
        {userNames.map((item) => (
          <div class="flex flex-wrap mx-4 -m-2">
            <div class="p-2 w-full">
              <div class="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                <img
                  alt="team"
                  class="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                  src="https://dummyimage.com/80x80"
                />
                <div class="flex-grow">
                  <h2 class="text-gray-900 title-font font-medium">
                    {item.name}
                  </h2>
                  <p class="text-gray-500">{item.position}</p>
                  <p class="text-gray-500">{item.mail}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
