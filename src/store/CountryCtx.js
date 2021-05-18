import React from "react";
import { useState, useReducer } from "react";
import { CountryReducer, initialState } from "./reducer";

export const CountryContext = React.createContext();
export const CountryDispatchContext = React.createContext();

export function useCountryState() {
    const context = React.useContext(CountryContext);
    if (context === undefined) {
        throw new Error("useAuthState must be used within a AuthProvider");
    }
    return context;
}

export function useCountryDispatch() {
    const context = React.useContext(CountryDispatchContext);
    if (context === undefined) {
        throw new Error("useAuthDispatch must be used within a AuthProvider");
    }

    return context;
}

export const CountryProvider = ({ children }) => {
    const [dreamList, dispatch] = useReducer(CountryReducer, initialState);

    return (
        <CountryContext.Provider value={{ dreamList, dispatch }}>
            <useCountryDispatch.Provider value={dispatch}>
                {children}
            </useCountryDispatch.Provider>
        </CountryContext.Provider>
    );
};
