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
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestionsPosition, setSuggestionsPosition] = useState({
    top: 0,
    left: 0,
  });
  const inputRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const fakeInputRef = useRef<HTMLInputElement | null>(null);
  const itemRefs = useRef<Array<HTMLSpanElement | HTMLDivElement | null>>([]);

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

  const { data: suggestions = [], isLoading, isError } = useSuggestions(inputValue);

  useEffect(() => {
    onChange?.(formula);
  }, [formula, onChange]);

  useEffect(() => {
    if (!inputRef.current || !cursorRef.current) return;

    const container = inputRef.current;
    const styles = getComputedStyle(container);
    const paddingLeft = parseFloat(styles.paddingLeft) || 0;

    const items = itemRefs.current.slice(0, cursorPosition);
    const itemWidths = items.map(el => el?.offsetWidth || 0);

    // Only add margin for tags, not for numbers or operators
    const totalItemsWidth = itemWidths.reduce((sum, width, idx) => {
      const item = formula[idx];
      // Add margin for tags but not for numbers or operators
      const margin = typeof item !== "string" ? 6 : 1;
      return sum + width + margin;
    }, 0);

    // Only add gaps between different types (tag vs number vs operator)
    let gaps = 0;
    for (let i = 1; i < cursorPosition; i++) {
      const prevItem = formula[i - 1];
      const currItem = formula[i];

      // If we're transitioning between different types, add a small gap
      if (typeof prevItem !== typeof currItem) {
        gaps += 4;
      } else if (typeof prevItem === "string" && typeof currItem === "string") {
        // For operators next to numbers, add a very small gap
        if (
          (["+", "-", "*", "/", "(", ")", "^"].includes(prevItem) &&
            !["+", "-", "*", "/", "(", ")", "^"].includes(currItem)) ||
          (["+", "-", "*", "/", "(", ")", "^"].includes(currItem) &&
            !["+", "-", "*", "/", "(", ")", "^"].includes(prevItem))
        ) {
          gaps += 1;
        }
      }
    }

    const totalWidth = totalItemsWidth + gaps + paddingLeft;

    cursorRef.current.style.left = `${totalWidth}px`;
  }, [cursorPosition, formula]);

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
    const actions: Record<string, () => void> = {
      backspace: () => {
        e.preventDefault();
        if (inputValue) {
          setInputValue(inputValue.slice(0, -1));
          deleteFromFormula();
        } else {
          deleteFromFormula();
        }
      },
      arrowleft: () => {
        e.preventDefault();
        if (inputValue) {
          setInputValue(inputValue.slice(0, -1));
        } else {
          moveCursorLeft();
        }
      },
      arrowright: () => {
        e.preventDefault();
        moveCursorRight();
      },
      enter: () => {
        e.preventDefault();
        if (showSuggestions && suggestions.length > 0) {
          handleSelectSuggestion(suggestions[0]);
        } else {
          const result = evaluateFormula();
          if (onEvaluate) {
            onEvaluate(result);
          }
        }
      },
      escape: () => {
        e.preventDefault();
        setShowSuggestions(false);
        setInputValue("");
      },
      default: () => {
        if (/^[a-zA-Z0-9]$/.test(e.key)) {
          e.preventDefault();
          addOperand(e.key);
          setInputValue(inputValue + e.key);
          setShowSuggestions(true);
        } else if (["+", "-", "*", "/", "(", ")", "^", "%"].includes(e.key)) {
          e.preventDefault();
          addOperand(e.key);
          setInputValue("");
        } else if (!e.ctrlKey && !e.altKey && !e.metaKey) {
          setShowSuggestions(true);
        } else return;
      },
    };
    actions[e.key.toLowerCase()]?.() ?? actions["default"]();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setShowSuggestions(true);
  };

  const handleInputFocus = () => {
    fakeInputRef.current?.focus();
  };

  const handleSelectSuggestion = (suggestion: Suggestion) => {
    addTag(suggestion);
    setInputValue("");
    setShowSuggestions(false);
    handleInputFocus();
  };

  const handleInputClick = (e: React.MouseEvent) => {
    if (inputRef.current) {
      const container = inputRef.current;
      const rect = container.getBoundingClientRect();
      const clickX = e.clientX - rect.left;

      const styles = getComputedStyle(container);
      const paddingLeft = parseFloat(styles.paddingLeft) || 0;

      const cumulativeWidths: number[] = [paddingLeft];
      for (let i = 0; i < formula.length; i++) {
        const element = itemRefs.current[i];
        const width = element?.offsetWidth || 0;
        const item = formula[i];

        // Determine gap based on item type
        let gap = 0;
        if (i > 0) {
          const prevItem = formula[i - 1];

          // If we're transitioning between different types, add a small gap
          if (typeof prevItem !== typeof item) {
            gap = 4;
          } else if (typeof prevItem === "string" && typeof item === "string") {
            // For operators next to numbers, add a very small gap
            if (
              (["+", "-", "*", "/", "(", ")", "^"].includes(prevItem) &&
                !["+", "-", "*", "/", "(", ")", "^"].includes(item)) ||
              (["+", "-", "*", "/", "(", ")", "^"].includes(item) &&
                !["+", "-", "*", "/", "(", ")", "^"].includes(prevItem))
            ) {
              gap = 1;
            }
          }
        }

        // Add margin for tags but not for numbers or operators
        const margin = typeof item !== "string" ? 6 : 0;
        cumulativeWidths.push(cumulativeWidths[i] + width + gap + margin);
      }

      let newPosition = 0;
      for (let k = 0; k < cumulativeWidths.length - 1; k++) {
        const start = cumulativeWidths[k];
        const end = cumulativeWidths[k + 1];
        if (clickX >= start && clickX < end) {
          const midpoint = (start + end) / 2;
          newPosition = clickX < midpoint ? k : k + 1;
          break;
        }
        newPosition = cumulativeWidths.length - 1;
      }

      setCursorPosition(newPosition);
      handleInputFocus();
    }
  };

  const renderFormulaContent = () => {
    if (formula.length === 0) {
      return <Text color="dimmed">{placeholder}</Text>;
    }

    return formula.map((item, index) => {
      if (typeof item === "string") {
        // Check if it's an operator
        if (["+", "-", "*", "/", "(", ")", "^"].includes(item)) {
          return (
            <span
              key={`operand-${index}`}
              ref={el => {
                itemRefs.current[index] = el;
              }}
              style={{ margin: "0" }}
            >
              {item}
            </span>
          );
        } else {
          return (
            <span
              key={`operand-${index}`}
              ref={el => {
                itemRefs.current[index] = el;
              }}
              style={{ margin: "0" }}
            >
              {item}
            </span>
          );
        }
      } else {
        return (
          <TagComponent
            key={`tag-${item.id}-${index}`}
            ref={el => {
              itemRefs.current[index] = el;
            }}
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

      <Suggestions
        suggestions={suggestions}
        isLoading={isLoading}
        isError={isError}
        onSelectSuggestion={handleSelectSuggestion}
        position={suggestionsPosition}
        visible={showSuggestions && inputValue.length > 0}
      />

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
