import { create } from "zustand";

interface FormulaState {
  formula: (Suggestion | string)[];
  cursorPosition: number;
  suggestions: Suggestion[];
  addTag: (tag: Suggestion) => void;
  addOperand: (operand: string) => void;
  deleteFromFormula: () => void;
  setCursorPosition: (position: number) => void;
  setSuggestions: (suggestions: Suggestion[]) => void;
  moveCursorLeft: () => void;
  moveCursorRight: () => void;
  evaluateFormula: () => number | null;
}

export const useFormulaStore = create<FormulaState>((set, get) => ({
  formula: [],
  cursorPosition: 0,
  suggestions: [],

  addTag: tag =>
    set(state => {
      const newFormula = [...state.formula];
      newFormula.splice(state.cursorPosition, 0, tag);
      return {
        formula: newFormula,
        cursorPosition: state.cursorPosition + 1,
      };
    }),

  addOperand: operand =>
    set(state => {
      const newFormula = [...state.formula];
      newFormula.splice(state.cursorPosition, 0, operand);
      return {
        formula: newFormula,
        cursorPosition: state.cursorPosition + 1,
      };
    }),

  deleteFromFormula: () =>
    set(state => {
      if (state.cursorPosition === 0) return state;

      const newFormula = [...state.formula];
      newFormula.splice(state.cursorPosition - 1, 1);

      return {
        formula: newFormula,
        cursorPosition: state.cursorPosition - 1,
      };
    }),

  setCursorPosition: position => set({ cursorPosition: position }),

  setSuggestions: suggestions => set({ suggestions }),

  moveCursorLeft: () =>
    set(state => ({
      cursorPosition: Math.max(0, state.cursorPosition - 1),
    })),

  moveCursorRight: () =>
    set(state => ({
      cursorPosition: Math.min(state.formula.length, state.cursorPosition + 1),
    })),

  evaluateFormula: () => {
    const { formula } = get();

    try {
      // Simple evaluation logic (to be expanded)
      const expressionString = formula
        .map(item => {
          if (typeof item === "string") return item;
          // For tags, use their value or 0 if undefined
          return item.value !== undefined ? item.value : 0;
        })
        .join("");

      // Use Function constructor to evaluate the expression safely
      // Note: In a production environment, you'd want a more robust solution
      return Function(`"use strict"; return (${expressionString})`)();
    } catch (error) {
      console.error("Error evaluating formula:", error);
      return null;
    }
  },
}));
