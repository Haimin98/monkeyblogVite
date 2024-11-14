import React from "react";
import DashboardHeading from "../dashboard/DashboardHeading";
import UserTable from "./UserTable";
import Button from "../../components/button/Button.jsx";

const UserManage = () => {


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
                    // onChange={}
                />
                <Button kind={"primary"} to={"/manage/add-user"}>Add new user</Button>
            </div>
            <UserTable></UserTable>
        </div>
    );
};

export default UserManage;
