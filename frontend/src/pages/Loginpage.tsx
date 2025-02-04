import React, { CSSProperties, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  UserInfoContext,
  UserInformationInterface as UserInformation,
} from "../states/Contexts.tsx";
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
interface LoginApiResponse {
  userinfo: UserInformation;
}

export const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const userInformationConsumed = useContext(UserInfoContext);

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await axios.post<LoginApiResponse>("user/login", data);
      if (response.status === 200) {
        const fetchedInfo = response.data.userinfo as UserInformation;
        if (userInformationConsumed === undefined) {
          console.error("user information context is undefined");
          return;
        }
        userInformationConsumed.setUserInformation(fetchedInfo);
        navigate("/home");
      } else if (response.status === 401) {
        alert("Incorrect credentials");
      } else {
        alert("Internal server error occurred");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
        <h1 style={styles.heading as unknown as CSSProperties}>Login</h1>
        <div style={styles.inputGroup}>
          <input
            {...register("username")}
            placeholder="Username"
            style={styles.input}
            name="username"
          />
          <p style={styles.error}>{errors.username?.message}</p>
        </div>

        <div style={styles.inputGroup}>
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            style={styles.input}
            name="password"
          />
          <p style={styles.error}>{errors.password?.message}</p>
        </div>

        <button type="submit" style={styles.button}>
          Login
        </button>
        <Link to="/signup">Don't have an account? Sign up here.</Link>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
  },
  form: {
    backgroundColor: "#fff",
    padding: "20px 30px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
    fontSize: "24px",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  error: {
    color: "red",
    fontSize: "12px",
    marginTop: "5px",
  },
  button: {
    width: "100%",
    padding: "10px 15px",
    fontSize: "16px",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#007BFF",
    color: "#fff",
    cursor: "pointer",
  },
};
