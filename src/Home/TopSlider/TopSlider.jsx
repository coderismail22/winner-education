import { Swiper, SwiperSlide } from "swiper/react";
// import { EffectCoverflow, Pagination } from 'swiper';
import { EffectCoverflow, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import "./styles.css";

const TopSlider = () => {
  return (
    <div>
      <div>
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img src="https://i.ibb.co/7vmpf1r/carousel-1.jpg" alt="Image 1" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://i.ibb.co/60j1sZ6/carousel-2.jpg" alt="Image 2" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://i.ibb.co/s2HP8wQ/carousel-3.jpg" alt="Image 3" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://i.ibb.co/Q628Ftj/carousel-4.jpg" alt="Image 4" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://i.ibb.co/7GG56Xn/carousel-5.jpg" alt="Image 5" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://i.ibb.co/wdkCBtN/carousel-6.jpg" alt="Image 6" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default TopSlider;
