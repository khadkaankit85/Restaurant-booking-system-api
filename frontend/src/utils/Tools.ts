export function calculateRole(role: "admin" | "user") {
  return role == "admin" ? 2 : role == "user" ? 1 : 0;
}
