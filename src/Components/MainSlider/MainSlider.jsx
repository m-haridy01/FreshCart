import React from "react";
import Slider from "react-slick";
import slider1 from "../../assets/images/ima/shopping1.jpg";
import slider2 from "../../assets/images/ima/shopping2.webp";
import slider3 from "../../assets/images/ima/shopping.avif";
import slider4 from "../../assets/images/ima/shopping4.webp";
import slider5 from "../../assets/images/ima/shopping5.jpg";

export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    loop: true,
  };
  return (
    <div className="grid grid-cols-[1fr, 1fr] lg:grid-cols-[2fr_1fr] container items-center justify-center my-10 mt-[20vh]">
      <Slider {...settings} className=" overflow-hidden ">
        <div>
          <img
            src={slider1}
            className="w-full h-[300px] md:h-[600px]  object-cover block "
            alt=""
          />
        </div>
        <div>
          <img
            src={slider2}
            className="w-full h-[300px] md:h-[600px]  object-cover block "
            alt=""
          />
        </div>
        <div>
          <img
            src={slider5}
            className="w-full h-[300px] md:h-[600px]  object-cover block "
            alt=""
          />
        </div>
      </Slider>

      <div className="flex lg:flex-col items-center justify-center -mt-1.5 -ml-1.5 ">
        <img
          src={slider4}
          className="lg:w-100 w-[50%] h-[150px] md:h-[300px] block object-cover "
          alt=""
        />
        <img
          src={slider3}
          className="lg:w-100 w-[50%] h-[150px] md:h-[300px] block object-cover "
          alt=""
        />
      </div>
    </div>
  );
}
