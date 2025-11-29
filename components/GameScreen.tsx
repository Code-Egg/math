import React, { useState, useEffect, useCallback } from 'react';
import { GameMode, Question, GameStats } from '../types';
import { generateQuestion } from '../utils/mathUtils';
import { Button } from './Button';

interface GameScreenProps {
  mode: GameMode;
  onFinish: (stats: GameStats) => void;
  onBack: () => void;
}

const TOTAL_QUESTIONS = 20;

export const GameScreen: React.FC<GameScreenProps> = ({ mode, onFinish, onBack }) => {
  const [question, setQuestion] = useState<Question | null>(null);
  const [currentQIndex, setCurrentQIndex] = useState(1);
  const [stats, setStats] = useState<GameStats>({
    correct: 0,
    total: TOTAL_QUESTIONS,
    score: 0,
    streak: 0
  });
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Initialize first question
  useEffect(() => {
    setQuestion(generateQuestion(mode));
  }, [mode]);

  const handleAnswer = useCallback((selected: number) => {
    if (isAnimating || !question) return;

    setSelectedOption(selected);
    setIsAnimating(true);

    const correct = selected === question.answer;
    setIsCorrect(correct);

    // Audio feedback logic could go here
    
    // Update stats
    setStats(prev => ({
      ...prev,
      correct: correct ? prev.correct + 1 : prev.correct,
      score: correct ? prev.score + (10 + prev.streak * 2) : prev.score,
      streak: correct ? prev.streak + 1 : 0
    }));

    // Delay for visual feedback before next question
    setTimeout(() => {
      if (currentQIndex >= TOTAL_QUESTIONS) {
        onFinish({
            ...stats,
            correct: correct ? stats.correct + 1 : stats.correct,
            score: correct ? stats.score + (10 + stats.streak * 2) : stats.score
        });
      } else {
        setQuestion(generateQuestion(mode));
        setCurrentQIndex(prev => prev + 1);
        setSelectedOption(null);
        setIsCorrect(null);
        setIsAnimating(false);
      }
    }, 1000);
  }, [isAnimating, question, currentQIndex, onFinish, stats, mode]);

  if (!question) return <div className="p-10 text-center">Loading Mission Data...</div>;

  const progress = (currentQIndex / TOTAL_QUESTIONS) * 100;

  return (
    <div className="flex flex-col h-full max-w-3xl mx-auto p-4 md:p-6">
      {/* Header / HUD */}
      <div className="flex justify-between items-center mb-6 bg-slate-800/60 backdrop-blur rounded-2xl p-4 border border-slate-700">
        <div className="flex flex-col">
          <span className="text-xs text-slate-400 uppercase tracking-wider font-bold">Progress</span>
          <div className="flex items-center gap-2">
            <span className="text-xl font-mono text-cyan-400">{currentQIndex}</span>
            <span className="text-slate-500">/</span>
            <span className="text-lg text-slate-500">{TOTAL_QUESTIONS}</span>
          </div>
        </div>
        
        <div className="flex flex-col items-center">
             <div className="text-2xl font-black text-yellow-400 drop-shadow-md">
                {stats.score}
             </div>
             <span className="text-[10px] text-yellow-600 font-bold tracking-widest uppercase">Points</span>
        </div>

        <button 
            onClick={onBack}
            className="px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm text-slate-300 transition-colors"
        >
            Abort
        </button>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-800 h-2 rounded-full mb-8 overflow-hidden">
        <div 
            className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full transition-all duration-500" 
            style={{ width: `${progress}%` }}
        />
      </div>

      {/* Question Area */}
      <div className="flex-1 flex flex-col justify-center items-center mb-8 relative">
        <div className={`
            text-6xl md:text-8xl font-black tracking-tight text-white mb-8
            transition-all duration-300
            ${isAnimating && isCorrect ? 'text-green-400 scale-110' : ''}
            ${isAnimating && !isCorrect ? 'text-red-400 shake' : ''}
        `}>
          {question.text.replace('=', '')}
        </div>
        
        {isAnimating && (
            <div className="absolute -top-10 text-4xl animate-bounce">
                {isCorrect ? '🌟' : '❌'}
            </div>
        )}
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-2 gap-4 md:gap-6 mb-8">
        {question.options.map((opt, idx) => {
            let btnClass = "";
            if (isAnimating) {
                if (opt === question.answer) btnClass = "!bg-green-500 !border-green-700 !text-white ring-4 ring-green-500/30";
                else if (opt === selectedOption) btnClass = "!bg-red-500 !border-red-700 !text-white opacity-50";
                else btnClass = "opacity-30";
            }

            return (
                <Button 
                    key={idx}
                    variant="option"
                    onClick={() => handleAnswer(opt)}
                    className={btnClass}
                    disabled={isAnimating}
                >
                    {opt}
                </Button>
            );
        })}
      </div>

      <div className="h-4 text-center">
          {stats.streak > 2 && !isAnimating && (
              <span className="text-orange-400 font-bold text-sm animate-pulse">
                  🔥 {stats.streak} Streak! Super Hot!
              </span>
          )}
      </div>
    </div>
  );
};