
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Home from './components/Home';
import Identify from './components/Identify';
import PlantDetail from './components/PlantDetail';
import { AppRoute, PlantInfo } from './types';

const App: React.FC = () => {
  const [route, setRoute] = useState<AppRoute>(AppRoute.HOME);
  const [selectedPlant, setSelectedPlant] = useState<PlantInfo | null>(null);
  const [history, setHistory] = useState<PlantInfo[]>([]);

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('plant_history');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to load history", e);
      }
    }
  }, []);

  // Save history when it changes
  useEffect(() => {
    localStorage.setItem('plant_history', JSON.stringify(history));
  }, [history]);

  const handlePlantIdentified = (info: PlantInfo) => {
    const newPlant = {
      ...info,
      id: Date.now().toString(),
      timestamp: Date.now()
    };
    setHistory(prev => [newPlant, ...prev].slice(0, 20)); // Keep last 20
    setSelectedPlant(newPlant);
    setRoute(AppRoute.DETAIL);
  };

  const navigateToDetail = (plant: PlantInfo) => {
    setSelectedPlant(plant);
    setRoute(AppRoute.DETAIL);
  };

  const renderContent = () => {
    switch (route) {
      case AppRoute.HOME:
        return (
          <Layout activeRoute={route} setRoute={setRoute}>
            <Home 
              history={history}
              onPlantSelect={navigateToDetail}
            />
          </Layout>
        );
      case AppRoute.IDENTIFY:
        return (
          <Identify 
            onIdentified={handlePlantIdentified} 
            onClose={() => setRoute(AppRoute.HOME)} 
          />
        );
      case AppRoute.DETAIL:
        return selectedPlant ? (
          <PlantDetail 
            info={selectedPlant} 
            onBack={() => setRoute(AppRoute.HOME)} 
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-screen p-8 text-center bg-background-light dark:bg-background-dark">
            <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">error</span>
            <p className="text-gray-500 mb-6">哎呀！找不到植物資訊。</p>
            <button 
              onClick={() => setRoute(AppRoute.HOME)}
              className="bg-primary text-primary-content px-6 py-2 rounded-full font-bold shadow-lg"
            >
              返回探索
            </button>
          </div>
        );
      case AppRoute.ENCYCLOPEDIA:
      case AppRoute.PROFILE:
        return (
          <Layout activeRoute={route} setRoute={setRoute}>
            <div className="flex flex-col items-center justify-center h-[80vh] px-10 text-center">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-primary text-5xl">construction</span>
              </div>
              <h2 className="text-2xl font-bold text-text-main-light dark:text-white mb-2">正在秘密培育中...</h2>
              <p className="text-text-sub-light dark:text-text-sub-dark max-w-xs">
                這項功能就像是剛播下的種子，我們正在細心澆水，敬請期待它的綻放！
              </p>
              <button 
                onClick={() => setRoute(AppRoute.HOME)}
                className="mt-8 text-primary font-bold flex items-center gap-2"
              >
                <span className="material-symbols-outlined">arrow_back</span>
                回到探索森林
              </button>
            </div>
          </Layout>
        );
      default:
        return <Home history={history} onPlantSelect={navigateToDetail} />;
    }
  };

  return (
    <div className="max-w-md mx-auto h-screen shadow-2xl overflow-hidden bg-background-light dark:bg-background-dark selection:bg-primary/30">
      {renderContent()}
    </div>
  );
};

export default App;
