import React from "react";
import Button from "../../components/button/Button";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";

const DashboardHeader = () => {
  const { userInfo } = useAuth();

  return (
    <div className="flex justify-end gap-5 p-5 bg-white border-b border-gray-200">
      <Button
        kind="secondary"
        to="/manage/add-post"
        moreClass="header-button"
        height="h-[52px]"
      >
        Write new post
      </Button>
      <Link
        to="/profile"
        className="w-[52px] h-[52px] rounded-full overflow-hidden"
      >
        <img
          src={userInfo?.avatar || ""}
          alt=""
          className="object-cover w-full h-full rounded-full"
        />
      </Link>
    </div>
  );
};
``;
export default DashboardHeader;
