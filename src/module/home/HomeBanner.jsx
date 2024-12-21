import React from "react";
import Button from "../../components/button/Button";

const HomeBanner = () => {
  return (
    <div className="min-h-[400px] md:h-[520px] bg-gradient-to-br from-primary to-secondary px-4 md:px-0 py-6 md:py-10 max-w-full mx-auto my-0 mb-[30px] md:mb-[60px]">
      <div className="container">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:gap-0">
          <div className="w-full md:max-w-[600px] text-white text-center md:text-left">
            <h1 className="mb-3 text-3xl md:mb-5 md:text-4xl">
              Monkey Blogging
            </h1>
            <div className="mb-6 leading-6 md:mb-10">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
                voluptates, fugit voluptatem, natus, voluptas voluptate
              </p>
            </div>
            <Button to="/sign-up" kind="secondary" className="mx-auto md:mx-0">
              Get Started
            </Button>
          </div>
          <div className="banner-image">
            <img
              src="/banner.png"
              alt="Banner"
              className="w-full max-w-[300px] md:w-[508.119px] md:h-[414.715px] object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
