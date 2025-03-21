"use client";

import { EvaluationTable } from "@/app/components/EvaluationTable";
import { FormulaInput } from "@/app/components/FormulaInput";
import { SaveEvaluationModal } from "@/app/components/SaveEvaluationModal";
import { Box, Code, Divider, Group, Stack, Text } from "@mantine/core";
import { useState } from "react";

export default function Home() {
  const [result, setResult] = useState<number | null>(null);
  const [formula, setFormula] = useState<(Suggestion | string)[]>([]);

  // Format the formula for display
  const formatFormula = (formula: (Suggestion | string)[]) => {
    return formula
      .map(item => {
        if (typeof item === "string") {
          return item;
        }
        return item.name;
      })
      .join(" ");
  };

  const handleSave = () => {
    // Reset result after saving
    setResult(null);
  };

  return (
    <Stack gap="sm" h="100%">
      <Text mb="lg">
        Type to show suggestions. Use operators (+, -, *, /, ^, (, )) between tags. Press Enter to
        evaluate the formula.
      </Text>

      <Box mb="xl">
        <FormulaInput
          placeholder="Type to start a formula..."
          onChange={setFormula}
          onEvaluate={setResult}
        />
      </Box>

      <Group mb="md">
        <SaveEvaluationModal onSave={handleSave} />
      </Group>

      {formula.length > 0 && (
        <Box mb="md">
          <Text fw={500}>Current Formula:</Text>
          <Code block>{formatFormula(formula)}</Code>
        </Box>
      )}

      {result !== null && (
        <Box mb="xl">
          <Text fw={500}>Result:</Text>
          <Code color="green" block>
            {result}
          </Code>
        </Box>
      )}

      <Divider my="lg" />

      <EvaluationTable />
    </Stack>
  );
}
