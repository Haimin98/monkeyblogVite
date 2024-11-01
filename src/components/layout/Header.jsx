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

// const HeaderStyles = styled.header`
//   padding: 20px 0;
//   .header-main {
//     display: flex;
//     align-items: center;
//   }
//   .logo {
//     display: block;
//     max-width: 50px;
//   }
//   .menu {
//     display: flex;
//     align-items: center;
//     gap: 20px;
//     margin-left: 40px;
//     list-style: none;
//     font-weight: 500;
//   }
//   .search {
//     margin-left: auto;
//     padding: 15px 25px;
//     border: 1px solid #ccc;
//     border-radius: 8px;
//     width: 100%;
//     max-width: 320px;
//     display: flex;
//     align-items: center;
//     position: relative;
//     margin-right: 20px;
//   }
//   .search-input {
//     flex: 1;
//     padding-right: 45px;
//     font-weight: 500;
//   }
//   .search-icon {
//     position: absolute;
//     top: 50%;
//     transform: translateY(-50%);
//     right: 25px;
//   }
//   @media screen and (max-width: 1023.98px) {
//     .logo {
//       max-width: 30px;
//     }
//     .menu,
//     .search,
//     .header-button,
//     .header-auth {
//       display: none;
//     }
//   }
// `;
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
        <div className="flex items-center">
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
          <div className=" ml-auto py-[15px] px-[25px] border border-solid border-[#ccc] rounded-lg w-full max-w-[320px] flex items-center relative mr-5 max-[1023.98px]:hidden ">
            <input
              type="text"
              className="flex-1 pr-[45px] font-medium"
              placeholder="Search posts..."
            />
            <span className="absolute right-[25px] top-[50%] translate-y-[-50%] max-[1023.98px]:max-w-[30px]">
              <svg
                width="18"
                height="17"
                viewBox="0 0 18 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse
                  cx="7.66669"
                  cy="7.05161"
                  rx="6.66669"
                  ry="6.05161"
                  stroke="#999999"
                  strokeWidth="1.5"
                />
                <path
                  d="M17.0001 15.5237L15.2223 13.9099L14.3334 13.103L12.5557 11.4893"
                  stroke="#999999"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M11.6665 12.2964C12.9671 12.1544 13.3706 11.8067 13.4443 10.6826"
                  stroke="#999999"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </div>
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
                {getLastName(userInfo?.displayName)}
              </strong>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
