import React from 'react';
import Footer from '../footer';
import Navbar from '../navbar';
import ViewEventCard from './ViewEvents/ViewEventCard';

export default function index() {
  return (
    <div>
    <Navbar />
    <ViewEventCard/>
    <Footer />
    </div>
  )
}
