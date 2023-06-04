import { LoadingButton } from "@mui/lab";
import { Stack, TextField } from "@mui/material";
import { useState } from "react";

export function TodoForm({ onSubmit, isLoading }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit({ title });
    setTitle("");
  };

  return (
    <Stack direction="row" component="form" onSubmit={handleSubmit} spacing={2}>
      <TextField sx={{ flex: 1 }} label="Nova Tarefa" value={title} onChange={(evt) => setTitle(evt.target.value)} required />

      <LoadingButton loading={isLoading} type="submit" variant="contained">
        Adicionar
      </LoadingButton>
    </Stack>
  );
}
