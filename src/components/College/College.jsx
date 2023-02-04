import React from "react";
import Navbar from "../navbar";
import CollegeBanner from "./CollegeBanner";
import RaiseQueryModal from "./RaiseQueryModal";

const College = () => {
  return (
    <div>
      <Navbar />
      <CollegeBanner />
      <RaiseQueryModal />
    </div>
  );
};

export default College;
