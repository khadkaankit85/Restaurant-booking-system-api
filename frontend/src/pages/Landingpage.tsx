import React, { CSSProperties, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchRole } from "../utils/Tools";

export const LandingPage: React.FC = () => {
  const [isloading, setIsLoading] = React.useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    async function roleChecker() {
      try {
        const role = await fetchRole();
        if (role >= 1) navigate("/home");
        else {
          setIsLoading(false);
          return;
        }
      } catch (e) {
        console.log(e);
        setIsLoading(false);
      }
    }
    roleChecker();
  });

  if (isloading) return <div></div>;

  return (
    <div style={styles.container}>
      <div style={styles.card as unknown as CSSProperties}>
        <h1 style={styles.heading}>Restaurant Management System</h1>
        <p style={styles.description}>
          Welcome to the ultimate restaurant management experience. Manage
          reservations, orders, and staff seamlessly with our intuitive API
          platform.
        </p>
        <div style={styles.buttonGroup}>
          <Link
            to="/login"
            style={
              {
                ...styles.button,
                ...styles.primaryButton,
              } as unknown as CSSProperties
            }
          >
            Login
          </Link>
          <Link
            to="/signup"
            style={
              {
                ...styles.button,
                ...styles.secondaryButton,
              } as unknown as CSSProperties
            }
          >
            Sign Up
          </Link>
        </div>
      </div>
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
  card: {
    backgroundColor: "#fff",
    padding: "20px 30px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    maxWidth: "500px",
  },
  heading: {
    color: "#333",
    fontSize: "28px",
    marginBottom: "15px",
  },
  description: {
    color: "#555",
    fontSize: "16px",
    marginBottom: "20px",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
  },
  button: {
    padding: "10px 15px",
    fontSize: "16px",
    borderRadius: "4px",
    textDecoration: "none",
    textAlign: "center",
    display: "block",
    width: "100%",
  },
  primaryButton: {
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
  },
  secondaryButton: {
    backgroundColor: "#6c757d",
    color: "#fff",
    border: "none",
  },
};
