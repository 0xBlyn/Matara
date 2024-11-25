// components/AutoIncrement.tsx
'use client'

import { useEffect, useCallback, useRef } from 'react';
import { useGameStore } from '@/utils/game-mechaincs';

export function AutoIncrement() {
  const {
    profitPerHour,
    incrementPoints,
    isMiningActive,
    miningStartTime,
    setMiningActive,
    setTotalMined,
  } = useGameStore();

  const stateRef = useRef({ profitPerHour, isMiningActive, miningStartTime });

  useEffect(() => {
    stateRef.current = { profitPerHour, isMiningActive, miningStartTime };
  }, [profitPerHour, isMiningActive, miningStartTime]);

  const autoIncrement = useCallback(() => {
    const { profitPerHour, isMiningActive, miningStartTime } = stateRef.current;
    const pointsPerSecond = profitPerHour / 3600;
    const currentTime = Date.now();

    if (isMiningActive && currentTime - miningStartTime < 24 * 60 * 60 * 1000) {
      incrementPoints(pointsPerSecond);
      setTotalMined(pointsPerSecond);
    } else if (isMiningActive) {
      setMiningActive(false);
      console.log("Mining stopped. Please click to restart.");
    }
  }, [incrementPoints, setMiningActive, setTotalMined]);

  useEffect(() => {
    const interval = setInterval(autoIncrement, 1000);
    return () => clearInterval(interval);
  }, [autoIncrement]);

  return null;
}