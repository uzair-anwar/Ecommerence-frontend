import React from "react";
import SwiperCore, {
  Keyboard,
  Scrollbar,
  Pagination,
  Navigation,
} from "swiper/core";
import { CardMedia } from "@material-ui/core";
import { Swiper, SwiperSlide } from "swiper/react";
import { makeStyles } from "@material-ui/core/styles";

import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/scrollbar/scrollbar.min.css";
const useStyles = makeStyles({
  media: {
    height: "50%",
    paddingTop: "100%",
  },
  swiperContainer: {
    paddingBottom: "3rem",
    "& .swiper-pagination-bullet": {
      background: "blue",
    },
    "& .swiper-button-next:after": {
      fontSize: "2rem !important",
    },
    "& .swiper-button-prev:after": {
      fontSize: "2rem !important",
    },
  },
});

SwiperCore.use([Keyboard, Scrollbar, Pagination, Navigation]);

const ImageSwiper = ({ images }) => {
  const { media, swiperContainer } = useStyles();

  return (
    <Swiper
      grabCursor
      keyboard={{ enabled: true }}
      pagination={{ clickable: true }}
      navigation
      loop
      className={swiperContainer}
    >
      {images?.map((element, index) => (
        <SwiperSlide key={index}>
          <CardMedia className={media} image={element} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageSwiper;
