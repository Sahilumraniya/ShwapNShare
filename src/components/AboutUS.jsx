import React from "react";

function About() {
  return (
    <div className="bg-violet-200 py-16">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 p-4">
          <img
            src="https://10web-site.ai/17/wp-content/uploads/sites/19/2023/10/recycled-shoe-store-home-about-image_rJ4X96j6.webp"
            alt="About Us"
            className="w-full h-auto"
          />
        </div>
        <div className="md:w-1/2 p-4">
          <h2 className="text-3xl font-semibold mb-4">About Us</h2>
          <p className="text-gray-700">
            Online TradeHub is an online exchange platform that brings together
            users looking to trade various items. From shoes to books, and even
            electronics, we’re here to promote sustainable consumption and
            community engagement. Our goal is to create a sharing economy where
            everyone can benefit.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
