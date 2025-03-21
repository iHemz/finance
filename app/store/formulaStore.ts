import { create } from "zustand";

interface Evaluation {
  id: string;
  name: string;
  formula: (Suggestion | string)[];
  value: number | null;
  createdAt: Date;
}

interface FormulaState {
  formula: (Suggestion | string)[];
  cursorPosition: number;
  suggestions: Suggestion[];
  evaluations: Evaluation[];
  addTag: (tag: Suggestion) => void;
  addOperand: (operand: string) => void;
  deleteFromFormula: () => void;
  setCursorPosition: (position: number) => void;
  setSuggestions: (suggestions: Suggestion[]) => void;
  moveCursorLeft: () => void;
  moveCursorRight: () => void;
  evaluateFormula: () => number | null;
  saveEvaluation: (name: string) => void;
  getEvaluationById: (id: string) => Evaluation | undefined;
  deleteEvaluation: (id: string) => void;
  clearFormula: () => void;
}

export const useFormulaStore = create<FormulaState>((set, get) => ({
  formula: [],
  cursorPosition: 0,
  suggestions: [],
  evaluations: [],

  addTag: tag =>
    set(state => {
      const newFormula = [...state.formula];
      // Find the last operand in the formula
      const lastOperandIndex = newFormula.findLastIndex(
        item => typeof item === "string" && ["+", "-", "*", "/", "(", ")", "^", "%"].includes(item)
      );

      const deleteCount = newFormula.length - lastOperandIndex - 1;
      const tempCursorPosition = state.cursorPosition - deleteCount;
      newFormula.splice(tempCursorPosition, deleteCount, tag);
      return {
        formula: newFormula,
        cursorPosition: tempCursorPosition + 1,
      };
    }),

  addOperand: operand =>
    set(state => {
      const newFormula = [...state.formula];
      const cursorPos = state.cursorPosition;

      // Check if we're adding a number after another number
      if (
        /^[a-zA-Z0-9]$/.test(operand) &&
        cursorPos > 0 &&
        typeof newFormula[cursorPos - 1] === "string" &&
        /^[a-zA-Z0-9]+$/.test(newFormula[cursorPos - 1] as string)
      ) {
        // Combine with the previous number
        newFormula[cursorPos - 1] = newFormula[cursorPos - 1] + operand;
        return {
          formula: newFormula,
          cursorPosition: state.cursorPosition,
        };
      } else {
        // Insert as a new item
        newFormula.splice(state.cursorPosition, 0, operand);
        return {
          formula: newFormula,
          cursorPosition: state.cursorPosition + 1,
        };
      }
    }),

  deleteFromFormula: () =>
    set(state => {
      if (state.cursorPosition === 0) return state;

      const newFormula = [...state.formula];
      const itemToDelete = newFormula[state.cursorPosition - 1];

      // If it's a multi-digit number, delete just the last digit
      if (typeof itemToDelete === "string" && /^[a-zA-Z0-9]{2,}$/.test(itemToDelete)) {
        // Remove the last digit only
        newFormula[state.cursorPosition - 1] = itemToDelete.slice(0, -1);
        return {
          formula: newFormula,
          cursorPosition: state.cursorPosition,
        };
      } else {
        // Regular deletion - remove the whole item
        newFormula.splice(state.cursorPosition - 1, 1);
        return {
          formula: newFormula,
          cursorPosition: state.cursorPosition - 1,
        };
      }
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

  saveEvaluation: name => {
    const state = get();
    const result = state.evaluateFormula();

    const newEvaluation: Evaluation = {
      id: Date.now().toString(),
      name,
      formula: [...state.formula],
      value: result,
      createdAt: new Date(),
    };

    set(state => ({
      evaluations: [...state.evaluations, newEvaluation],
    }));

    return newEvaluation;
  },

  getEvaluationById: id => {
    return get().evaluations.find(evaluation => evaluation.id === id);
  },

  deleteEvaluation: id => {
    set(state => ({
      evaluations: state.evaluations.filter(evaluation => evaluation.id !== id),
    }));
  },

  clearFormula: () => {
    set({
      formula: [],
      cursorPosition: 0,
    });
  },
}));
