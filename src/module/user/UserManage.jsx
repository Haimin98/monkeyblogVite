import React, { useState } from "react";
import DashboardHeading from "../dashboard/DashboardHeading";
import UserTable from "./UserTable";
import Button from "../../components/button/Button.jsx";
import { debounce } from "lodash";
import { useAuth } from "../../contexts/auth-context.jsx";
import NotAdminPage from "../../pages/NotAdminPage.jsx";

const UserManage = () => {
  const [filter, setFilter] = useState("");
  const handleSearchUser = debounce((e) => {
    setFilter(e.target.value);
  }, 250);

  //*check role
  const { userInfo } = useAuth();

  if (userInfo?.role !== "admin") {
    return <NotAdminPage></NotAdminPage>;
  }
  return (
    <div>
      <DashboardHeading
        title="Users"
        desc="Manage your user"
      ></DashboardHeading>

      <div className="flex justify-between mb-10">
        <input
          type="text"
          className="w-full inline-block p-4 border border-gray-400 rounded-lg outline-none max-w-[400px] left-0"
          placeholder="Search user"
          onChange={handleSearchUser}
        />
        <Button kind={"primary"} to={"/manage/add-user"}>
          Add new user
        </Button>
      </div>
      <UserTable filter={filter}></UserTable>
    </div>
  );
};

export default UserManage;
