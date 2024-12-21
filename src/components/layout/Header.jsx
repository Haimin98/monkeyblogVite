import React from "react";
import { NavLink } from "react-router-dom";
import Button from "../button/Button";
import { useAuth } from "../../contexts/auth-context";
const menuLinks = [
  {
    url: "/",
    title: "Home",
  },
  {
    url: "/blog",
    title: "Blog",
  },
  {
    url: "/contact",
    title: "Contact",
  },
];
function getLastName(name) {
  if (!name) return "User";
  const length = name.split(" ").length;
  return name.split(" ")[length - 1];
}
const Header = () => {
  const { userInfo } = useAuth();
  // console.log(userInfo);
  return (
    <header className="px-0 py-5">
      <div className="container">
        <div className="flex items-center justify-between">
          <NavLink to="/">
            <img
              srcSet="/logo.png 2x"
              alt="monkey-blogging"
              className="max-w-[50px] block"
            />
          </NavLink>
          <ul className="flex items-center gap-5 ml-10 font-medium list-none max-[1023.98px]:hidden ">
            {menuLinks.map((item) => (
              <li className="menu-item" key={item.title}>
                <NavLink to={item.url} className="menu-link">
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>

          {!userInfo ? (
            <div className="max-[1023.98px]:hidden ml-5">
              <Button
                type="button"
                height="h-[56px]"
                style={{
                  maxWidth: "200px",
                }}
                to="/sign-up"
              >
                Sign Up
              </Button>
            </div>
          ) : (
            <div className="max-[1023.98px]:hidden">
              <span>Welcome back, </span>
              <strong className="text-primary">
                {getLastName(userInfo?.fullname)}
              </strong>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
