import { useFormulaStore } from "@/app/store/formulaStore";
import { Button, Group, Modal, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";

interface SaveEvaluationModalProps {
  onSave?: () => void;
}

export const SaveEvaluationModal = ({ onSave }: SaveEvaluationModalProps) => {
  const [opened, setOpened] = useState(false);
  const { saveEvaluation, clearFormula } = useFormulaStore();

  const form = useForm({
    initialValues: {
      name: "",
    },
    validate: {
      name: value => (value.trim().length === 0 ? "Variable name is required" : null),
    },
  });

  const handleSubmit = (values: { name: string }) => {
    saveEvaluation(values.name);
    form.reset();
    setOpened(false);
    if (onSave) onSave();
    clearFormula();
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Save as Variable"
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Variable Name"
            placeholder="e.g. Total Revenue"
            {...form.getInputProps("name")}
            mb="md"
            data-autofocus
          />
          <Group justify="flex-end">
            <Button variant="outline" onClick={() => setOpened(false)}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </Group>
        </form>
      </Modal>

      <Button onClick={() => setOpened(true)}>Save as Variable</Button>
    </>
  );
};
