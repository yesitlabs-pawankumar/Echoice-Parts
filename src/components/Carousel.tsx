// CustomCarousel.tsx
import { BASE_URL } from "@/constant/constant";
import Image from "next/image";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

interface CustomCarouselProps {
  images: string[];
}
const responsive = {
  desktop: {
    breakpoint: {
      max: 3000,
      min: 1024,
    },
    items: 3,
    partialVisibilityGutter: 40,
  },
  mobile: {
    breakpoint: {
      max: 464,
      min: 0,
    },
    items: 1,
    partialVisibilityGutter: 30,
  },
  tablet: {
    breakpoint: {
      max: 1024,
      min: 464,
    },
    items: 2,
    partialVisibilityGutter: 30,
  },
};

const CustomCarousel: React.FC<CustomCarouselProps> = ({ images }) => {
  const CustomLeftArrow: any = ({ onClick }: { onClick: () => void }) => (
    <div onClick={onClick} className="customArrow leftArrow">
      &lt;
    </div>
  );

  const CustomRightArrow: any = ({ onClick }: { onClick: () => void }) => (
    <div onClick={onClick} className="customArrow rightArrow">
      &gt;
    </div>
  );
  return (
    <Carousel
      responsive={responsive}
      additionalTransfrom={0}
      arrows
      autoPlaySpeed={3000}
      centerMode={false}
      // className=""
      // containerClass="carousel-container"
      draggable
      focusOnSelect={false}
      infinite={false}
      itemClass=""
      keyBoardControl
      minimumTouchDrag={80}
      pauseOnHover
      renderArrowsWhenDisabled={false}
      renderButtonGroupOutside={true}
      renderDotsOutside={true}
      rewind={false}
      rewindWithAnimation={false}
      rtl={false}
      shouldResetAutoplay
      showDots={false}
      slidesToSlide={1}
      swipeable={false}
      sliderClass="slideContainer"
      customLeftArrow={<CustomLeftArrow />}
      customRightArrow={<CustomRightArrow />}
    >
      {Array.isArray(images) &&
        images.map((image: any, index) => (
          <div key={index} className="slideItem">
            <Image
              src={
                image.image_name
                  ? `${BASE_URL}${image.image_name}`
                  : "/images/banners/slide1.png"
              }
              className="image-list w-100 "
              alt={`Image ${index + 1}`}
            />
          </div>
        ))}
    </Carousel>
  );
};

export default CustomCarousel;
