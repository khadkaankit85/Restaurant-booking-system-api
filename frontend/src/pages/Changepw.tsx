import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

const schema = yup
  .object({
    username: yup.string().min(5).max(15).required("Username is required"),
    oldpassword: yup.string().min(4).required("Old Password is required"),
    newpassword: yup.string().min(4).required("New Password is required"),
  })
  .required();

interface ChangePasswordFormData {
  username: string;
  oldpassword: string;
  newpassword: string;
}

export const ChangePasswordPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: ChangePasswordFormData) => {
    try {
      //@ts-ignore
      const response = await axios.put("/user/change-password", data);
      alert("Password updated successfully!");
    } catch (error: any) {
      alert("Error: " + (error.response?.data?.errors || error.message));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Change Password</h1>
      <input {...register("username")} placeholder="Username" />
      <p>{errors.username?.message}</p>

      <input
        {...register("oldpassword")}
        type="password"
        placeholder="Old Password"
      />
      <p>{errors.oldpassword?.message}</p>

      <input
        {...register("newpassword")}
        type="password"
        placeholder="New Password"
      />
      <p>{errors.newpassword?.message}</p>

      <button type="submit">Update Password</button>
    </form>
  );
};
