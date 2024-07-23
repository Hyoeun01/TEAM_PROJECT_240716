import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Header = () => {
  return (
    <header className="header">
      <Carousel showThumbs={false} autoPlay interval={3000} infiniteLoop>
        <div>
          <img src="https://via.placeholder.com/800x300" alt="공지사항1" />
        </div>
        <div>
          <img src="https://via.placeholder.com/800x300" alt="공지사항2" />
        </div>
        <div>
          <img src="https://via.placeholder.com/800x300" alt="공지사항3" />
        </div>
      </Carousel>
    </header>
  );
};

export default Header;
