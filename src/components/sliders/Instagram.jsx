import Data from "@data/sliders/instagram.json";
import { sliderProps } from "@/src/common/sliderProps";
import { Swiper, SwiperSlide } from "swiper/react";

const InstagramSlider = () => {
  return (
    <div className="mil-instagram-frame mil-appearance">
          <Swiper
            {...sliderProps.milInstagramSlider}
            className="swiper-container mil-instagram-slider"
          >
            {Data.images.map((item, key) => (
            <SwiperSlide className="swiper-slide mil-instagram-item" key={`instagram-item-${key}`}>
                <img 
                src={item} 
                alt="instagram"
                />
            </SwiperSlide>
            ))}
          </Swiper>

          <div className="mil-button-positions mil-appearance">
              <a href={Data.button.link} target="_blank" className="mil-button mil-button-lg mil-button-rounded mil-button-light mil-scale-down-trigger"><span><i className="fab fa-instagram"></i> {Data.button.label}</span></a>
          </div>

      </div>
  );
};

export default InstagramSlider;