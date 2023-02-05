import React from 'react'
import AboutCollege from './AboutCollege';
import CollegeClubs from "./CollegeClubs";

export default function CollegeHero() {
  return (
    <div>
      {/* https://d8it4huxumps7.cloudfront.net/uploads/images/opportunity/banner/63a493b4e5b10_spit-hackathon-2023.png?d=1920x557 */}
         <div className='bg-[url("https://images.static-collegedunia.com/public/college_data/images/campusimage/1479361245GJHGHJ.PNG")] w-full bg-cover bg-center p-48'>
            <div className="flex flex-col items-center justify-center">
                <h1 className="mb-2 text-4xl font-bold text-center">
                |
                </h1>
                <p className="text-lg text-center text-white">
                </p>
                {/* <div className="mt-4">
                    <button className="px-6 py-2 text-center text-white bg-indigo-600 rounded-md shadow-md">
                        Get started
                    </button>
                </div> */}
            </div>
        </div>
        <AboutCollege />
        <CollegeClubs />
    </div>
  )
}
