'use client'

import { useEffect, useCallback, useRef, useState } from 'react';
import { useGameStore } from '@/utils/game-mechaincs';

export function AutoIncrement() {
  // Add a state to track client-side rendering
  const [isClient, setIsClient] = useState(false);

  const {
    lastClickTimestamp,
    profitPerHour,
    pointsPerClick,
    energy,
    maxEnergy,
    incrementPoints,
    incrementEnergy
  } = useGameStore();

  // Use a ref to store the latest values without causing re-renders
  const stateRef = useRef({ profitPerHour, pointsPerClick, lastClickTimestamp });

  // Update the ref when these values change
  useEffect(() => {
    stateRef.current = { profitPerHour, pointsPerClick, lastClickTimestamp };
  }, [profitPerHour, pointsPerClick, lastClickTimestamp]);

  // Ensure we only run on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  const autoIncrement = useCallback(() => {
    const { profitPerHour, pointsPerClick, lastClickTimestamp } = stateRef.current;
    const pointsPerSecond = profitPerHour / 3600;
    const currentTime = Date.now();

    incrementPoints(pointsPerSecond);

    if (!(lastClickTimestamp && ((currentTime - lastClickTimestamp) < 2000))) {
      incrementEnergy(pointsPerClick);
    }
  }, [incrementPoints, incrementEnergy, pointsPerClick]);

  useEffect(() => {
    // Only set up interval if we're on the client side
    if (!isClient) return;

    const interval = setInterval(autoIncrement, 1000);
    return () => clearInterval(interval);
  }, [autoIncrement, isClient]);

  // Render nothing if not on the client side
  if (!isClient) return null;

  return null;
}