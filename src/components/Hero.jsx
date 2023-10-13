import React from "react";
import Typical from "react-typical";

function Hero() {
  return (
    <div
      className="relative bg-cover bg-center h-96 flex items-center text-white z-0"
      style={{
        backgroundImage:
          "url(https://10web-site.ai/17/wp-content/uploads/sites/19/2023/10/recycled-shoe-store-hero-image-bg_rJ4X96j6.webp)",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="container mx-auto relative z-10 text-center">
        <h1 className="text-4xl font-bold mb-4"><span className="text-[#e1d3ff] duration-75"> <Typical
            steps={['Welcome to TradeHub!', 1000,'Swap with Ease.',3000,'Discover. Share. Exchange.',4000]}
            loop={Infinity}
          /> </span></h1>
        <p className="text-lg mb-8">
          Discover, Share, and Exchange Your Items and Skills
        </p>
        <button className="bg-white text-blue-900 font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 hover:text-white transition-colors duration-300">
          Get Started
        </button>
      </div>
    </div>
  );
}

export default Hero;
