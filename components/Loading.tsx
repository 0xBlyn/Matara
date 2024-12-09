// 'use client'

// import { useEffect, useState, useRef, useCallback } from 'react';
// import Image from 'next/image';
// import { mainCharacter } from '@/images';
// import IceCube from '@/icons/IceCube';
// import { calculateEnergyLimit, calculateLevel, calculatePointsPerClick, calculateProfitPerHour, GameState, InitialGameState, useGameStore } from '@/utils/game-mechaincs';

// interface WebApp {
//   ready: () => void;
//   initData: string;
//   initDataUnsafe: {
//     user?: {
//       id: number;
//       username?: string;
//       first_name?: string;
//     };
//     start_param?: string;
//   };
// }

// declare global {
//   interface Window {
//     Telegram?: {
//       WebApp: WebApp;
//     };
//   }
// }

// interface LoadingProps {
//   setIsInitialized: React.Dispatch<React.SetStateAction<boolean>>;
//   setCurrentView: (view: string) => void;
// }

// export default function Loading({ setIsInitialized, setCurrentView }: LoadingProps) {
//   const initializeState = useGameStore((state: GameState) => state.initializeState);
//   const [isDataLoaded, setIsDataLoaded] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const openTimestampRef = useRef(Date.now());
//   const [isMounted, setIsMounted] = useState(false);

//   const fetchOrCreateUser = useCallback(async () => {
//     if (!isMounted || typeof window === 'undefined') return;

//     try {
//       const WebApp = window.Telegram?.WebApp;
//       if (!WebApp) {
//         console.warn('Telegram WebApp is not available, using fallback data');
//       }

//       WebApp?.ready();
//       let initData = WebApp?.initData ?? 'fallback_init_data';
//       const telegramId = WebApp?.initDataUnsafe?.user?.id.toString() ?? 'fallback_id';
//       const username = WebApp?.initDataUnsafe?.user?.username ?? 'Unknown User';
//       const telegramName = WebApp?.initDataUnsafe?.user?.first_name ?? 'Unknown User';

//       const startParam = new URLSearchParams(WebApp?.initDataUnsafe?.start_param ?? '').get('startapp');
//       const referrerTelegramId = startParam ? startParam.replace('kentId', '') : null;

//       if (process.env.NEXT_PUBLIC_BYPASS_TELEGRAM_AUTH === 'true') {
//         initData = "temp";
//       }
//       let url = `/api/user?initData=${encodeURIComponent(initData)}`;
//       if (referrerTelegramId) {
//         url += `&referrer=${referrerTelegramId}`;
//       }
//       const response = await fetch(url);
//       if (!response.ok) {
//         throw new Error('Failed to fetch or create user');
//       }
//       const userData = await response.json();

//       console.log("User data fetched successfully:", userData);

//       const initialState: InitialGameState = {
//         userTelegramInitData: initData,
//         userTelegramName: telegramName,
//         lastClickTimestamp: userData.lastPointsUpdateTimestamp,
//         gameLevelIndex: calculateLevel(userData.points),
//         points: userData.points,
//         pointsBalance: userData.pointsBalance,
//         unsynchronizedPoints: 0,
//         multitapLevelIndex: userData.multitapLevelIndex,
//         pointsPerClick: calculatePointsPerClick(userData.multitapLevelIndex),
//         energy: userData.energy,
//         maxEnergy: calculateEnergyLimit(userData.energyLimitLevelIndex),
//         energyRefillsLeft: userData.energyRefillsLeft,
//         energyLimitLevelIndex: userData.energyLimitLevelIndex,
//         lastEnergyRefillTimestamp: userData.lastEnergyRefillsTimestamp,
//         mineLevelIndex: userData.mineLevelIndex,
//         profitPerHour: calculateProfitPerHour(userData.mineLevelIndex)
//       };

//       console.log("Initial state created:", initialState);

//       initializeState(initialState);
//       setIsDataLoaded(true);
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//       setError('Failed to load user data. Please try again.');
//     }
//   }, [initializeState, isMounted]);

//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   useEffect(() => {
//     if (isMounted) {
//       fetchOrCreateUser();
//     }
//   }, [fetchOrCreateUser, isMounted]);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (!isDataLoaded && !error) {
//         console.log("Loading timeout reached");
//         setError('Loading took too long. Please check your connection and try again.');
//       }
//     }, 30000); // 30 seconds timeout

//     return () => clearTimeout(timer);
//   }, [isDataLoaded, error]);

//   useEffect(() => {
//     if (isDataLoaded) {
//       const currentTime = Date.now();
//       const elapsedTime = currentTime - openTimestampRef.current;
//       const remainingTime = Math.max(3000 - elapsedTime, 0);

//       const timer = setTimeout(() => {
//         console.log("Loading complete, transitioning to game view");
//         setCurrentView('game');
//         setIsInitialized(true);
//       }, remainingTime);

//       return () => clearTimeout(timer);
//     }
//   }, [isDataLoaded, setCurrentView, setIsInitialized]);

//   if (!isMounted) {
//     return null;
//   }

//   if (error) {
//     return (
//       <div className="bg-[#1d2025] flex justify-center items-center h-screen">
//         <div className="w-full max-w-xl text-white flex flex-col items-center">
//           <h1 className="text-3xl font-bold mb-4">Error</h1>
//           <p className="text-center mb-4">{error}</p>
//           <button 
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//             onClick={() => window.location.reload()}
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-[#1d2025] flex justify-center items-center h-screen">
//       <div className="w-full max-w-xl text-white flex flex-col items-center">
//         <div className="w-64 h-64 rounded-full circle-outer p-2 mb-8">
//           <div className="w-full h-full rounded-full circle-inner overflow-hidden relative">
//             <Image
//               src={mainCharacter}
//               alt="Main Character"
//               fill
//               style={{
//                 objectFit: 'cover',
//                 objectPosition: 'center',
//                 transform: 'scale(1.05) translateY(10%)'
//               }}
//             />
//           </div>
//         </div>

//         <h1 className="text-3xl font-bold mb-4">Loading TonIce</h1>

//         <div className="flex items-center space-x-2">
//           <IceCube className="w-8 h-8 animate-pulse" />
//           <IceCube className="w-8 h-8 animate-pulse delay-100" />
//           <IceCube className="w-8 h-8 animate-pulse delay-200" />
//         </div>
//       </div>
//     </div>
//   );
// }



'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function TelegramAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const router = useRouter()

    useEffect(() => {
        checkAuth()
    }, [])

    const checkAuth = async () => {
        const response = await fetch('/api/session')
        if (response.ok) {
            setIsAuthenticated(true)
        }
    }

    const authenticateUser = async () => {
        const WebApp = (await import('@twa-dev/sdk')).default
        WebApp.ready()
        const initData = WebApp.initData
        if (initData) {
            try {
                const response = await fetch('/api/auth', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ initData }),
                })

                if (response.ok) {
                    setIsAuthenticated(true)
                    router.refresh()
                } else {
                    console.error('Authentication failed')
                    setIsAuthenticated(false)
                }
            } catch (error) {
                console.error('Error during authentication:', error)
                setIsAuthenticated(false)
            }
        }
    }

    return (
        <div className="flex flex-col items-center space-y-4 p-8">
            {isAuthenticated ? (
                <>
                    <p>Authenticated!</p>
                    <button
                        onClick={() => router.push('/protected')}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Access Protected Page
                    </button>
                </>
            ) : (
                <div>
                    <p>You need to be an owner of this account</p>
                    <button
                        onClick={authenticateUser}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Authenticate
                    </button>
                </div>
            )}
        </div>
    )
}