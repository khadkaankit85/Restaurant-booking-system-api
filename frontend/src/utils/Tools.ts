import axios from "axios";
import { UserInformationInterface } from "../states/Contexts";

export function calculateRole(role: "admin" | "user") {
  return role == "admin" ? 2 : role == "user" ? 1 : 0;
}

export async function fetchRole(): Promise<0 | 1 | 2> {
  const res = await axios.post<{
    accessToken: string;
    userinfo: UserInformationInterface;
  }>("user/loginwithcookie", {
    withCredentials: true,
  });
  if (res.status != 200) {
    throw new Error("cannot fetch role");
  } else {
    const role = res.data.userinfo.role;
    return role == "user" ? 1 : role == "admin" ? 2 : 0;
  }
}
export async function loginWithCookie() {
  //@ts-ignore
  const res = await axios.post("user/loginwithcookie", {
    withCredentials: true,
  });
}
