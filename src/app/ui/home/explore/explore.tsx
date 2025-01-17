import { motion, useInView, type Variants } from 'framer-motion';
import React, { useRef } from 'react';

import './explore.scss';
import { roboto_slab } from '@/app/fonts/fonts';
import StaggeringTextAnimation from '../../global/animated.text/staggering.text.animation';
import CircleCursor from './circle.cursor/circle.cursor';
import ContactButton from './contact.button/contact.button';

const popInVariants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
    },
  },
};
const myselfVariation: Variants = {
  hidden: {
    opacity: 0,
    scale: 0,
    x: -10,
  },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      type: 'ease-in',
      stiffness: 300,
      damping: 20,
    },
    letterSpacing: '2px',
  },
};

export default function Explore() {
  const firstName = 'MAYBE';
  const lastName = 'SOMEONE';
  const containerRef = useRef<HTMLDivElement>(null);

  const isContainerView = useInView(containerRef, { amount: 0.5, once: true });

  return (
    <div
      ref={containerRef}
      id="explore"
      className="snap-section relative z-[4] flex flex-col items-center gap-10 p-5"
    >
      <div className="relative flex h-full w-full pt-28 md:pt-0">
        <CircleCursor targets=".target" />

        <div
          className={
            'absolute z-[10] flex h-full w-full flex-col items-center justify-between gap-10'
          }
        >
          <motion.p
            initial={'hidden'}
            animate={isContainerView ? 'visible' : 'hidden'}
            transition={{ staggerChildren: 0.05 }}
            className="text-4xl"
          >
            <StaggeringTextAnimation
              text={'MYSELF'}
              className="target inline-block"
              variants={myselfVariation}
            />
          </motion.p>

          <h2
            className={`${roboto_slab.className} flex flex-col items-center gap-5 text-7xl font-bold uppercase md:text-[6rem] lg:text-[10rem] xl:text-[12rem] 2xl:text-[16rem]`}
          >
            <motion.p
              initial={'hidden'}
              animate={isContainerView ? 'visible' : 'hidden'}
              transition={{ staggerChildren: 0.05 }}
            >
              <StaggeringTextAnimation
                text={firstName}
                className="target inline-block"
                variants={popInVariants}
              />
            </motion.p>

            <motion.p
              initial="hidden"
              animate={isContainerView ? 'visible' : 'hidden'}
              transition={{ staggerChildren: 0.05, delayChildren: 1 }}
            >
              <StaggeringTextAnimation
                text={lastName}
                className="target inline-block"
                variants={popInVariants}
              />
            </motion.p>
          </h2>

          <ContactButton isContainerView={isContainerView} />
        </div>
      </div>
    </div>
  );
}
