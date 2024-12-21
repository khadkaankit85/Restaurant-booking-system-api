import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

// Define the schema for validation
const schema = yup
  .object({
    username: yup.string().min(5).max(15).required("Username is required"),
    password: yup.string().min(4).required("Password is required"),
    email: yup.string().email().required("Email is required"),
    phone: yup
      .string()
      .optional()
      .length(10, "Phone must be exactly 10 digits"),
  })
  .required();

// Define the form's data structure
interface SignUpFormData {
  username: string;
  password: string;
  email: string;
  phone?: string;
}

export const SignUpPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      //@ts-ignore
      const response = await axios.post("/user/signup", data);
      alert("User registered successfully!");
    } catch (error: any) {
      alert("Error: " + (error.response?.data?.errors || error.message));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Sign Up</h1>
      <input {...register("username")} placeholder="Username" />
      <p>{errors.username?.message}</p>

      <input {...register("password")} type="password" placeholder="Password" />
      <p>{errors.password?.message}</p>

      <input {...register("email")} type="email" placeholder="Email" />
      <p>{errors.email?.message}</p>

      <input {...register("phone")} placeholder="Phone (optional)" />
      <p>{errors.phone?.message}</p>

      <button type="submit">Register</button>
    </form>
  );
};
