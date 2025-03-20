import { ActionIcon, Menu } from "@mantine/core";
import { forwardRef, useState } from "react";

interface TagComponentProps {
  tag: Suggestion;
  onDelete: () => void;
}

export const TagComponent = forwardRef<HTMLDivElement, TagComponentProps>(
  ({ tag, onDelete }, ref) => {
    const [menuOpened, setMenuOpened] = useState(false);

    return (
      <div
        ref={ref}
        style={{
          display: "inline-flex",
          alignItems: "center",
          backgroundColor: "#0050ff",
          color: "white",
          borderRadius: "2px",
          padding: "2px 8px",
          margin: "0 2px",
          fontSize: "14px",
          fontWeight: 500,
          cursor: "default",
          userSelect: "none",
          position: "relative",
        }}
      >
        <span>{tag.name}</span>

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
            <Menu.Label>Variable Options</Menu.Label>
            <Menu.Item>View Details</Menu.Item>
            <Menu.Item>Edit Value</Menu.Item>
            <Menu.Item color="red" onClick={onDelete}>
              Remove
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    );
  }
);
