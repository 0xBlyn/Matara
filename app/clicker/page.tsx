'use client'

import React, { useState, useEffect, useCallback, ReactNode } from 'react';
import { createGameStore, InitialGameState } from '@/utils/game-mechaincs';
import Game from '@/components/Game';
import Mine from '@/components/Mine';
import Friends from '@/components/Friends';
import Earn from '@/components/Earn';
import Airdrop from '@/components/Airdrop';
import Navigation from '@/components/Navigation';
import LoadingScreen from '@/components/Loading';
import { energyUpgradeBaseBenefit } from '@/utils/consts';
import Boost from '@/components/Boost';
import { ToastContainer } from 'react-toastify';
import { AutoIncrement } from '@/components/AutoIncrement';
import { PointSynchronizer } from '@/components/PointSynchronizer';

function ClickerPage() {
    const [currentView, setCurrentViewState] = useState<string>('game');
    const [isInitialized, setIsInitialized] = useState(true);

    const setCurrentView = useCallback((newView: string) => {
        console.log('Changing view to:', newView);
        setCurrentViewState(newView);
    }, []);

    const renderCurrentView = useCallback(() => {
        switch (currentView) {
            case 'game':
                return <Game currentView={currentView} setCurrentView={setCurrentView} />;
            case 'mine':
                return <Mine />;
            case 'friends':
                return <Friends />;
            case 'earn':
                return <Earn />;
            case 'airdrop':
                return <Airdrop />;
            case 'boost':
                return <Boost currentView={currentView} setCurrentView={setCurrentView} />;
            default:
                return <Game currentView={currentView} setCurrentView={setCurrentView} />;
        }
    }, [currentView, setCurrentView]);

    return (
        <div className="h-screen flex flex-col">
            <div className="flex-grow overflow-y-auto">
                {renderCurrentView()}
            </div>
            {isInitialized && currentView !== 'loading' && (
                <>
                    <Navigation currentView={currentView} setCurrentView={setCurrentView} />
                    <AutoIncrement />
                    <PointSynchronizer />
                    <ToastContainer />
                </>
            )}
        </div>
    );
}

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(_: Error): ErrorBoundaryState {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.log('Error caught by boundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>;
        }

        return this.props.children;
    }
}

export default function ClickerPageWithErrorBoundary() {
    return (
        <ErrorBoundary>
            <ClickerPage />
        </ErrorBoundary>
    );
}