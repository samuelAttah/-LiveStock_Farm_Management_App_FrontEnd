import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const CarouselComponent = () => {
  return (
    <div className="carousel-wrapper" style={{ padding: 25 }}>
      <Carousel
        infiniteLoop
        useKeyboardArrows
        autoPlay
        showThumbs={false}
        showStatus={false}
      >
        <div>
          <img src="../../Cows.jpg" alt="Nature" />
        </div>
        <div>
          <img src="../../Goat.jpg" alt="Science" />
        </div>
        <div>
          <img src="../../Piggery.jpg" alt="Technology" />
        </div>
        <div>
          <img src="../../Poultry.jpg" alt="Technology" />
        </div>
        <div>
          <img src="../../Sheep.jpg" alt="Technology" />
        </div>
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
