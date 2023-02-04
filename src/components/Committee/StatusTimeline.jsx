import React, { useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
const StatusTimeline = () => {
  const [status, setStatus] = useState(false);
  return (
    <>
      <ol class="w-1/2 items-center sm:flex">
        <li class="relative mb-6 sm:mb-0">
          <div class="flex items-center">
            <div
              class={` ${
                status ? "bg-green-100" : "bg-red-100"
              } z-10 flex items-center justify-center w-10 h-10  rounded-full ring-0 ring-white shrink-0`}
            >
              <CheckCircleIcon
                className={` ${
                  status ? "text-green-500" : "text-red-500"
                } w-5 h-5`}
              />
            </div>
            <div class="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
          </div>
          <div class="mt-3 sm:pr-8">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              Pending
            </h3>
            <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              Released on December 2, 2021
            </time>
          </div>
        </li>
        <li class="relative mb-6 sm:mb-0">
          <div class="flex items-center">
            <div
              class={` ${
                status ? "bg-green-100" : "bg-red-100"
              } z-10 flex items-center justify-center w-10 h-10  rounded-full ring-0 ring-white shrink-0`}
            >
              <CheckCircleIcon
                className={` ${
                  status ? "text-green-500" : "text-red-500"
                } w-5 h-5`}
              />
            </div>
            <div class="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
          </div>
          <div class="mt-3 sm:pr-8">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              In-Review
            </h3>
            <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              Released on December 2, 2021
            </time>
          </div>
        </li>
        <li class="relative mb-6 sm:mb-0">
          <div class="flex items-center">
            <div
              class={` ${
                status ? "bg-green-100" : "bg-red-100"
              } z-10 flex items-center justify-center w-10 h-10  rounded-full ring-0 ring-white shrink-0`}
            >
              <CheckCircleIcon
                className={` ${
                  status ? "text-green-500" : "text-red-500"
                } w-5 h-5`}
              />
            </div>
            {/* <div class="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div> */}
          </div>
          <div class="mt-3 sm:pr-8">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              Approved
            </h3>
            <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              Released on December 2, 2021
            </time>
          </div>
        </li>
      </ol>
    </>
  );
};

export default StatusTimeline;
