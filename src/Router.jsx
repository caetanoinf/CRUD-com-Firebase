import { useCallback, useState } from "react";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { useAuth } from "./hooks/use-auth";
import { Home } from "./pages/Home";

export function Router() {
  const { authenticatedUser } = useAuth();
  const [page, setPage] = useState("signin");

  const navigate = useCallback((page) => {
    setPage(page);
  }, []);

  if (authenticatedUser) {
    return <Home navigate={navigate} />;
  }

  switch (page) {
    case "signin":
      return <SignIn navigate={navigate} />;
    case "signup":
      return <SignUp navigate={navigate} />;
    case "home":
      return <Home navigate={navigate} />;
    default:
      return null;
  }
}
