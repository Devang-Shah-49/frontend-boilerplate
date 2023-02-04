import React from "react";
import Navbar from "../navbar";
import Footer from "../footer";
import CollegeBanner from "./CollegeBanner";
import RaiseQueryModal from "./RaiseQueryModal";
import CollegeHero from "./CollegeHero";

const College = () => {
  return (
    <div>
      <Navbar />
      <CollegeBanner />
      {/* <RaiseQueryModal /> */}
      <CollegeHero />
      <Footer />
    </div>
  );
};

export default College;