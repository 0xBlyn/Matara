'use client'

import React, { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import LoadingScreen from '@/components/Loading';
import Game from '@/components/Game';
import Navigation from '@/components/Navigation';

// Dynamically import components that might use browser-only APIs
const Mine = dynamic(() => import('@/components/Mine'), { ssr: false });
const Friends = dynamic(() => import('@/components/Friends'), { ssr: false });
const Earn = dynamic(() => import('@/components/Earn'), { ssr: false });
const Airdrop = dynamic(() => import('@/components/Airdrop'), { ssr: false });
const Boost = dynamic(() => import('@/components/Boost'), { ssr: false });
const ToastContainer = dynamic(() => import('react-toastify').then(mod => mod.ToastContainer), { ssr: false });
const AutoIncrement = dynamic(() => import('@/components/AutoIncrement').then(mod => mod.AutoIncrement), { ssr: false });
const PointSynchronizer = dynamic(() => import('@/components/PointSynchronizer').then(mod => mod.PointSynchronizer), { ssr: false });

const ClickerPage: React.FC = () => {
    const [currentView, setCurrentViewState] = useState<string>('loading');
    const [isInitialized, setIsInitialized] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    const setCurrentView = useCallback((newView: string) => {
        console.log('Changing view to:', newView);
        setCurrentViewState(newView);
    }, []);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const renderCurrentView = useCallback(() => {
        if (!isInitialized) {
            return <LoadingScreen setIsInitialized={setIsInitialized} setCurrentView={setCurrentView} />;
        }

        switch (currentView) {
            case 'game':
                return <Game currentView={currentView} setCurrentView={setCurrentView} />;
            case 'boost':
                return <Boost currentView={currentView} setCurrentView={setCurrentView} />;
            case 'mine':
                return <Mine />;
            case 'friends':
                return <Friends />;
            case 'earn':
                return <Earn />;
            case 'airdrop':
                return <Airdrop />;
            default:
                return <Game currentView={currentView} setCurrentView={setCurrentView} />;
        }
    }, [currentView, isInitialized]);

    if (!isMounted) {
        return null; // or a loading indicator
    }

    return (
        <div className="min-h-screen text-white">
            {isMounted && <ToastContainer />}
            {isInitialized && isMounted && (
                <>
                    <AutoIncrement />
                    <PointSynchronizer />
                </>
            )}

            {renderCurrentView()}
            {isInitialized && currentView !== 'loading' && (
                <Navigation currentView={currentView} setCurrentView={setCurrentView} />
            )}
        </div>
    );
};

export default ClickerPage;

