
import React from 'react';
import { PlantInfo } from '../types';

interface HomeProps {
  history: PlantInfo[];
  onPlantSelect: (plant: PlantInfo) => void;
}

const Home: React.FC<HomeProps> = ({ history, onPlantSelect }) => {
  const categories = ['全部', '室內', '多肉', '戶外', '草藥'];
  
  const featured = [
    {
      name: '新加坡濱海灣花園',
      desc: '地標性的未來派植物仙境',
      img: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&q=80&w=800',
      tag: '人氣地標'
    },
    {
      name: '倫敦邱園',
      desc: '世界上最大的植物收集地',
      img: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=800',
      tag: '科學研究'
    }
  ];

  return (
    <div className="pb-32 bg-background-light dark:bg-background-dark">
      {/* Top Navigation / Header */}
      <header className="px-6 pt-10 pb-6 sticky top-0 z-40 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary font-bold">eco</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-text-main-light dark:text-white">Nature<span className="text-primary">.</span></h1>
          </div>
          <button className="relative w-10 h-10 rounded-full bg-white dark:bg-card-dark shadow-sm border border-gray-100 dark:border-white/5 flex items-center justify-center">
            <span className="material-symbols-outlined text-text-sub-light dark:text-text-sub-dark">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-card-dark"></span>
          </button>
        </div>

        {/* Search Field */}
        <div className="relative">
          <input 
            type="text" 
            placeholder="搜尋植物、疾病或園藝貼士..."
            className="w-full h-14 pl-12 pr-4 bg-white dark:bg-card-dark rounded-2xl border-none shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] dark:shadow-none placeholder:text-gray-400 dark:placeholder:text-gray-500 text-text-main-light dark:text-white focus:ring-2 focus:ring-primary/50 transition-all"
          />
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">search</span>
        </div>
      </header>

      {/* Categories */}
      <div className="px-6 mb-8 overflow-x-auto no-scrollbar flex gap-3">
        {categories.map((cat, idx) => (
          <button 
            key={cat} 
            className={`px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
              idx === 0 
                ? 'bg-primary text-primary-content shadow-lg shadow-primary/20' 
                : 'bg-white dark:bg-card-dark text-text-sub-light dark:text-text-sub-dark border border-gray-100 dark:border-white/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Recent Scans - History */}
      {history.length > 0 && (
        <section className="mb-8">
          <div className="px-6 flex items-center justify-between mb-4">
            <h2 className="text-lg font-extrabold text-text-main-light dark:text-white">最近掃描</h2>
            <button className="text-xs font-bold text-primary">查看歷史</button>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar px-6 pb-2">
            {history.map((plant) => (
              <div 
                key={plant.id}
                onClick={() => onPlantSelect(plant)}
                className="flex-shrink-0 w-20 flex flex-col items-center gap-2 cursor-pointer group"
              >
                <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-white dark:border-card-dark shadow-sm group-hover:scale-105 transition-transform">
                  <img src={plant.imageUrl || 'https://picsum.photos/seed/plant/100/100'} alt={plant.name} className="w-full h-full object-cover" />
                </div>
                <span className="text-[11px] font-bold text-text-main-light dark:text-white truncate w-full text-center">{plant.name}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Featured Articles */}
      <section className="px-6 mb-8">
        <h2 className="text-xl font-extrabold text-text-main-light dark:text-white mb-4">今日探索</h2>
        <div className="flex flex-col gap-4">
          {featured.map((item, idx) => (
            <div key={idx} className="relative h-48 rounded-3xl overflow-hidden group cursor-pointer shadow-md">
              <img src={item.img} alt={item.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute top-4 left-4">
                <span className="bg-primary/90 text-primary-content px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider">{item.tag}</span>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-xl font-bold text-white mb-1">{item.name}</h3>
                <p className="text-white/70 text-sm line-clamp-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pro Tip */}
      <section className="px-6">
        <div className="bg-secondary p-5 rounded-3xl text-white relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-primary text-[20px]">lightbulb</span>
              <span className="text-xs font-bold tracking-widest uppercase opacity-60">園藝小撇步</span>
            </div>
            <h3 className="text-lg font-bold mb-2">春季換盆的最佳時機</h3>
            <p className="text-sm text-white/80 leading-relaxed mb-4">
              當看到根部從花盆底部的排水孔伸出時，就是該幫植物搬新家的時候了！
            </p>
            <button className="bg-white/20 hover:bg-white/30 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-bold transition-all">
              了解更多
            </button>
          </div>
          <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-[120px] opacity-10 rotate-12">potted_plant</span>
        </div>
      </section>
    </div>
  );
};

export default Home;
