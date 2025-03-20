import { Suggestions } from "@/app/components/FormulaInput/Suggestions";
import { TagComponent } from "@/app/components/FormulaInput/TagComponent";
import { useSuggestions } from "@/app/hooks/useSuggestions";
import { useFormulaStore } from "@/app/store/formulaStore";
import { Box, Paper, Text, TextInput } from "@mantine/core";
import React, { useEffect, useRef, useState } from "react";

interface FormulaInputProps {
  placeholder?: string;
  onChange?: (formula: (Suggestion | string)[]) => void;
  onEvaluate?: (result: number | null) => void;
}

export const FormulaInput: React.FC<FormulaInputProps> = ({
  placeholder = "Enter formula...",
  onChange,
  onEvaluate,
}) => {
  // Local state
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestionsPosition, setSuggestionsPosition] = useState({
    top: 0,
    left: 0,
  });
  const inputRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const fakeInputRef = useRef<HTMLInputElement | null>(null);

  // Get formula state from Zustand store
  const {
    formula,
    cursorPosition,
    addTag,
    addOperand,
    deleteFromFormula,
    setCursorPosition,
    evaluateFormula,
    moveCursorLeft,
    moveCursorRight,
  } = useFormulaStore();

  // Get suggestions based on current input
  const { data: suggestions = [], isLoading, isError } = useSuggestions(inputValue);

  // Update parent component with formula changes
  useEffect(() => {
    if (onChange) {
      onChange(formula);
    }
  }, [formula, onChange]);

  // Update cursor position visually
  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.style.left = `${cursorPosition * 8}px`;
    }
  }, [cursorPosition]);

  // Position suggestions dropdown below cursor
  useEffect(() => {
    if (inputRef.current && cursorRef.current && showSuggestions) {
      const inputRect = inputRef.current.getBoundingClientRect();
      const cursorRect = cursorRef.current.getBoundingClientRect();

      setSuggestionsPosition({
        top: cursorRect.bottom - inputRect.top,
        left: cursorRect.left - inputRect.left,
      });
    }
  }, [showSuggestions, cursorPosition]);

  // Handle key presses
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Handle special keys
    switch (e.key) {
      case "Backspace":
        e.preventDefault();
        if (inputValue) {
          setInputValue(inputValue.slice(0, -1));
        } else {
          deleteFromFormula();
        }
        break;

      case "ArrowLeft":
        e.preventDefault();
        if (inputValue) {
          setInputValue(inputValue.slice(0, -1));
        } else {
          moveCursorLeft();
        }
        break;

      case "ArrowRight":
        e.preventDefault();
        moveCursorRight();
        break;

      case "Enter":
        e.preventDefault();
        if (showSuggestions && suggestions.length > 0) {
          handleSelectSuggestion(suggestions[0]);
        } else {
          const result = evaluateFormula();
          if (onEvaluate) {
            onEvaluate(result);
          }
        }
        break;

      case "Escape":
        e.preventDefault();
        setShowSuggestions(false);
        setInputValue("");
        break;

      case "+":
      case "-":
      case "*":
      case "/":
      case "(":
      case ")":
      case "^":
        e.preventDefault();
        addOperand(e.key);
        setInputValue("");
        break;

      default:
        addOperand(e.key);
        // Allow typing numbers directly
        // if (/^[0-9]$/.test(e.key)) {
        //   e.preventDefault();
        //   return;
        // }

        // For other keys, update inputValue for autocomplete
        if (!e.ctrlKey && !e.altKey && !e.metaKey) {
          setShowSuggestions(true);
        }
    }
  };

  // Handle typing in the input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setShowSuggestions(true);
  };

  const handleInputFocus = () => {
    if (fakeInputRef.current) {
      fakeInputRef.current.focus();
    }
  };

  // Handle selecting a suggestion
  const handleSelectSuggestion = (suggestion: Suggestion) => {
    addTag(suggestion);
    setInputValue("");
    setShowSuggestions(false);
    handleInputFocus();
  };

  // Handle clicking on the input area
  const handleInputClick = (e: React.MouseEvent) => {
    if (inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;

      // Approximate position based on click
      const approxPosition = Math.round(clickX / 8);
      const newPosition = Math.max(0, Math.min(formula.length, approxPosition));

      setCursorPosition(newPosition);
    }
    handleInputFocus();
  };

  // Render formula content
  const renderFormulaContent = () => {
    if (formula.length === 0) {
      return <Text color="dimmed">{placeholder}</Text>;
    }

    return formula.map((item, index) => {
      if (typeof item === "string") {
        // Render operands and numbers
        return (
          <span key={`operand-${index}`} style={{ margin: "0 3px" }}>
            {item}
          </span>
        );
      } else {
        // Render tags with dropdown
        return (
          <TagComponent
            key={`tag-${item.id}-${index}`}
            tag={item}
            onDelete={() => {
              setCursorPosition(index);
              deleteFromFormula();
            }}
          />
        );
      }
    });
  };

  return (
    <Box style={{ position: "relative" }}>
      <Paper
        ref={inputRef}
        p="sm"
        shadow="xs"
        style={{
          minHeight: "40px",
          padding: "8px 12px",
          border: "1px solid #ced4da",
          borderRadius: "4px",
          position: "relative",
          cursor: "text",
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "4px",
        }}
        onClick={handleInputClick}
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        {renderFormulaContent()}

        {/* Fake input to capture user typing */}
        <TextInput
          type="text"
          ref={fakeInputRef}
          value={inputValue}
          onChange={handleChange}
          style={{
            position: "absolute",
            opacity: 0,
            pointerEvents: "none",
          }}
          autoFocus
        />

        {/* Cursor */}
        <span
          ref={cursorRef}
          style={{
            position: "absolute",
            height: "70%",
            width: "2px",
            backgroundColor: "#228be6",
            left: 0,
            animation: "blink 1s step-end infinite",
          }}
        />
      </Paper>

      {/* Suggestions dropdown */}
      <Suggestions
        suggestions={suggestions}
        isLoading={isLoading}
        isError={isError}
        onSelectSuggestion={handleSelectSuggestion}
        position={suggestionsPosition}
        visible={showSuggestions && inputValue.length > 0}
      />

      {/* Add global styles for cursor blink animation */}
      <style jsx global>{`
        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </Box>
  );
};
