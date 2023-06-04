import { Button, Container, Link, Stack, Typography } from "@mui/material";
import { useAuth } from "../hooks/use-auth";
import { useMutation } from "react-query";
import { RegisterForm } from "../components";

export function SignUp({ navigate }) {
  const auth = useAuth();

  const signUpMutation = useMutation((credentials) => auth.signUp(credentials), {
    onSuccess: () => {
      navigate("home");
    },
  });

  const handleSubmit = ({ email, password }) => {
    signUpMutation.mutate({ email, password });
  };

  return (
    <Container maxWidth="sm">
      <Stack direction="column" flex="1" spacing={2}>
        <Typography variant="h2">Cadastre-se</Typography>

        <Typography variant="subtitle1">Preencha os campos abaixo para criar sua conta</Typography>

        <RegisterForm onSubmit={handleSubmit} {...signUpMutation} />

        <Button variant="text" component={Link} onClick={() => navigate("signin")}>
          Já tem uma conta? Entre
        </Button>
      </Stack>
    </Container>
  );
}
