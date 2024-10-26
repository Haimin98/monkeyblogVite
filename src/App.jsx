import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ThemeProvider from "./utils/ThemeProvider";
import { AuthProvider } from "./contexts/auth-context";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import NotFoundPage from "./pages/NotFoundPage";
import DashboardLayout from "./module/dashboard/DashboardLayout";
import PostManage from "./module/post/PostManage";
import PostAddNew from "./module/post/PostAddNew";
import CategoryAddNew from "./category/CategoryAddNew";
import CategoryManage from "./category/CategoryManage";
import CategoryUpdate from "./category/CategoryUpdate";
import UserManage from "./module/user/UserManage";
import UserAddNew from "./module/user/UserAddNew";

const App = () => {
  return (
    <Fragment>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/sign-up" element={<SignUpPage />}></Route>
            <Route path="/sign-in" element={<SignInPage />}></Route>
            <Route path="*" element={<NotFoundPage />}></Route>
            <Route element={<DashboardLayout></DashboardLayout>}>
              <Route path="/manage/post" element={<PostManage />}></Route>
              <Route path="/manage/add-post" element={<PostAddNew />}></Route>
              <Route
                path="/manage/category"
                element={<CategoryManage />}
              ></Route>
              <Route
                path="/manage/add-category"
                element={<CategoryAddNew />}
              ></Route>
              <Route
                path="/manage/update-category"
                element={<CategoryUpdate />}
              ></Route>
              <Route path="/manage/user" element={<UserManage />}></Route>
              <Route path="/manage/add-user" element={<UserAddNew />}></Route>
            </Route>
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </Fragment>
  );
};

export default App;
