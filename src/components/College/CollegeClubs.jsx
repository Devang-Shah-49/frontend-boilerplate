import React, {useState, useEffect} from 'react';
import CollegeCards from "./CollegeCards";
import CollegeServices from "../../services/CollegeServices";

export default function CollegeClubs() {
  const [clubList, setClubList] = useState([]);
  useEffect(()=>{
    const call = async ()=>{
        await CollegeServices.getClubs(localStorage.getItem("appToken")).then((res)=>{
          setClubList(res.data.data);
          console.log(res.data.data);
        })
      }
      call();
    },[])
    console.log(clubList);
  return (
    <div>
        <div class="container px-5 mx-auto">
        <div class="flex flex-col text-center w-full mb-20">
          <h2 class="text-lg text-purple-500 tracking-widest font-medium title-font mb-1">
            COMMITTEE INFORMATION
          </h2>
          <div className="grid justify-center sm:grid-cols-2 lg:grid-cols-4 gap-y-8  p-4 ">
          {clubList?.slice(0,8).map((item)=>(
            <CollegeCards
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
    </div>
  )
}
