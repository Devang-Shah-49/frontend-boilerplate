import React, {useLocation, useEffect, useState} from 'react';
import EventsServices from "../../../services/EventsServices";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
  } from "@material-tailwind/react";
  import EventCard from "./Redirecting";

export default function ViewEventCard() {
    const [approvedEventList, setApprovedEventList] = useState([]);
    const [publishedEventList, setPublishedEventList] = useState([]);
    const [approvalPendingEventList, setApprovalPendingEventList] = useState([]);
    useEffect(()=>{
        const call = async ()=>{
            await EventsServices.getEvents(localStorage.getItem("appToken")).then((res)=>{
              console.log(res);
              setApprovedEventList(res?.data?.data?.approved)
              setPublishedEventList(res?.data?.data?.published)
              setApprovalPendingEventList(res?.data?.data?.approvalPending)
            })
          }
          call();
        },[])
  return (
    <div>
      <div className="">
        <h6 class=" flex flex-col text-indigo-500 text-center text-2xl  tracking-widest pb- title-font mb-1">
          ONGOING EVENTS
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
    </div>
  )
}
