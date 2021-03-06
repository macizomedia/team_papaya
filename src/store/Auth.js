import React, { useReducer } from "react";
import { AuthReducer, initialState } from "./reducer";

export const AuthContext = React.createContext();
export const AuthDispatchContext = React.createContext();


export function useAuthState() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthState must be used within a AuthProvider");
  }
  return context;
}

export function useAuthDispatch() {
  const context = React.useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error("useAuthDispatch must be used within a AuthProvider");
  }

  return context;
}

export const AuthProvider = ({ children }) => {
  const [currentUser, dispatch] = useReducer(AuthReducer, initialState);
  return (
    <AuthContext.Provider value={{ currentUser }}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
};
