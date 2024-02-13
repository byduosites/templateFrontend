import Data from "@data/sliders/partners.json";
import { sliderProps } from "@/src/common/sliderProps";
import { Swiper, SwiperSlide } from "swiper/react";

const PartnersSlider = () => {
  return (
    <div className="mil-p-60-60">
        <Swiper
            {...sliderProps.milInfinitySlider}
            className="swiper-container mil-infinite-show"
        >
            {Data.items.map((item, key) => (
            <SwiperSlide className="swiper-slide" key={`partners-item-${key}`}>
                <a href={item.link} className="mil-partner-frame mil-hidden-trigger">
                    <img 
                        src={item.image} 
                        alt={item.alt}
                        className="mil-grayscale mil-opacity" 
                    />
                </a>
            </SwiperSlide>
            ))}
        </Swiper>
    </div>
  );
};

export default PartnersSlider;