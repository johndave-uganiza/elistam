import { createContext } from "react";

const AuthContext = createContext(null);

function AuthState({ children }) {
  return <AuthContext.Provider> {children} </AuthContext.Provider>;
}

export { AuthState };
