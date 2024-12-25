import React, { useEffect, useState } from "react";
interface ProtectedProp {
  children: React.ReactNode;
  role: "user" | "admin";
}

export const Protected = ({ children }: ProtectedProp) => {
  const [role, setRole] = useState<"user" | "admin">();

  useEffect(() => {
    const response = axios.get("");
  });

  if (!role) return <h1>Loading...</h1>;

  return <>{children}</>;
};
