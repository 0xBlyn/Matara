'use client'

import React from 'react';
import { useEffect, useState } from 'react';
import { useGameStore } from '@/utils/game-mechaincs';
import Image from 'next/image';
import activeArrow from '@/images/active.png';
import inactiveArrow from '@/images/inactive.png';
import lion from '@/images/image 25.png';
import hourglass from '@/images/image 27.png';
import gradientBackground from '@/images/Group 113.png'

interface GameProps {
  currentView: string;
  setCurrentView: (newView: string) => void;
}

export default function Game({ currentView, setCurrentView }: GameProps) {
  const {
    isMiningActive,
    miningStartTime,
    setMiningActive,
    setMiningStartTime,
    profitPerHour,
    totalMined,
  } = useGameStore();

  const [timeLeft, setTimeLeft] = useState('');
  const [arrowDirection, setArrowDirection] = useState('up');
  const [showPopup, setShowPopup] = useState(false);
  const earningsPerSecond = 0.0002;

  useEffect(() => {
    if (isMiningActive) {
      const interval = setInterval(() => {
        const currentTime = Date.now();
        const timeElapsed = currentTime - miningStartTime;
        const timeRemaining = 24 * 60 * 60 * 1000 - timeElapsed;
        const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        setTimeLeft(`${hours}hrs ${minutes}mins`);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isMiningActive, miningStartTime]);

  const handleStartMining = () => {
    if (!isMiningActive) {
      setMiningActive(true);
      setMiningStartTime(Date.now());
      setArrowDirection('up');
    }
  };

  useEffect(() => {
    if (!isMiningActive) {
      setArrowDirection('down');
    }
  }, [isMiningActive]);

  const handleButtonClick = () => {
    if (isMiningActive) {
      setShowPopup(true);
    } else {
      handleStartMining();
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleMining = () => {
    const minedAmount = 100; // Example amount mined
    useGameStore.getState().increaseMat(minedAmount); // Update the matAmount in the store
  };

  return (
    <div className="relative max-h-[80vh] text-white flex flex-col items-center">
      <div className="flex items-center justify-center w-full px-[10%] lg:max-w-[300px]">
        <div className="text-2xl font-bold text-right mt-7">
          <p className='text-[#4BF693] text-xs font-semibold'>Mining Mode</p>
          <p
            className="font-black leading-none text-2xl  text-transparent bg-clip-text"
            style={{
              backgroundImage: 'linear-gradient(92.78deg, #44F58E 12.41%, #FAFAFA 81.56%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text'
            }}
          >
            {totalMined.toFixed(3)} <span className='text-semibold'>$</span>MAT
          </p>
        </div>
        <div className="relative flex items-center justify-center w-full lg:mx-0 -mx-[8%]">
          <div className="relative justify-center">
            <Image className='sm:w-[120px]' src={hourglass} alt="Hourglass" width={80} height={80} />
            <Image
              src={isMiningActive ? activeArrow : inactiveArrow}
              alt="Mining Status Arrow"
              width={40}
              height={40}
              className="absolute sm:w-[60px] top-0 mt-6 left-0 transform translate-x-1/2 translate-y-1/2 z-10"
            />
          </div>
        </div>
        <div className="text-xl mt-7">
          <p className='text-[#FFBF49] text-xs font-semibold'>Earning Rate</p>
          <p className='font-semibold text-2xl leading-none'>{earningsPerSecond.toFixed(4)} <span className='text-lg leading-none font-base'>$MAT/Sec</span></p>
        </div>
      </div>
      <p className="mb-3 sm:py-1 pt-1 z-[9999] -mt-2 text-transparent bg-clip-text" style={{ backgroundImage: ' linear-gradient(90deg, #FFD683 0%, #FFB948 100%)' }}>
        Mining Resets in <span style={{ color: '#fff' }}>{timeLeft}</span>
      </p>
      <button
        onClick={handleButtonClick}
        className="button lg:max-w-[200px] lg:-mt-0"
        disabled={isMiningActive}
      >
        Claim Daily Matara
      </button>
      <div>
        <Image className='w-full left-0 -z-[9999999]' src={gradientBackground} width={400} height={500} alt='' />
      </div>
      <div className='fixed bottom-0'>
        <Image className='min-w-[100vw] flex  bottom-0 lg:max-w-[300px]' src={lion} alt="Main Character" width={100} height={100} />
      </div>
    </div>
  );
}