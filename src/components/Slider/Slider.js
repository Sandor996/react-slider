import React from 'react';

import { useRef, useEffect } from 'react';

import classes from './Slider.module.css';

const Slider = ({ images }) => {
  const containerRef = useRef();
  const sliderRef = useRef();
  let slidesRef = useRef();
  let sliderWidth;
  let imageWidth;
  let current = 0;
  let target = 0;
  let ease = 0.01;

  // linear extrapolation function
  const lerp = (start, end, t) => {
    return start * (1 - t) + end * t;
  };

  // function which sets transform prop to element
  const setTransform = (el, transform) => {
    el.style.transform = transform;
  };

  // slider initialization function
  const init = () => {
    sliderWidth = sliderRef.current.getBoundingClientRect().width;
    imageWidth = sliderWidth / images.length;
    containerRef.current.style.height = `${
      sliderWidth - (window.innerWidth - window.innerHeight)
    }px`;
  };

  // slider animation function
  const animate = () => {
    current = parseFloat(lerp(current, target, ease)).toFixed(2);
    target = window.scrollY;
    setTransform(sliderRef.current, `translateX(-${current}px)`);
    animateSlides();
    requestAnimationFrame(animate);
  };

  // slides animation function
  const animateSlides = () => {
    let ratio = current / imageWidth;
    let intersectionRatioValue;
    [...slidesRef.current.children].forEach((slide, idx) => {
      let image = slide.children[0];
      intersectionRatioValue = ratio - idx * 0.7;
      setTransform(image, `translateX(${intersectionRatioValue * 70}px)`);
    });
  };

  // slides content
  const slides = images.map((el, index) => {
    return (
      <div className={classes.slide} key={index}>
        <div
          className={classes.img}
          style={{
            backgroundImage: `url('${el}')`
          }}
        ></div>
      </div>
    );
  });

  useEffect(() => {
    init();
    animate();
  });

  return (
    <div className={classes.container} ref={containerRef}>
      <div className={classes.slider} ref={sliderRef}>
        <div className={classes.slides} ref={slidesRef}>
          {slides}
        </div>
      </div>
    </div>
  );
};

export default Slider;
