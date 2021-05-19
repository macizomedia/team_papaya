import React from "react";
import { useReducer } from "react";
import { CountryReducer, initialState } from "./reducer";

let list = initialState.list

export const CountryContext = React.createContext();
export const CountryDispatchContext = React.createContext();

export function useCountryState() {
    const context = React.useContext(CountryContext);
    if (context === undefined) {
        throw new Error("Not country Context");
    }
    return context;
}

export function useCountryDispatch() {
    const context = React.useContext(CountryDispatchContext);
    if (context === undefined) {
        throw new Error("Not Country Context!!!");
    }

    return context;
}

export function CountryProvider({ children }) {
    const [currentList, dispatch] = useReducer(CountryReducer, list);

    return (
        <CountryContext.Provider value={{ currentList }}>
            <CountryDispatchContext.Provider value={dispatch}>
                {children}
            </CountryDispatchContext.Provider>
        </CountryContext.Provider>
    );
}
