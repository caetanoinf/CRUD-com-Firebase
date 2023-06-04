import { Alert, List, Typography } from "@mui/material";
import { TodoItem } from "./TodoItem";

export function TodosList({ todos, onDelete, onEdit }) {
  const handleDelete = (todo) => {
    onDelete(todo.id);
  };

  const handleEdit = (todo, changes) => {
    onEdit(todo, changes);
  };

  if (!todos?.length) {
    return <Alert severity="info">Você ainda não tem tarefas cadastradas.</Alert>;
  }

  return (
    <List subheader={<Typography variant="h5">Suas tarefas</Typography>}>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onDelete={handleDelete} onEdit={handleEdit} />
      ))}
    </List>
  );
}
