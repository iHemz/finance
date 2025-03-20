import { Tag } from "@/app/store/formulaStore";
import { ActionIcon, Menu } from "@mantine/core";
import React, { useState } from "react";

interface TagComponentProps {
  tag: Tag;
  onDelete: () => void;
}

export const TagComponent: React.FC<TagComponentProps> = ({ tag, onDelete }) => {
  const [menuOpened, setMenuOpened] = useState(false);

  // Determine tag color based on type
  const getTagColor = () => {
    switch (tag.type) {
      case "variable":
        return "blue";
      case "function":
        return "green";
      case "constant":
        return "orange";
      default:
        return "gray";
    }
  };

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        backgroundColor: getTagColor(),
        color: "white",
        borderRadius: "4px",
        padding: "2px 4px",
        margin: "0 2px",
        fontSize: "14px",
        cursor: "default",
        userSelect: "none",
        position: "relative",
      }}
    >
      <span>{tag.label}</span>

      {/* Dropdown menu */}
      <Menu
        opened={menuOpened}
        onChange={setMenuOpened}
        position="bottom-end"
        shadow="md"
        width={200}
        withArrow
      >
        <Menu.Target>
          <ActionIcon
            size="xs"
            variant="transparent"
            color="white"
            onClick={() => setMenuOpened(true)}
            style={{ marginLeft: "4px" }}
          >
            ▼
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Tag Options</Menu.Label>
          <Menu.Item>View Details</Menu.Item>
          <Menu.Item>Edit Value</Menu.Item>
          <Menu.Item color="red" onClick={onDelete}>
            Remove
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
};
