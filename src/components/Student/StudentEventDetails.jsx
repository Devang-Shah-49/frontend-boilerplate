import React from 'react'
import StudentModal from './StudentModal';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from '../footer';
import Navbar from '../navbar';
import EventPage from './EventPage';

export default function StudentEventDetails() {
// const navigate = useNavigate();
//   const search = useLocation();
//   console.log(search)
//   const obj = search?.state?.event_details;
//   console.log(obj)
  return (
    <div>
    <Navbar/>
        {/* <StudentModal/> */}
        <EventPage/>
    <Footer/>
    </div>
  )
}
