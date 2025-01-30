import React, { CSSProperties } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { Link } from "react-router-dom";

// Define the schema for validation
const schema = yup
  .object({
    username: yup.string().min(5).max(15).required("Username is required"),
    password: yup.string().min(4).required("Password is required"),
    email: yup.string().email().required("Email is required"),
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
      const response = await axios.post("user/signup", data);
      if (response.status === 201) {
        alert("Registered successfully! please proceed to login");
      } else if (response.status === 409) {
        alert("User already exists");
      } else if (response.status === 422) {
        alert("Data validation error occurred");
      }
    } catch (error: any) {
      alert("Error: " + (error.response?.data?.errors || error.message));
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
        <h1 style={styles.heading as unknown as CSSProperties}>Sign Up</h1>

        <div style={styles.inputGroup}>
          <input
            {...register("username")}
            placeholder="Username"
            style={styles.input}
          />
          <p style={styles.error}>{errors.username?.message}</p>
        </div>

        <div style={styles.inputGroup}>
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            style={styles.input}
          />
          <p style={styles.error}>{errors.password?.message}</p>
        </div>

        <div style={styles.inputGroup}>
          <input
            {...register("email")}
            type="email"
            placeholder="Email"
            style={styles.input}
          />
          <p style={styles.error}>{errors.email?.message}</p>
        </div>

        <button type="submit" style={styles.button}>
          Register
        </button>
        <Link to="/login">Already have an account? login from here</Link>
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
