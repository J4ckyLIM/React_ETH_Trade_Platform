import { useContext } from "react";
import { AuthenticationContext } from "../contexts";

export const useAuthentication = () => {
  const { user, userCredentials, token, login, logout } = useContext(AuthenticationContext);
  return {
    user,
    userCredentials,
    token,
    login,
    logout
  }
}