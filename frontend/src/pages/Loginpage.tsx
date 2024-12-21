import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

const schema = yup
  .object({
    username: yup.string().min(5).max(15).required("Username is required"),
    password: yup.string().min(4).required("Password is required"),
  })
  .required();

interface LoginFormData {
  username: string;
  password: string;
}

export const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      //@ts-ignore
      const response = await axios.post("/user/login", data);
      alert("Logged in successfully!");
    } catch (error: any) {
      alert("Error: " + (error.response?.data?.errors || error.message));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Login</h1>
      <input {...register("username")} placeholder="Username" />
      <p>{errors.username?.message}</p>

      <input {...register("password")} type="password" placeholder="Password" />
      <p>{errors.password?.message}</p>

      <button type="submit">Login</button>
    </form>
  );
};
