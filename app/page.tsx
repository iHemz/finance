"use client";

import { FormulaInput } from "@/app/components/FormulaInput";
import { Tag } from "@/app/store/formulaStore";
import { Box, Code, Container, Text, Title } from "@mantine/core";
import { useState } from "react";

export default function Home() {
  const [result, setResult] = useState<number | null>(null);
  const [formula, setFormula] = useState<(Tag | string)[]>([]);

  // Format the formula for display
  const formatFormula = (formula: (Tag | string)[]) => {
    return formula
      .map(item => {
        if (typeof item === "string") {
          return item;
        }
        return item.label;
      })
      .join(" ");
  };

  return (
    <Container size="md" py="xl">
      <Title order={1} mb="md">
        Causal-Style Formula Input
      </Title>

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

      {formula.length > 0 && (
        <Box mb="md">
          <Text fw={500}>Current Formula:</Text>
          <Code block>{formatFormula(formula)}</Code>
        </Box>
      )}

      {result !== null && (
        <Box>
          <Text fw={500}>Result:</Text>
          <Code color="green" block>
            {result}
          </Code>
        </Box>
      )}
    </Container>
  );
}
