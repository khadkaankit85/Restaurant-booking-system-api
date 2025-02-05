import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchRole } from "../utils/Tools";
import "./mycss.css";
import Navigation from "./Navigation";
import Menue from "./Menue";

export const LandingPage: React.FC = () => {
  const [isloading, setIsLoading] = React.useState(true);
  const navigate = useNavigate();
  const autoplay = 3000;

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, autoplay);

    return () => clearInterval(interval);
  });

  useEffect(() => {
    async function roleChecker() {
      try {
        const role = await fetchRole();
        if (role >= 1) navigate("/home");
      } catch (e) {
        console.log(e);
        setIsLoading(false);
      }
    }
    roleChecker();
  });

  const slides = [
    {
      img: "image1.jpg",
    },
    {
      img: "image2.jpg",
    },
    {
      img: "image3.jpg",
    },
  ];

  const menue = [
    {
      title: "Breakfast",
      description: "View Menu",
      img: "breakfast.webp",
    },
    {
      title: "Lunch",
      description: "View Menu",
      img: "lunch.jpg",
    },
    {
      title: "Dinner",
      description: "View Menu",
      img: "dinner.jpg",
    },
  ];

  if (isloading) return <div></div>;

  return (
    <>
      <div className="home bg-background text-white">
        <Navigation />
        <h1 className="text-white-800 font-bold text-3xl text-center tracking-widen hover mt-20">
          Enjoy a meal with HamroResturant
        </h1>
        <div className="slider">
          <div
            className="slider-track"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div key={index} className="slider-content">
                <img
                  src={slide.img}
                  className="slider-image"
                  alt={`slide-${index}`}
                />
              </div>
            ))}
          </div>
        </div>{" "}
        <div className="big-container">
          <div className="offerPart flex text-white-600 font-bold flex-col flex-wrap gap-y-5 gap-x-5 text-center">
            <h1 className="detail">We Offer Top Notch</h1>
            <p className="explain">
              We are a five-star rated restaurant serving delicious food for the
              past 5 years. You can enjoy all the best food in one place.
            </p>
          </div>
        </div>
        <div className="menu-container">
          {menue.map((item, index) => (
            <div key={index} className="menu-item">
              <img src={item.img} alt={item.title} />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
        <hr />
        <Menue />
        <div className="footer">
          <p>© 2021 HamroResturant</p>
        </div>
      </div>
    </>
  );
};
