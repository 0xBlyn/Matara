// app/clicker/page.tsx
'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { ToastContainer } from 'react-toastify';
import LoadingScreen from '@/components/Loading';
import Game from '@/components/Game';
import Mine from '@/components/Mine';
import Friends from '@/components/Friends';
import Earn from '@/components/Earn';
import Airdrop from '@/components/Airdrop';
import Boost from '@/components/Boost';
import Navigation from '@/components/Navigation';
import { AutoIncrement } from '@/components/AutoIncrement';
import { PointSynchronizer } from '@/components/PointSynchronizer';

const ClickerPage: React.FC = () => {
    const [currentView, setCurrentViewState] = useState<string>('loading');
    const [isInitialized, setIsInitialized] = useState(false);

    const setCurrentView = useCallback((newView: string) => {
        console.log('Changing view to:', newView);
        setCurrentViewState(newView);
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

    return (
        <div className="min-h-screen text-white">
            <ToastContainer />
            {isInitialized && (
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