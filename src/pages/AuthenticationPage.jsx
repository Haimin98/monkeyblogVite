import React from "react";

const AuthenticationPage = ({ children }) => {
  return (
    <div className="min-h-[100vh] p-10 ">
      <img
        srcSet="/logo.png 2x"
        alt="monkey-blogging"
        className="mx-auto my-0 mb-[30px]"
      />
      <h1 className="mb-10 text-4xl font-bold text-center text-primary">
        Monkey Blogging
      </h1>
      {children}
    </div>
  );
};

export default AuthenticationPage;
