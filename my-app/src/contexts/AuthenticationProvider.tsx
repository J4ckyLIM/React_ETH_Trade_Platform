import { signInWithEmailAndPassword, User, UserCredential, signOut } from "firebase/auth";
import { createContext, useCallback, useEffect, useMemo, useState } from "react"

import { auth } from "../config/firebase/firebase";

interface AuthenticationConfig {
  user: User | null;
  userCredentials: UserCredential | null;
  token: string | null;
  login: ({ email, password }: { email: string, password: string }) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthenticationContext = createContext<AuthenticationConfig>({
  user: null,
  userCredentials: null,
  token: null,
  login: async () => {},
  logout: async () => {},
});

export const AuthenticationProvider = ({ children }: { children: any }) => {
  const firebaseAuth = auth;
  const [user, setUser] = useState<User | null>(null);
  const [userCredentials, setUserCredentials] = useState<UserCredential | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const storeToken = useCallback((token: string) => {
    setToken(token);
    window.localStorage.setItem('token', token);
  }, [setToken]);

  const login = useCallback(async ({ email, password } : { email: string, password: string }) => {
    const credentials = await signInWithEmailAndPassword(firebaseAuth, email, password);
    setUserCredentials(credentials);
    setUser(credentials.user);
    Promise.resolve();
  }, [firebaseAuth]);

  const getToken = useCallback(async () => {
    const token = await firebaseAuth.currentUser?.getIdToken();
    if(token) {
      storeToken(token);
    }
  }, [firebaseAuth, storeToken]);

  const logout = useCallback(async () => {
    await signOut(firebaseAuth);
  }, [firebaseAuth]);

  useEffect(() => {
    const fetchToken = async () => {
      await getToken();
    }
    fetchToken();
  }, [getToken]);

  const contextValues = useMemo(() => {
    return {
      user,
      userCredentials,
      token,
      login,
      logout,
    };
  }, [user, userCredentials, token, login, logout]);

  return (
    <AuthenticationContext.Provider value={contextValues}>
      {children}
    </AuthenticationContext.Provider>
  )
}