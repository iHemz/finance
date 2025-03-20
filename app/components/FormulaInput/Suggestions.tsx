import { Box, Button, Group, Loader, Paper, Stack, Text } from "@mantine/core";
import React from "react";

interface SuggestionsProps {
  suggestions: Suggestion[];
  isLoading: boolean;
  isError: boolean;
  onSelectSuggestion: (suggestion: Suggestion) => void;
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
        <Box style={{ display: "flex", justifyContent: "center", padding: "10px" }}>
          <Loader size="sm" />
        </Box>
      ) : isError ? (
        <Text color="red" size="sm">
          Error loading suggestions
        </Text>
      ) : suggestions.length === 0 ? (
        <Text size="sm" color="dimmed">
          No suggestions found
        </Text>
      ) : (
        <Stack w="100%">
          {suggestions.map((suggestion, i) => (
            <Button w="100%" key={i} onClick={() => onSelectSuggestion(suggestion)}>
              <Group justify="space-between">
                <Text size="sm">{suggestion.name}</Text>
                <Text size="xs" color="dimmed" ml="auto">
                  {suggestion.category}
                </Text>
              </Group>
            </Button>
          ))}
        </Stack>
      )}
    </Paper>
  );
};
