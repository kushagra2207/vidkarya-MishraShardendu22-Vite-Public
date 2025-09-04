import React, { useEffect, useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { HOME_ASSET } from '../../Assets/assetImages';
import './TestimonialCards.css';

const Cards = [
  {
    id: 1,
    author: 'Divyansh Mishra',
    content:
      ' I will thank to those who made it as it is very useful for the preparation. But as everything needs improvement this also need and by improving I mean continues efforts should be made to ensure its relevance.',
    image: HOME_ASSET.corporateUser,
  },
  {
    id: 2,
    author: 'Madhur Singh',
    content:
      'I would like to thank those who developed such a good website which represents our institute.',
    image: HOME_ASSET.corporateUser,
  },
  {
    id: 3,
    author: 'Divyanshu',
    content:
      'I have used it and first of all I would like to thank those who made it possible and I think the websites should be more engaging with lots of activities and contest.',
    image: HOME_ASSET.corporateUser,
  },
];

function TestimonialCards() {
  const variants = {
    initial: (direction) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    },
    exit: (direction) => {
      return {
        x: direction > 0 ? -1000 : 1000,
        opacity: 0,
        transition: {
          x: { type: 'spring', stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 },
        },
      };
    },
  };

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextStep = useCallback(() => {
    setDirection(1);
    if (index === Cards.length - 1) {
      setIndex(0);
      return;
    }
    setIndex(index + 1);
  }, [index]);

  function _prevStep() {
    setDirection(-1);
    if (index === 0) {
      setIndex(Cards.length - 1);
      return;
    }
    setIndex(index - 1);
  }

  useEffect(() => {
    const timer = setTimeout(nextStep, 5000); // Change slide after 5 seconds

    // Clean up the timer on component unmount
    return () => {
      clearTimeout(timer);
    };
  }, [index, nextStep]);
  return (
    <AnimatePresence initial={false} custom={direction}>
      <motion.div
        variants={variants}
        animate="animate"
        initial="initial"
        exit="exit"
        className="Carousel w-full"
        key={Cards[index].id}
        custom={direction}
        transition={{ delay: 1 }} // Add a delay of 1 second
      >
        <motion.div className="testimonial-wrapper">
          <div className="testimonial-content">
            <div>{Cards[index].content}</div>
            <div className="testimonial-author">{Cards[index].author}</div>
          </div>
          <div className="testimonial-image">
            <img src={Cards[index].image} alt="Testimonial Image" />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default TestimonialCards;
