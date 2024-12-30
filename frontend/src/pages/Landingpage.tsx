import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchRole } from "../utils/Tools";
import "./mycss.css";
import Navigation from "./Navigation";
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css"; 

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    async function roleChecker() {
      try {
        const role = await fetchRole();
        if (role >= 1) navigate("/home");
      } catch (e) {
        console.log(e);
        console.log("not logged in");
      }
    }
    roleChecker();
  }, []); 

  const slides = [
    {
      title: "First Item",
      description: "This is the first slide",
      img: "/image/image1 (4).jpeg"
    },
    {
      title: "Second Item",
      description: "This is the second slide",
      img: "/image/image1 (2).jpeg"
    },
    {
      title: "Third Item",
      description: "This is the third slide",
      img: "/image/image1 (3).jpeg"
    }
  ];

  return (
    <>
      <Navigation />
      <Slider autoplay={1000}>
        {slides.map((slide, index) => (
          <div key={index} className="slider-content">
            <h2>{slide.title}</h2>
            <p>{slide.description}</p>
            <img src={slide.img} alt={slide.title} className="slider-image" />
          </div>
        ))}
      </Slider>
    </>
  );
};
