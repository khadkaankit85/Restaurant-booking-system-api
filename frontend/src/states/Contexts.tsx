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
export interface AccessTokenContext {
  accessToken: string | null;
  setAccessToken: (accessToken: string | null) => void;
}

export const UserInfoContext = createContext<UserInfoContext | undefined>(
  undefined,
);

export const AccessTokenContext = createContext<AccessTokenContext | undefined>(
  undefined,
);

export const UserInfoContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userInformation, setUserInformation] =
    useState<UserInformationInterface | null>(null);

  const [accessToken, setAccessToken] = useState<string | null>(null);

  return (
    <AccessTokenContext.Provider value={{ accessToken, setAccessToken }}>
      <UserInfoContext.Provider value={{ userInformation, setUserInformation }}>
        {children}
      </UserInfoContext.Provider>
    </AccessTokenContext.Provider>
  );
};
