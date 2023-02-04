import React from "react";
import Navbar from "../navbar";
import CollegeBanner from "./CollegeBanner";
import RaiseQueryModal from "./RaiseQueryModal";
import CollegeHero from "./CollegeHero";

const College = () => {
  return (
    <div>
      <Navbar />
      <CollegeBanner />
      <RaiseQueryModal />
      <CollegeHero />
    </div>
  );
};

export default College;