import React from "react";
import EventCard from "./EventCard";
import StatusTimeline from "./StatusTimeline";

export default function About() {
  return (
    <div>
      <div class="container px-5 pt-14 mx-auto">
        <div class="flex flex-col text-center w-full mb-20">
          <h2 class="text-xs text-purple-500 tracking-widest font-medium title-font mb-1">
            ABOUT THE COMMITTEE
          </h2>
          <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            S.P.I.T. Oculus
          </h1>
          <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
            Oculus is a Techno-Cultural Festival that represents the synergy
            between culture and technology. Be it performing arts, or
            hackathons. Writing poetry or technical paper.
          </p>
        </div>
      </div>

      <div className="flex justify-center">
        <StatusTimeline />
      </div>

      <h6 class=" flex flex-col text-center font-bold text-2xl text-bdazzledblue tracking-widest  title-font mb-1">
        UPCOMING EVENTS
      </h6>
      <div className="flex justify-center p-4 ">
        <EventCard
          title="Title 1"
          description={"Hello There "}
          image=""
          id="1"
        />
        <EventCard
          title="Title 2"
          description={"Hello There "}
          image=""
          id="2"
        />
        <EventCard
          title="Title 3"
          description={"Hello There "}
          image=""
          id="3"
        />
      </div>
      <br />
      <h6 class=" flex flex-col text-center text-2xl text-bdazzledblue tracking-widest font-medium title-font mb-1">
        PAST EVENTS
      </h6>
      <div class="flex flex-wrap mx-10">
        <div class="xl:w-1/4 md:w-1/2 p-4">
          <div class="bg-gray-200 p-6 rounded-lg">
            <img
              class="h-40 rounded w-full object-cover object-center mb-6"
              src="https://th.bing.com/th/id/OIP.4SHG9pPQ1YaM8oxYteyAbwHaEK?pid=ImgDet&rs=1"
              alt=""
            />
            <h3 class="tracking-widest text-indigo-500 text-xs font-medium title-font">
              May 2022
            </h3>
            <h2 class="text-lg text-gray-900 font-medium title-font mb-4">
              Hackathon
            </h2>
            <p class="leading-relaxed text-base">
              Fingerstache flexitarian street art 8-bit waistcoat. Distillery
              hexagon disrupt edison bulbche.
            </p>
          </div>
        </div>
        <div class="xl:w-1/4 md:w-1/2 p-4">
          <div class="bg-gray-200 p-6 rounded-lg">
            <img
              class="h-40 rounded w-full object-cover object-center mb-6"
              src="https://madlyodd.com/wp-content/uploads/2019/06/Mumbai-Dance-team-OG3-1000x525.png"
              alt="content"
            />
            <h3 class="tracking-widest text-indigo-500 text-xs font-medium title-font">
              August 2022
            </h3>
            <h2 class="text-lg text-gray-900 font-medium title-font mb-4">
              Cultural Festival
            </h2>
            <p class="leading-relaxed text-base">
              Fingerstache flexitarian street art 8-bit waistcoat. Distillery
              hexagon disrupt edison bulbche.
            </p>
          </div>
        </div>
        <div class="xl:w-1/4 md:w-1/2 p-4">
          <div class="bg-gray-200 p-6 rounded-lg">
            <img
              class="h-40 rounded w-full object-cover object-center mb-6"
              src="https://www.mansworldindia.com/wp-content/uploads/2019/09/cfxrht-fg67-1.jpg"
              alt="content"
            />
            <h3 class="tracking-widest text-indigo-500 text-xs font-medium title-font">
              November 2022
            </h3>
            <h2 class="text-lg text-gray-900 font-medium title-font mb-4">
              Gaming Blast
            </h2>
            <p class="leading-relaxed text-base">
              Fingerstache flexitarian street art 8-bit waistcoat. Distillery
              hexagon disrupt edison bulbche.
            </p>
          </div>
        </div>
        <div class="xl:w-1/4 md:w-1/2 p-4">
          <div class="bg-gray-200 p-6 rounded-lg">
            <img
              class="h-40 rounded w-full object-cover object-center mb-6"
              src="https://th.bing.com/th/id/OIP.yYU7kTuH5UR6rOoEuCajmAHaDT?pid=ImgDet&rs=1"
              alt="content"
            />
            <h3 class="tracking-widest text-indigo-500 text-xs font-medium title-font">
              January 2023
            </h3>
            <h2 class="text-lg text-gray-900 font-medium title-font mb-4">
              Racing contest
            </h2>
            <p class="leading-relaxed text-base">
              Fingerstache flexitarian street art 8-bit waistcoat. Distillery
              hexagon disrupt edison bulbche.
            </p>
          </div>
        </div>
      </div>
      <h6 class=" flex flex-col text-center  text-2xl text-purple-500 tracking-widest font-medium title-font mb-1">
        TEAM
      </h6>
    </div>
  );
}
