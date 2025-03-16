export interface verbsT {
  verb1: string
  verb2: string
  verb3: string
  pronunciation1: string
  pronunciation2: string
  pronunciation3: string
}

export interface CategoryT {
  id: string;
  title: string;
  words: Words[],
  img?: string;
}

export interface Words {
  id: number;
  word: string;
  questionWords: string[];
  correctWord: string;
  isCorrect: boolean;
  selectedAnswer: string;
};