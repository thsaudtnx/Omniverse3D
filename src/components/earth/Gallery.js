import React from 'react';
import styles from './gallery.module.css';
import { Html } from "@react-three/drei";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const images = [
  "https://placehold.co/100x100",
  "https://placehold.co/100x100",
  "https://placehold.co/100x100",
  "https://placehold.co/100x100",
  "https://placehold.co/100x100",
  "https://placehold.co/100x100",
  "https://placehold.co/100x100",
  
]

const Gallery = ({current}) => {
  return (
    <Html position={[0, 0, 0]}>
      <div className={styles.container}>
        <div className={styles.header}>
          Welcome to {current?.name}!
        </div>
        <div className={styles.body}>
          <div className={styles.images}>
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={50}
              slidesPerView={2}
              navigation
              pagination={{ clickable: true }}
            >
              {images.map((index, image) => (
                <SwiperSlide>
                  <div className={styles.imageContainer}>
                    <img 
                      className={styles.image}
                      key={index}
                      src="https://placehold.co/150x150"
                      alt={image}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div>{current?.description}</div>
        </div>
      </div>
    </Html>
  );
};

export default Gallery;