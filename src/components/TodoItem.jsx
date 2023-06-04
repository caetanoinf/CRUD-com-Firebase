import { Check, Delete, Edit } from "@mui/icons-material";
import { IconButton, InputBase, ListItem, ListItemSecondaryAction, ListItemText } from "@mui/material";
import { useEffect, useRef, useState } from "react";

function formatTimestamp(timestamp) {
  return Intl.DateTimeFormat("pt-BR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(timestamp.toDate());
}

function TodoTitle({ isEditing, value, onChange }) {
  const titleInputRef = useRef();

  useEffect(() => {
    if (isEditing) {
      titleInputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <InputBase
      inputRef={titleInputRef}
      value={value}
      onChange={(evt) => onChange(evt.target.value)}
      fullWidth
      inputProps={{
        sx: {
          borderRadius: 1,
          border: "2px solid transparent",
          "&:not(:read-only)": {
            backgroundColor: "grey.200",
          },
          "&:focus:not(:read-only)": {
            borderColor: "primary.main",
          },
        },
      }}
      readOnly={!isEditing}
    />
  );
}

export function TodoItem({ todo, onDelete, onEdit }) {
  const [title, setTitle] = useState(todo.title);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    onEdit(todo, { title });
    setIsEditing(false);
  };

  return (
    <ListItem key={todo.id} sx={{ pr: 13 }}>
      <ListItemText
        primary={<TodoTitle value={title} onChange={setTitle} isEditing={isEditing} />}
        secondary={formatTimestamp(todo.timestamp)}
      />

      <ListItemSecondaryAction>
        {isEditing ? (
          <IconButton edge="end" aria-label="edit" sx={{ marginRight: 1 }} onClick={handleSave}>
            <Check />
          </IconButton>
        ) : (
          <IconButton edge="end" aria-label="edit" sx={{ marginRight: 1 }} onClick={() => setIsEditing(true)}>
            <Edit />
          </IconButton>
        )}

        <IconButton edge="end" aria-label="delete" onClick={() => onDelete(todo)}>
          <Delete />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
