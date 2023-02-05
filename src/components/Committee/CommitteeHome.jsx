import React, { useEffect,useContext, useState } from "react";
import EventCard from "./EventCard";
import StatusTimeline from "./StatusTimeline";
import { appContext } from "../../context";
import EventsServices from "../../services/EventsServices";

export default function About() {
  const [approvedEventList, setApprovedEventList] = useState([]);
  const [publishedEventList, setPublishedEventList] = useState([]);
  const [approvalPendingEventList, setApprovalPendingEventList] = useState([]);
  useEffect(()=>{
    const call = async ()=>{
        await EventsServices.getEvents(localStorage.getItem("appToken")).then((res)=>{
          setApprovalPendingEventList(res.data.data.approvalPending);
          setPublishedEventList(res.data.data.published);
          setApprovedEventList(res.data.data.approved);
        })
      }
      call();
    },[])
  return (
    <div>
      <div class="container px-5 pt-14 mx-auto">
        <div class="flex flex-col text-center w-full mb-20">
          <h2 class="text-xl text-indigo-500 tracking-widest font-medium title-font mb-1">
            ABOUT THE COMMITTEE
          </h2>
          <h1 class="sm:text-3xl text-2xl font-medium title-font my-4 text-gray-900">
            CSI S.P.I.T.
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

      
      <br />
      <div className="">
        <h6 class=" flex flex-col text-indigo-500 text-center text-2xl  tracking-widest pb- title-font mb-1">
          APPROVAL PENDING EVENTS
        </h6>
        <div className="grid justify-center sm:grid-cols-2 lg:grid-cols-4 gap-y-8  p-4 ">
          {approvalPendingEventList?.slice(0,8).map((item)=>(
            <EventCard
            item = {item}
            title={item.name}
            description={item.description}
            image={item.thumbnail}
            id={item._id}
          />
          ))}
        </div>
      </div>
      <br />
      <div className="">
        <h6 class=" flex flex-col text-indigo-500 text-center text-2xl  tracking-widest pb- title-font mb-1">
          PUBLISHED EVENTS
        </h6>
        <div className="grid justify-center sm:grid-cols-2 lg:grid-cols-4 gap-y-8  p-4 ">
          {publishedEventList?.slice(0,8).map((item)=>(
            <EventCard
            item = {item}
            title={item.name}
            description={item.description}
            image={item.thumbnail}
            id={item._id}
          />
          ))}
        </div>
      </div>
      <br />
      <div className="">
        <h6 class=" flex flex-col text-indigo-500 text-center text-2xl  tracking-widest pb- title-font mb-1">
          APPROVED EVENTS
        </h6>
        <div className="grid justify-center sm:grid-cols-2 lg:grid-cols-4 gap-y-8  p-4 ">
          {approvedEventList?.slice(0,8).map((item)=>(
            <EventCard
            item = {item}
            title={item.name}
            description={item.description}
            image={item.thumbnail}
            id={item._id}
          />
          ))}
        </div>
      </div>
    </div>
  );
}
