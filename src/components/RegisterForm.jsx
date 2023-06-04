import { useState } from "react";

import { Alert, Stack, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";

export function RegisterForm({ onSubmit, isError, isLoading, error }) {
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const hasPassword = password.length > 0 && passwordConfirm.length > 0;
  const isPasswordConfirmed = password === passwordConfirm;

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onSubmit({ name, email, password });
  };

  return (
    <Stack direction="column" spacing={2} component="form" onSubmit={handleSubmit}>
      <TextField label="Nome" error={isError} name="name" type="text" required value={name} onChange={(evt) => setName(evt.target.value)} />

      <TextField
        label="Email"
        error={isError}
        name="email"
        type="email"
        required
        value={email}
        onChange={(evt) => setEmail(evt.target.value)}
      />

      <TextField
        label="Senha"
        error={isError}
        name="password"
        type="password"
        required
        value={password}
        onChange={(evt) => setPassword(evt.target.value)}
      />

      <TextField
        label="Confirmar Senha"
        error={isError || (hasPassword && !isPasswordConfirmed)}
        name="password-confirm"
        type="password"
        required
        value={passwordConfirm}
        helperText={hasPassword && !isPasswordConfirmed ? "As senhas não conferem" : null}
        onChange={(evt) => setPasswordConfirm(evt.target.value)}
      />

      <LoadingButton loading={isLoading} type="submit" variant="contained">
        Cadastrar
      </LoadingButton>

      {isError ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error.message}
        </Alert>
      ) : null}
    </Stack>
  );
}
