import CarouselComponent from "./common/components/CarouselComponent";
import LandingPageInfo from "./common/components/LandingPageInfo";
import useTitle from "./common/hooks/useTitle";

const HomePage = () => {
  useTitle("Farm Diary | Home");
  return (
    <>
      <CarouselComponent />
      <LandingPageInfo />
    </>
  );
};

export default HomePage;
