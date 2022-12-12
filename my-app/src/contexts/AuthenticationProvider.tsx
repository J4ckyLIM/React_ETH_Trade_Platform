import { signInWithEmailAndPassword, User, UserCredential, signOut } from "firebase/auth";
import { createContext, useCallback, useEffect, useMemo, useState } from "react"

import { auth } from "../config/firebase/firebase";
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  const storeToken = useCallback((token: string) => {
    setToken(token);
    window.localStorage.setItem('token', token);
  }, [setToken]);

  const login = useCallback(async ({ email, password } : { email: string, password: string }) => {
    const credentials = await signInWithEmailAndPassword(firebaseAuth, email, password);
    setUserCredentials(credentials);
    setUser(credentials.user);
    navigate('/');
    Promise.resolve();
  }, [firebaseAuth,navigate]);

  const getToken = useCallback(async () => {
    const token = await firebaseAuth.currentUser?.getIdToken();
    if(token) {
      storeToken(token);
    }
  }, [firebaseAuth, storeToken]);

  const logout = useCallback(async () => {
    await signOut(firebaseAuth);
  }, [firebaseAuth]);

  const getCurrentUser = useCallback(async () => {
    const user = firebaseAuth.currentUser;
    if(user) {
      setUser(user);
      navigate('/');
    } else {
      navigate('/authentication');
    }
  }, [firebaseAuth, navigate]);

  useEffect(() => {
    const fetchToken = async () => {
      await getToken();
    }
    fetchToken();
  }, [getToken]);

  useEffect(() => {
    const fetchUser = async () => {
      await getCurrentUser();
    }
    fetchUser();
  }, [getCurrentUser])

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