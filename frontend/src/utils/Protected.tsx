import React, { useContext, useEffect } from "react";
import { UserInfoContext } from "../states/Contexts";
import { useNavigate } from "react-router-dom";
import axios from "axios";
interface ProtectedProp {
  children: React.ReactNode;
  role: "user" | "admin";
}

export const Protected = ({ children, role }: ProtectedProp) => {
  //roles are 0 for not logged in , 1 for user and 2 for the admin
  const userInfoContextConsumed = useContext(UserInfoContext);
  const userInformation = userInfoContextConsumed?.userInformation;
  const naviation = useNavigate();
  console.log(role);
  //  const requiredRole = role == "user" ? 1 : role == "admin" ? 2 : 0;

  useEffect(() => {
    async function handleProtected() {
      if (!userInformation || !userInformation.role) {
        naviation("/login");
        return;
      }

      const res = await axios.get(
        `/user/userinfo?username=${userInformation.username}`,
      );
      console.log(res.data);
    }
    handleProtected();
  });

  if (!userInformation || !userInformation.role) return <h1>Loading...</h1>;

  return <>{children}</>;
};
