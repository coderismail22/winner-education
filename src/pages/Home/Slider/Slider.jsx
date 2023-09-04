import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
const Slider = () => {
  return (
    <div className="flex  justify-center">
      <Carousel>
        <div>
          <img src="https://i.ibb.co/7vmpf1r/carousel-1.jpg" />
        </div>
        <div>
          <img src="https://i.ibb.co/60j1sZ6/carousel-2.jpg" />
        </div>
        <div>
          <img src="https://i.ibb.co/s2HP8wQ/carousel-3.jpg" />
        </div>
        <div>
          <img src="https://i.ibb.co/Q628Ftj/carousel-4.jpg" />
        </div>
        <div>
          <img src="https://i.ibb.co/7GG56Xn/carousel-5.jpg" />
        </div>
        <div>
          <img src="https://i.ibb.co/wdkCBtN/carousel-6.jpg" />
        </div>
      </Carousel>
    </div>
  );
};

export default Slider;
