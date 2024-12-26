import React, { useContext, useEffect } from "react";
import {
  AccessTokenContext,
  UserInfoContext,
  UserInformationInterface,
} from "../states/Contexts";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface ProtectedProp {
  children: React.ReactNode;
  role: "user" | "admin";
}

//@ts-ignore
interface UserDataCheckAPIResponse {
  foundUser: {
    id: number;
    username: string;
    email: string;
    phone?: string;
    role: "user" | "admin";
  };
}

export const Protected = ({ children, role }: ProtectedProp) => {
  //roles are 0 for not logged in , 1 for user and 2 for the admin
  const userInfoContextConsumed = useContext(UserInfoContext);
  const userInformation = userInfoContextConsumed?.userInformation;

  const accessTokenContextConsumed = useContext(AccessTokenContext);

  const naviation = useNavigate();
  const requiredRole = role == "user" ? 1 : role == "admin" ? 2 : 0;
  const [currentRole, setCurrentRole] = React.useState(0);

  useEffect(() => {
    async function handleProtected() {
      if (
        !userInformation ||
        !userInformation.role ||
        !accessTokenContextConsumed?.accessToken
      ) {
        //if there is not userinfromation, then that possibly means user need to login but we still are gonna check if the user has some token for persistent login
        const res = await axios.post<{
          accessToken: string;
          userinfo: UserInformationInterface;
        }>("/user/loginwithcookie", {
          withCredentials: true,
        });
        if (res.status != 200) {
          return naviation("/login");
        } else {
          accessTokenContextConsumed?.setAccessToken(res.data.accessToken);
          userInfoContextConsumed?.setUserInformation(res.data.userinfo);
          const role = res.data.userinfo.role;
          if (role == "user" || role == "admin")
            setCurrentRole(role == "user" ? 1 : role == "admin" ? 2 : 0);
          else naviation("/login");
        }
        return;
      }

      const res = await axios.post("/user/userinfo", {
        username: userInformation.username,
      });

      console.log(res.data);
    }
    handleProtected();
  });

  if (!userInformation || !userInformation.role) return <h1>Loading...</h1>;
  if (requiredRole > currentRole) return <h1>Access Denied</h1>;
  return <>{children}</>;
};
