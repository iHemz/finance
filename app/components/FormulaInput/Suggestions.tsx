import { Tag } from "@/app/store/formulaStore";
import { Loader, Paper, Text } from "@mantine/core";
import React from "react";

interface SuggestionsProps {
  suggestions: Tag[];
  isLoading: boolean;
  isError: boolean;
  onSelectSuggestion: (suggestion: Tag) => void;
  position: { top: number; left: number };
  visible: boolean;
}

export const Suggestions: React.FC<SuggestionsProps> = ({
  suggestions,
  isLoading,
  isError,
  onSelectSuggestion,
  position,
  visible,
}) => {
  if (!visible) return null;

  return (
    <Paper
      shadow="md"
      p="xs"
      style={{
        position: "absolute",
        top: `${position.top}px`,
        left: `${position.left}px`,
        width: "240px",
        maxHeight: "200px",
        overflowY: "auto",
        zIndex: 1000,
      }}
    >
      {isLoading ? (
        <div style={{ display: "flex", justifyContent: "center", padding: "10px" }}>
          <Loader size="sm" />
        </div>
      ) : isError ? (
        <Text color="red" size="sm">
          Error loading suggestions
        </Text>
      ) : suggestions.length === 0 ? (
        <Text size="sm" color="dimmed">
          No suggestions found
        </Text>
      ) : (
        <div>
          {suggestions.map(suggestion => (
            <div
              key={suggestion.id}
              onClick={() => onSelectSuggestion(suggestion)}
              style={{
                padding: "6px 10px",
                cursor: "pointer",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = "#f1f3f5";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  marginRight: "8px",
                  backgroundColor:
                    suggestion.type === "variable"
                      ? "blue"
                      : suggestion.type === "function"
                        ? "green"
                        : "orange",
                }}
              />
              <Text size="sm">{suggestion.label}</Text>
              <Text size="xs" color="dimmed" ml="auto">
                {suggestion.type}
              </Text>
            </div>
          ))}
        </div>
      )}
    </Paper>
  );
};
