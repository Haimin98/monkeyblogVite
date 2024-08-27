import React from "react";
import Button from "../../components/button/Button";

const HomeBanner = () => {
  return (
    <div className="h-[520px] bg-gradient-to-br from-primary to-secondary px-0 py-10 max-w-full mx-auto my-0 mb-[60px]">
      <div className="container">
        <div className="flex content-between item-center">
          <div className="max-w-[600px] text-white">
            <h1 className="mb-5 text-4xl">Monkey Blogging</h1>
            <div className="mb-10 leading-6 ">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
                voluptates, fugit voluptatem, natus, voluptas voluptate
              </p>
            </div>
            <Button to="/sign-up" kind="secondary">
              Get Started
            </Button>
          </div>
          <div className="banner-image">
            <img
              src="/banner.png"
              alt=""
              className="w-[508.119px] h-[414.715px] shrink-0 "
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
