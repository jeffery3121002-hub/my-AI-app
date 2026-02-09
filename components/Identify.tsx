
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { identifyPlant } from '../services/geminiService';
import { PlantInfo } from '../types';

interface IdentifyProps {
  onIdentified: (info: PlantInfo) => void;
  onClose: () => void;
}

const Identify: React.FC<IdentifyProps> = ({ onIdentified, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cameraActive, setCameraActive] = useState(false);

  useEffect(() => {
    async function setupCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' },
          audio: false 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setCameraActive(true);
        }
      } catch (err) {
        console.error("Camera access denied:", err);
        setError("無法取得相機權限。請在系統設定中允許網頁存取相機。");
      }
    }
    setupCamera();

    return () => {
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  const handleCapture = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current || isScanning || !cameraActive) return;

    setIsScanning(true);
    setError(null);

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (context) {
      // Capture frame
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      const base64Image = canvas.toDataURL('image/jpeg', 0.8).split(',')[1];
      const previewUrl = canvas.toDataURL('image/jpeg');

      try {
        const info = await identifyPlant(base64Image);
        onIdentified({ ...info, imageUrl: previewUrl });
      } catch (err) {
        console.error("ID error:", err);
        setError("AI 無法識別此植物，請嘗試更換角度或保持光線充足。");
        setIsScanning(false);
      }
    }
  }, [isScanning, onIdentified, cameraActive]);

  return (
    <div className="relative h-screen w-full bg-black overflow-hidden font-display">
      {/* Video Stream */}
      <video 
        ref={videoRef} 
        autoPlay 
        playsInline 
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${cameraActive ? 'opacity-100' : 'opacity-0'}`}
      />
      
      {/* Camera Loading State */}
      {!cameraActive && !error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900 text-white gap-4">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          <p className="text-sm font-bold opacity-60">啟動相機中...</p>
        </div>
      )}

      {/* Overlay Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 z-10"></div>
      
      <canvas ref={canvasRef} className="hidden" />

      {/* UI Layers */}
      <div className="relative z-20 flex flex-col h-full w-full justify-between pb-12 pt-14">
        {/* Header */}
        <div className="flex items-center justify-between px-6">
          <button 
            onClick={onClose}
            className="w-12 h-12 rounded-2xl bg-black/40 backdrop-blur-md text-white border border-white/10 flex items-center justify-center"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
          
          <div className="px-5 py-2 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
              <span className="text-white text-xs font-black tracking-widest uppercase">Smart Vision</span>
            </div>
          </div>
          
          <button className="w-12 h-12 rounded-2xl bg-black/40 backdrop-blur-md text-white border border-white/10 flex items-center justify-center">
            <span className="material-symbols-outlined">settings</span>
          </button>
        </div>

        {/* Central Scan Area */}
        <div className="flex-1 flex flex-col items-center justify-center px-10">
          <div className="relative aspect-square w-full max-w-xs">
            {/* Corners */}
            <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-primary rounded-tl-3xl"></div>
            <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-primary rounded-tr-3xl"></div>
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-primary rounded-bl-3xl"></div>
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-primary rounded-br-3xl"></div>
            
            {/* Inner Border */}
            <div className="absolute inset-4 border border-white/20 rounded-2xl"></div>

            {/* Animation Overlay */}
            {isScanning && (
              <>
                <div className="absolute inset-0 bg-primary/10 animate-pulse rounded-2xl"></div>
                <div className="absolute left-0 right-0 h-1 bg-primary shadow-[0_0_20px_rgba(19,236,91,1)] scanner-line"></div>
              </>
            )}
            
            {/* Center Focus Dot */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 bg-white/50 rounded-full animate-ping"></div>
            </div>
          </div>

          <div className="mt-8 text-center max-w-[240px]">
            <p className="text-white font-bold mb-2">
              {isScanning ? '正在深度解析植物特徵...' : '將植物置於框內'}
            </p>
            <p className="text-white/50 text-xs">
              {isScanning ? '連結 Gemini 核心數據庫' : '請確保光線充足，並盡量對準葉片或花朵'}
            </p>
          </div>
          
          {error && (
            <div className="mt-6 px-4 py-3 bg-red-500/90 text-white rounded-2xl text-sm font-bold backdrop-blur-md flex items-center gap-2 shadow-lg animate-bounce">
              <span className="material-symbols-outlined text-[20px]">warning</span>
              {error}
            </div>
          )}
        </div>

        {/* Action Bar */}
        <div className="flex flex-col items-center gap-8 w-full">
          <div className="flex items-center justify-center gap-12">
            <div className="flex flex-col items-center gap-2 cursor-pointer group opacity-60 hover:opacity-100 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white">
                <span className="material-symbols-outlined">image</span>
              </div>
              <span className="text-white/60 text-[10px] font-bold uppercase tracking-wider">相簿</span>
            </div>

            <button 
              onClick={handleCapture}
              disabled={isScanning || !cameraActive}
              className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all ${isScanning ? 'scale-90 opacity-50' : 'hover:scale-105 active:scale-95'}`}
            >
              <div className="absolute inset-0 bg-white/20 rounded-full scale-110"></div>
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl">
                <div className="w-[72px] h-[72px] border-4 border-primary rounded-full flex items-center justify-center">
                   <div className={`w-14 h-14 bg-primary rounded-full ${!isScanning && 'pulse-ring'}`}></div>
                </div>
              </div>
            </button>

            <div className="flex flex-col items-center gap-2 cursor-pointer group opacity-60 hover:opacity-100 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white">
                <span className="material-symbols-outlined">history</span>
              </div>
              <span className="text-white/60 text-[10px] font-bold uppercase tracking-wider">歷史</span>
            </div>
          </div>

          <div className="px-6 py-2 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/5 flex gap-8">
            <button className="text-xs font-black text-white/50 uppercase tracking-widest hover:text-white transition-colors">診斷</button>
            <button className="text-xs font-black text-primary uppercase tracking-widest relative">
              識別
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></span>
            </button>
            <button className="text-xs font-black text-white/50 uppercase tracking-widest hover:text-white transition-colors">養護</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Identify;
