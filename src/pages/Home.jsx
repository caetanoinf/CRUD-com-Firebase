import { useMutation, useQuery } from "react-query";
import { useTodos } from "../hooks/use-todos";
import { Box, Button, Stack, Typography } from "@mui/material";
import { TodoForm, TodosList } from "../components";
import { useAuth } from "../hooks/use-auth";

export function Home({ navigate }) {
  const { authenticatedUser, signOut } = useAuth();
  const { getTodos, createTodo, deleteTodo, updateTodo } = useTodos();

  const todos = useQuery("todos", getTodos);
  const createTodoMutation = useMutation(createTodo);

  const handleAddTodo = async (todo) => {
    await createTodoMutation.mutateAsync(todo);
    todos.refetch();
  };

  const handleDeleteTodo = async (id) => {
    await deleteTodo(id);
    todos.refetch();
  };

  const handleEdit = async (todo, changes) => {
    await updateTodo(todo.id, changes);
    todos.refetch();
  };

  const handleLogout = async () => {
    await signOut();
    navigate("signin");
  };

  return (
    <Stack direction="column" alignItems="center" flex="1" spacing={6} height="100%" py={6}>
      <Box>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="caption">👋 Bem-vindo {authenticatedUser?.email}!</Typography>
          <Button variant="text" size="small" onClick={handleLogout}>
            Sair da conta
          </Button>
        </Stack>
        <Typography variant="h2">Minha lista de tarefas</Typography>
      </Box>

      <Stack width="100%" spacing={4} flex={1}>
        <TodoForm onSubmit={handleAddTodo} {...createTodoMutation} />

        <Box sx={{ flex: 1 }}>
          {todos.isLoading && <Typography variant="subtitle1">Carregando...</Typography>}
          {todos.isError && <Typography variant="subtitle1">Ocorreu um erro ao carregar os dados</Typography>}
          {todos.isSuccess && <TodosList todos={todos.data} onDelete={handleDeleteTodo} onEdit={handleEdit} />}
        </Box>
      </Stack>
    </Stack>
  );
}
