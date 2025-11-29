import { GameMode, Question } from '../types';

const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export const generateQuestion = (mode: GameMode): Question => {
  let op: 'x' | '+' | '-';
  let a: number, b: number, ans: number;

  if (mode === GameMode.NINE_X_NINE) {
    op = 'x';
    a = getRandomInt(1, 9);
    b = getRandomInt(1, 9);
    ans = a * b;
  } else {
    // MIX Mode
    const randOp = Math.random();
    if (randOp < 0.33) {
      op = 'x';
      a = getRandomInt(1, 9);
      b = getRandomInt(1, 9);
      ans = a * b;
    } else if (randOp < 0.66) {
      op = '+';
      // Sum under 100
      a = getRandomInt(1, 80);
      b = getRandomInt(1, 100 - a);
      ans = a + b;
    } else {
      op = '-';
      // Result >= 0, Start number under 100
      a = getRandomInt(5, 99);
      b = getRandomInt(1, a); // Ensure a - b >= 0
      ans = a - b;
    }
  }

  // Generate unique distractors
  const optionsSet = new Set<number>();
  optionsSet.add(ans);

  while (optionsSet.size < 4) {
    let offset = getRandomInt(-10, 10);
    if (offset === 0) offset = 1;
    
    // Sometimes verify the last digit to make it tricky (e.g., if 3x5=15, maybe offer 25 or 35)
    if (Math.random() > 0.5) {
       offset = getRandomInt(-2, 2) * 10; 
    }

    let fake = ans + offset;
    
    // Ensure distractor is positive and logical
    if (fake < 0) fake = getRandomInt(0, 10);
    
    if (!optionsSet.has(fake)) {
      optionsSet.add(fake);
    }
  }

  return {
    id: Math.random().toString(36).substr(2, 9),
    text: `${a} ${op === 'x' ? '×' : op} ${b} = ?`,
    answer: ans,
    options: shuffleArray(Array.from(optionsSet)),
    operand1: a,
    operand2: b,
    operator: op
  };
};