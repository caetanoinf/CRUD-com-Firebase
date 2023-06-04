import { Button, Container, Link, Stack, Typography } from "@mui/material";
import { LoginForm } from "../components";
import { useAuth } from "../hooks/use-auth";
import { useMutation } from "react-query";

export function SignIn({ navigate }) {
  const auth = useAuth();

  const signInMutation = useMutation((credentials) => auth.signIn(credentials), {
    onSuccess: () => {
      navigate("home");
    },
  });

  const handleSubmit = ({ email, password }) => {
    signInMutation.mutate({ email, password });
  };

  return (
    <Container maxWidth="sm">
      <Stack direction="column" flex="1" spacing={2}>
        <Typography variant="h2">Entrar na sua conta</Typography>

        <Typography variant="subtitle1">Informe suas credenciais para continuar</Typography>

        <LoginForm onSubmit={handleSubmit} {...signInMutation} />

        <Button variant="text" component={Link} onClick={() => navigate("signup")}>
          Não tem uma conta? Cadastre-se
        </Button>
      </Stack>
    </Container>
  );
}
