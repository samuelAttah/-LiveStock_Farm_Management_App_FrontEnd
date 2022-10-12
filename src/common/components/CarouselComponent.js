import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import CustomContainer from "./CustomContainer";
const CarouselComponent = () => {
  return (
    <CustomContainer width="xl">
      <div className="carousel-wrapper">
        <Carousel
          infiniteLoop
          useKeyboardArrows
          autoPlay
          showThumbs={false}
          showStatus={false}
        >
          <div>
            <img src="../../Cows.jpg" alt="Nature" height="800px" />
          </div>
          <div>
            <img src="../../Goat.jpg" alt="Science" height="800px" />
          </div>
          <div>
            <img src="../../Piggery.jpg" alt="Technology" height="800px" />
          </div>
          <div>
            <img src="../../Poultry.jpg" alt="Technology" height="800px" />
          </div>
          <div>
            <img src="../../Sheep.jpg" alt="Technology" height="800px" />
          </div>
        </Carousel>
      </div>
    </CustomContainer>
  );
};

export default CarouselComponent;
