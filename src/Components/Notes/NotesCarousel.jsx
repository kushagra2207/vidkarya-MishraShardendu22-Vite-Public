import React, { useState, useEffect } from 'react';
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from './../../lib/icons';
import { NOTES_ASSET } from '../../Assets/assetImages';
// import carouselImage from './../../Assets/Images/Notes/notes-carousel.svg'
import './notes.css';
const NotesCarousel = ({ data }) => {
  const [slide, setSlide] = useState(0);
  const delay = 6000;

  useEffect(() => {
    setTimeout(
      () => setSlide((prevIndex) => (prevIndex === data.length - 1 ? 0 : prevIndex + 1)),
      delay
    );

    return () => {};
  }, [slide, data.length]);

  const nextSlide = () => {
    setSlide((prevIndex) => (prevIndex === data.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setSlide((prevIndex) => (prevIndex === data.length - 1 ? 0 : prevIndex - 1));
  };
  return (
    <>
      <div className="notes-carousel-section">
        <IoIosArrowDropleftCircle onClick={prevSlide} className="arrow arrow-left" />
        <div className="notes-carousel">
          <div
            className="carousel-slideshowSlider"
            style={{ transform: `translate3d(${-slide * 100}%, 0, 0)` }}
          >
            {data.map((item, idx) => {
              return (
                <div className="carousel" key={idx}>
                  <div className="notes-carousel-data">
                    <div className="notes-carousel-text-data">
                      <h1 className="notes-carasole-heading">{item.heading}</h1>
                      <div className="notes-carasole-paragraph">{item.para}</div>
                    </div>
                    <div className="carousel-img">
                      <img src={NOTES_ASSET.carousel} alt={item.alt} key={idx} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <span className="indicators">
            {data.map((_, idx) => {
              return (
                <button
                  key={idx}
                  className={slide === idx ? 'indicator' : 'indicator indicator-inactive'}
                  onClick={() => setSlide(idx)}
                ></button>
              );
            })}
          </span>
        </div>
        <IoIosArrowDroprightCircle onClick={nextSlide} className="arrow arrow-right" />
      </div>
    </>
  );
};

export default NotesCarousel;
