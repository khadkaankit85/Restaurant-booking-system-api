import React, {  useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchRole } from "../utils/Tools";
import  "./mycss.css"
export const LandingPage: React.FC = () => {

  const navigate = useNavigate();
  
  useEffect(() => {
    async function roleChecker() {
      try {
        const role = await fetchRole();
        if (role >= 1) navigate("/home");
        else {
          return;
        }
      } catch (e) {
        console.log(e);
        console.log("not logged in");
      }
    }
    roleChecker();
  });

  return (
  <div className="landingpagediv">This is the landing page </div>
  );
};

