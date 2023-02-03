import React from 'react';
import HeroHome from '../components/HeroHome';
import FeaturesHome from '../components/Features';
import FeaturesBlocks from '../components/FeaturesBlocks';
import Testimonials from '../components/Testimonials';

function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <main className="flex-grow">
        {/*  Page sections */}
        <HeroHome />
        <FeaturesHome />
        <FeaturesBlocks />
        <Testimonials />
      </main>
    </div>
  );
}

export default Home;