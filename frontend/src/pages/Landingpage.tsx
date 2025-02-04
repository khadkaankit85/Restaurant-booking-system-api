import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchRole } from "../utils/Tools";
import "./mycss.css";
import Navigation from "./Navigation";
//@ts-expect-error there is no types available for react-animated-slider library
import Slider from "react-animated-slider";
import Menue from "./Menue";

import "react-animated-slider/build/horizontal.css";

export const LandingPage: React.FC = () => {
  const [isloading, setIsLoading] = React.useState(true);
  const navigate = useNavigate();

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
      img: "/image/breakfast.webp",
    },
    {
      title: "Lunch",
      description: "View Menu",
      img: "/image/lunch.jpg",
    },
    {
      title: "Dinner",
      description: "View Menu",
      img: "/image/dinner.jpg",
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
        <Slider autoplay={1000}>
          {slides.map((slide, index) => (
            <div key={index} className="slider-content">
              <img
                src={slide.img}
                className="slider-image"
                alt={`slide-${index}`}
              />
            </div>
          ))}
        </Slider>

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
