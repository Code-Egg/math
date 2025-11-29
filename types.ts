export enum GameMode {
  NINE_X_NINE = '9x9',
  MIX = 'MIX'
}

export enum GameState {
  MENU = 'MENU',
  PLAYING = 'PLAYING',
  FINISHED = 'FINISHED'
}

export interface Question {
  id: string;
  text: string;
  answer: number;
  options: number[];
  operand1: number;
  operand2: number;
  operator: 'x' | '+' | '-';
}

export interface GameStats {
  correct: number;
  total: number;
  score: number;
  streak: number;
}