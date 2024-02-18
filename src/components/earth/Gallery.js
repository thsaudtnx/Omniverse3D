import React, { useEffect } from 'react';
import styles from './gallery.module.css';
import { Html } from "@react-three/drei";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useStore } from '../../hooks/useStore';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Gallery = ({current}) => {

  const [images, getImages] = useStore((state) => [state.images, state.getImages]);

  useEffect(() => {
    getImages(current.id)
    console.log('Load images from database')
  }, [current])

  console.log(images);


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
              spaceBetween={100}
              slidesPerView={2}
              navigation
              pagination={{ clickable: true }}
            >
              {images?.map((image) => (
                <SwiperSlide key={image.id}>
                  <div className={styles.imageContainer}>
                    <img 
                      className={styles.image}
                      src={image.src}
                      alt={image.src}
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