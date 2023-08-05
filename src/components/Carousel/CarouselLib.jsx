import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import React from "react";
import CityWeekly from "../CityWeekly/CityWeekly";

const CarouselLib = ({ carouselItems, isDarkMode, isFarenheight }) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 6000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 747 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 747, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="CarouselLibContainer">
      <Carousel
        swipeable={true}
        draggable={true}
        showDots={true}
        responsive={responsive}
        infinite={true}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={1}
        containerClass="carousel-container"
        removeArrowOnDeviceType={[""]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {(carouselItems ? carouselItems : [])?.map((forecast) => (
          <div className="containerItem">
            <CityWeekly
              key={forecast?.Date}
              data={forecast}
              isFarenheight={isFarenheight}
              isDarkMode={isDarkMode}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};
export default CarouselLib;
