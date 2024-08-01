import React, { useEffect } from 'react';
import Carousel1 from '../../assets/images/Carousel1.png';
import Carousel2 from '../../assets/images/Carousel2.png';
import Carousel3 from '../../assets/images/Carousel3.png';
import Carousel4 from '../../assets/images/Carousel4.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './Header.css';
import { Carousel } from 'bootstrap';

const Header = () => {
  useEffect(() => {
    const carousels = [
      new Carousel(document.querySelector('#carouselExampleIndicators1')),
      new Carousel(document.querySelector('#carouselExampleIndicators2')),
      new Carousel(document.querySelector('#carouselExampleIndicators3')),
    ];

    carousels.forEach(carousel => {
      carousel._element.addEventListener('slide.bs.carousel', (event) => {
        carousels.forEach(syncCarousel => {
          if (syncCarousel !== carousel) {
            if (event.direction === 'left') {
              syncCarousel.next();
            } else {
              syncCarousel.prev();
            }
          }
        });
      });
    });
  }, []);

  return (
    <header className="header">
      <div className="carousel-container">
        <div id="carouselExampleIndicators1" className="carousel slide half-carousel" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={Carousel1} className="d-block w-100" alt="Slide 1" />
            </div>
            <div className="carousel-item">
              <img src={Carousel2} className="d-block w-100" alt="Slide 2" />
            </div>
            <div className="carousel-item">
              <img src={Carousel3} className="d-block w-100" alt="Slide 3" />
            </div>
            <div className="carousel-item">
              <img src={Carousel4} className="d-block w-100" alt="Slide 4" />
            </div>
          </div>
        </div>
        <div id="carouselExampleIndicators2" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators2" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators2" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators2" data-bs-slide-to="2" aria-label="Slide 3"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators2" data-bs-slide-to="3" aria-label="Slide 4"></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={Carousel2} className="d-block w-100" alt="Slide 2" />
            </div>
            <div className="carousel-item">
              <img src={Carousel3} className="d-block w-100" alt="Slide 3" />
            </div>
            <div className="carousel-item">
              <img src={Carousel4} className="d-block w-100" alt="Slide 4" />
            </div>
            <div className="carousel-item">
              <img src={Carousel1} className="d-block w-100" alt="Slide 1" />
            </div>
          </div>
        </div>
        <div id="carouselExampleIndicators3" className="carousel slide half-carousel" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={Carousel3} className="d-block w-100" alt="Slide 3" />
            </div>
            <div className="carousel-item">
              <img src={Carousel4} className="d-block w-100" alt="Slide 4" />
            </div>
            <div className="carousel-item">
              <img src={Carousel1} className="d-block w-100" alt="Slide 1" />
            </div>
            <div className="carousel-item">
              <img src={Carousel2} className="d-block w-100" alt="Slide 2" />
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators1, #carouselExampleIndicators2, #carouselExampleIndicators3" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators1, #carouselExampleIndicators2, #carouselExampleIndicators3" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
