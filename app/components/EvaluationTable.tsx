import { useFormulaStore } from "@/app/store/formulaStore";
import { Box, Button, Table, Text, Title } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

export const EvaluationTable = () => {
  const { evaluations, deleteEvaluation } = useFormulaStore();

  if (evaluations.length === 0) {
    return (
      <Box mb="xl">
        <Title order={3} mb="md">
          Variables
        </Title>
        <Text color="dimmed">No variables have been saved yet.</Text>
      </Box>
    );
  }

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

  return (
    <Box mb="xl">
      <Title order={3} mb="md">
        Variables
      </Title>
      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Variable Name</Table.Th>
            <Table.Th>Formula</Table.Th>
            <Table.Th>Value</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {evaluations.map(evaluation => (
            <Table.Tr key={evaluation.id}>
              <Table.Td>
                <Text fw={500}>{evaluation.name}</Text>
              </Table.Td>
              <Table.Td>{formatFormula(evaluation.formula)}</Table.Td>
              <Table.Td>{evaluation.value !== null ? evaluation.value : "Error"}</Table.Td>
              <Table.Td>
                <Button
                  variant="outline"
                  color="red"
                  size="xs"
                  onClick={() => deleteEvaluation(evaluation.id)}
                >
                  <IconTrash size={16} />
                </Button>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Box>
  );
};
