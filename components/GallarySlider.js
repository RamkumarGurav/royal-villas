import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import "swiper/css";
import { useQuery } from "react-query";
import "bootstrap/dist/css/bootstrap.min.css";

const GallarySlider = () => {
  SwiperCore.use([Autoplay]);
  return (
    <div id="sliderX" className=" relative">
      <div id="gallarySlider">
        <div className="gallarySlider-item gallarySlider-item-1">
          <div className="gallarySlider-text-container">
            <h2 className="v-title">Gallery</h2>
          </div>
        </div>
        <div className="gallarySlider-item gallarySlider-item-2 relative h-full w-full overflow-hidden">
          <Carousel>
            <Carousel.Item>
              <div className="gallarySlider-card gallarySlider-card-1 w-full h-full">
                <Image
                  src={"/images/Gallery/gallery-1.jpg"}
                  alt="galary image"
                  height={800}
                  width={800}
                />
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="gallarySlider-card gallarySlider-card-2">
                <Image
                  src={"/images/Gallery/gallery-3.jpg"}
                  alt="galary image"
                  height={800}
                  width={800}
                />
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="gallarySlider-card gallarySlider-card-4">
                <Image
                  src={"/images/Gallery/gallery-4.jpg"}
                  alt="galary image"
                  height={800}
                  width={800}
                />
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="gallarySlider-card gallarySlider-card-5">
                <Image
                  src={"/images/Gallery/gallery-5.jpg"}
                  alt="galary image"
                  height={800}
                  width={800}
                />
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="gallarySlider-card gallarySlider-card-7">
                <Image
                  src={"/images/Gallery/gallery-6.jpg"}
                  alt="galary image"
                  height={800}
                  width={800}
                />
              </div>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>

      <div className=""></div>
    </div>
  );
};

export default GallarySlider;
