import axios from "axios";

export function calculateRole(role: "admin" | "user") {
  return role == "admin" ? 2 : role == "user" ? 1 : 0;
}

export async function loginWithCookie() {
  //@ts-ignore
  const res = await axios.post("/user/loginwithcookie", {
    withCredentials: true,
  });
}
