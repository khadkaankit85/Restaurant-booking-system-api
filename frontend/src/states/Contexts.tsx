import { createContext, useState } from "react";

export interface UserInformationInterface {
  username: string;
  role: "user" | "admin";
  email: string;
}

export interface UserInfoContext {
  userInformation: UserInformationInterface | null;
  setUserInformation: (userinfo: UserInformationInterface | null) => void;
}
export const UserInfoContext = createContext<UserInfoContext | undefined>(
  undefined,
);

export const UserInfoContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userInformation, setUserInformation] =
    useState<UserInformationInterface | null>(null);

  return (
    <UserInfoContext.Provider value={{ userInformation, setUserInformation }}>
      {children}
    </UserInfoContext.Provider>
  );
};
