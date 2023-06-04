import { useCallback } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useSession } from "../contexts";

export function useAuth() {
  const session = useSession();

  const signIn = useCallback(({ email, password }) => {
    return signInWithEmailAndPassword(auth, email, password);
  });

  const signUp = useCallback(async ({ email, password, name }) => {
    const response = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(response.user, { displayName: name });
    return response;
  });

  const signOut = useCallback(() => {
    return auth.signOut();
  });

  return {
    authenticating: session.authenticating,
    authenticatedUser: session.authenticatedUser,
    signIn,
    signUp,
    signOut,
  };
}
