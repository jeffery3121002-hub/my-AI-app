
import React from 'react';
import { PlantInfo } from '../types';

interface PlantDetailProps {
  info: PlantInfo;
  onBack: () => void;
}

const PlantDetail: React.FC<PlantDetailProps> = ({ info, onBack }) => {
  return (
    <div className="relative min-h-screen bg-background-light dark:bg-background-dark pb-32">
      {/* Hero Header */}
      <div className="relative w-full h-[420px]">
        {/* Navigation Overlays */}
        <div className="absolute top-0 left-0 w-full z-20 flex justify-between items-center p-6 pt-12 bg-gradient-to-b from-black/50 to-transparent">
          <button 
            onClick={onBack}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/10 text-white hover:bg-primary hover:text-slate-900 transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back_ios_new</span>
          </button>
          <div className="flex gap-3">
            <button className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/10 text-white hover:bg-primary hover:text-slate-900 transition-all group">
              <span className="material-symbols-outlined text-[20px] group-hover:fill-1">favorite</span>
            </button>
            <button className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/10 text-white hover:bg-primary hover:text-slate-900 transition-all">
              <span className="material-symbols-outlined text-[20px]">ios_share</span>
            </button>
          </div>
        </div>

        {/* Hero Image */}
        <div 
          className="w-full h-full bg-center bg-cover" 
          style={{ backgroundImage: `url('${info.imageUrl || 'https://picsum.photos/seed/plant/800/800'}')` }}
        />
        
        {/* Bottom Gradient Overlay */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background-light dark:from-background-dark to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 -mt-20 px-6 flex flex-col gap-6">
        {/* Title Header */}
        <div className="flex flex-col gap-2">
          <div className="flex items-start justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-green-800 dark:text-primary mb-2 border border-primary/20">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                <span className="text-xs font-bold tracking-wide uppercase">識別成功</span>
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                {info.name} <span className="text-primary">.</span>
              </h1>
              <p className="text-lg font-medium text-slate-500 dark:text-slate-400 italic">{info.scientificName}</p>
            </div>
            
            <div className="bg-white dark:bg-card-dark p-3 rounded-2xl shadow-sm border border-slate-100 dark:border-white/5">
              <div className="flex flex-col items-center gap-1">
                <span className="text-xs text-slate-400 font-medium uppercase">難度</span>
                <div className="flex gap-0.5">
                  {[...Array(3)].map((_, i) => (
                    <span 
                      key={i} 
                      className={`material-symbols-outlined text-[18px] ${i < info.difficulty ? 'text-primary fill-1' : 'text-slate-200 dark:text-slate-700'}`}
                      style={{ fontVariationSettings: i < info.difficulty ? "'FILL' 1" : "" }}
                    >
                      star
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed mt-2">
            {info.description}
          </p>
        </div>

        {/* Trivia Card */}
        <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-card-dark border border-slate-100 dark:border-white/5 shadow-sm p-6 group transition-all hover:shadow-md">
          <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all"></div>
          <div className="relative flex flex-col gap-3">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-slate-900">
                <span className="material-symbols-outlined text-[18px]">lightbulb</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">趣味冷知識 💡</h3>
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              {info.trivia}
            </p>
            <div className="mt-2 flex justify-end">
              <button className="text-xs font-bold text-green-700 dark:text-primary flex items-center gap-1 hover:gap-2 transition-all">
                更多趣聞 <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>

        {/* Care Guide */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">養護指南</h2>
            <button className="text-sm font-medium text-slate-400 dark:text-slate-500">查看完整攻略</button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <CareItem icon="wb_sunny" label="光照" value={info.careGuide.light} color="orange" />
            <CareItem icon="water_drop" label="水分" value={info.careGuide.water} color="blue" />
            <CareItem icon="device_thermostat" label="溫度" value={info.careGuide.temperature} color="red" />
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-2">
          {info.tags.map((tag, idx) => (
            <span key={idx} className="px-4 py-2 rounded-full bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm font-medium">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Sticky Bottom Action */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm">
        <button className="w-full flex items-center justify-center gap-3 bg-primary hover:bg-[#0fd650] text-slate-900 rounded-full h-14 font-bold text-lg shadow-lg shadow-primary/30 transition-all transform active:scale-95">
          <span className="material-symbols-outlined">add_a_photo</span>
          <span>加入我的花園</span>
        </button>
      </div>
    </div>
  );
};

const CareItem = ({ icon, label, value, color }: { icon: string, label: string, value: string, color: string }) => {
  const colorMap: any = {
    orange: 'bg-orange-100 text-orange-500 dark:bg-orange-900/30 dark:text-orange-400',
    blue: 'bg-blue-100 text-blue-500 dark:bg-blue-900/30 dark:text-blue-400',
    red: 'bg-red-100 text-red-500 dark:bg-red-900/30 dark:text-red-400',
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white dark:bg-card-dark border border-slate-100 dark:border-white/5 shadow-sm aspect-[4/5] hover:-translate-y-1 transition-transform duration-300">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${colorMap[color]}`}>
        <span className="material-symbols-outlined text-[24px]">{icon}</span>
      </div>
      <span className="text-slate-400 text-xs font-medium mb-1">{label}</span>
      <span className="text-slate-900 dark:text-white font-bold text-center text-[11px] leading-tight">{value}</span>
    </div>
  );
};

export default PlantDetail;
