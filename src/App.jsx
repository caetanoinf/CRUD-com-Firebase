import { CircularProgress, Container } from "@mui/material";
import { Router } from "./Router";
import { useAuth } from "./hooks/use-auth";

export default function App() {
  const { authenticating } = useAuth();

  return (
    <Container maxWidth="md" sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Main authenticating={authenticating} />
    </Container>
  );
}

function Main({ authenticating }) {
  if (authenticating) {
    return <CircularProgress size={100} />;
  }

  return <Router />;
}
