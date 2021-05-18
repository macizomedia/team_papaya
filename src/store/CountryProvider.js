import React from "react";
import { useReducer } from "react";
import { CountryReducer, initialState } from "./reducer";

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

export function CountryProvider ({ children }) {
    const [currentUser, dispatch] = useReducer(CountryReducer, initialState);

    return (
<<<<<<< HEAD:src/store/CountryCtx.js
        <CountryContext.Provider value={{ dreamList, dispatch }}>
            <useCountryDispatch.Provider value={dispatch}>
                {children}
            </useCountryDispatch.Provider>
=======
        <CountryContext.Provider value={{ currentUser }}>
            <CountryDispatchContext.Provider value={dispatch}>
                {children}
            </CountryDispatchContext.Provider>
>>>>>>> 89af03eaf99b658d0f3c6384e6a83a84b4e01b6c:src/store/CountryProvider.js
        </CountryContext.Provider>
    );
};
