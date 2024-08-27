import React from "react";
import { NavLink } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="h-[100vh] flex items-center justify-center flex-col">
      <NavLink to="/" className="inline-block mb-10 max-w-[300px]">
        <img srcSet="logo.png 2x" alt="monkey-blog" />
      </NavLink>
      <h1 className="text-6xl font-black">Not Found Page</h1>
      <NavLink
        to="/"
        className="inline-block px-[30px] py-[15px] text-white bg-primary rounded-lg mt-10 font-semibold decoration-0"
      >
        Back Home
      </NavLink>
    </div>
  );
};

export default NotFoundPage;
