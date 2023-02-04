import React, {useEffect,useState} from 'react'
import Footer from '../footer';
import Navbar from '../navbar';
import ClubEventCard from "./ClubEventCard";
import CollegeServices from "../../services/CollegeServices";

export default function ClubDetails() {
const [clubEventList, setClubEventList] = useState([]);
useEffect(()=>{
    const call = async ()=>{
        await CollegeServices.getClubEvents(localStorage.getItem("appToken")).then((res)=>{
        setClubEventList(res.data.data);
        console.log(res.data.data);
        })
    }
    call();
    },[])
    console.log(clubEventList);
  return (
    <div>
        <Navbar/>
        {/* <button className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
            Check Pending Approvals
        </button> */}
        <div className="grid justify-center sm:grid-cols-2 lg:grid-cols-4 gap-y-8  p-4 ">
          {clubEventList?.slice(0,8).map((item)=>(
            <ClubEventCard
            item = {item}
            title={item.name}
            description={item.description}
            image={item.thumbnail}
            id={item._id}
          />
          ))}
        </div>
        <Footer/>
    </div>
  )
}
