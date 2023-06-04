import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";

const SessionContext = createContext({ authenticatedUser: null, authenticating: true });

export function SessionProvider({ children }) {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const [authenticating, setAuthenticating] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setAuthenticating(false);
      setAuthenticatedUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return <SessionContext.Provider value={{ authenticatedUser, authenticating }}>{children}</SessionContext.Provider>;
}

export function useSession() {
  return useContext(SessionContext);
}
