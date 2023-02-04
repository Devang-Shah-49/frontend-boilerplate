import React, { useEffect,useContext } from "react";
import EventCard from "./EventCard";
import StatusTimeline from "./StatusTimeline";
import { appContext } from "../../context";
import EventsServices from "../../services/EventsServices";

export default function About() {
  const {token} = useContext(appContext)
  console.log(token)
  useEffect(()=>{
    const call = async ()=>{
        await EventsServices.getEvents(token).then((res)=>{
          console.log(res)
        })
    }
    call();
  },[])
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

      {/* <div className="flex justify-center">
        <StatusTimeline />
      </div> */}

      <div className="mx-4">
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
      </div>
      <br />
      <div className="mx-4">
        <h6 class=" flex flex-col text-center font-bold text-2xl text-bdazzledblue tracking-widest  title-font mb-1">
          PAST EVENTS
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
      </div>
    </div>
  );
}
