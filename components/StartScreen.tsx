import React from 'react';
import { GameMode } from '../types';
import { Button } from './Button';

interface StartScreenProps {
  onStart: (mode: GameMode) => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6 animate-fade-in">
      <div className="mb-12 text-center animate-bounce-small">
        <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400 drop-shadow-lg mb-4">
          MATH ASTRO
        </h1>
        <p className="text-slate-300 text-xl font-medium tracking-wide">
          Mission Control: Select Your Mission!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
        <div 
          onClick={() => onStart(GameMode.NINE_X_NINE)}
          className="group cursor-pointer bg-slate-800/50 backdrop-blur-sm border-4 border-indigo-500 hover:border-cyan-400 rounded-3xl p-8 flex flex-col items-center justify-center transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)]"
        >
          <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">🚀</div>
          <h2 className="text-3xl font-bold text-white mb-2">9 x 9 Speed</h2>
          <p className="text-slate-400 text-center">Multiplication only. Blast through the tables!</p>
        </div>

        <div 
          onClick={() => onStart(GameMode.MIX)}
          className="group cursor-pointer bg-slate-800/50 backdrop-blur-sm border-4 border-fuchsia-500 hover:border-pink-400 rounded-3xl p-8 flex flex-col items-center justify-center transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(232,121,249,0.3)]"
        >
          <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">🛸</div>
          <h2 className="text-3xl font-bold text-white mb-2">Galaxy Mix</h2>
          <p className="text-slate-400 text-center">Plus, Minus & Multiply. A true space adventure!</p>
        </div>
      </div>
      
      <div className="mt-12 text-slate-500 text-sm">
        Ready for lift off? 3... 2... 1...
      </div>
    </div>
  );
};