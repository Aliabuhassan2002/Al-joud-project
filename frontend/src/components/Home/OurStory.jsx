import React from 'react';
import { Link } from "react-router-dom";

function OurStory() {
  return (

    <div className="bg-gray-50 min-h-32 flex items-center justify-between px-12 w-full">
      <div className=" ml-10 pr-15">
        <h2 className="text-4xl font-bold text-[#AAB99A] mb-4 ">عطاء يبقى أثره</h2>
        <p className="text-xl text-black mb-6">صدقة جارية يدوم نفعها ويتضاعف أجرها </p>
        <Link
          to="/Announcements"
          className="bg-[#AAB99A] hover:bg-[#727D73] text-white font-bold py-2 px-6 rounded-md transition duration-300"
        >
          ساهم بعطائك
        </Link>
      </div>

      <div className="flex items-center">
        <img
          src="https://ehsan.sa/ehsan-ui/images/waqf-home-bg.png"
          alt="Plant seedling in hand"
          className="h-50 w-auto mr-25"
        />
      </div>
    </div>

  );
}

export default OurStory;