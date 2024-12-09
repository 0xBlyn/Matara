"use client";

import React, { useState, useEffect, useCallback, ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { ToastContainer } from 'react-toastify';
import LoadingScreen from '@/components/Loading';
import Navigation from '@/components/Navigation';
import { AutoIncrement } from '@/components/AutoIncrement';
import { PointSynchronizer } from '@/components/PointSynchronizer';

// Dynamically imported components to optimize performance
const Game = dynamic(() => import('@/components/Game'));
const Mine = dynamic(() => import('@/components/Mine'));
const Friends = dynamic(() => import('@/components/Friends'));
const Earn = dynamic(() => import('@/components/Earn'));
const Airdrop = dynamic(() => import('@/components/Airdrop'));
const Boost = dynamic(() => import('@/components/Boost'));

function ClickerPage() {
    const [currentView, setCurrentViewState] = useState<string>('loading');
    const [isInitialized, setIsInitialized] = useState(false);

    const setCurrentView = useCallback((newView: string) => {
        console.log('Changing view to:', newView);
        setCurrentViewState(newView);
    }, []);

    const renderCurrentView = useCallback(() => {
        if (!isInitialized) {
            return (
                <LoadingScreen
                    setIsInitialized={setIsInitialized}
                    setCurrentView={setCurrentView}
                />
            );
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

    useEffect(() => {
        // This code will only run in the browser
        if (typeof window !== 'undefined') {
            console.log('window object is accessible');
            // Any other code that needs to run in the browser can go here
            setIsInitialized(true); // Example of setting initialization state
        }
    }, []);

    console.log('ClickerPage rendering. Current state:', { currentView, isInitialized });

    return (
        <div className="bg-black min-h-screen text-white">
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