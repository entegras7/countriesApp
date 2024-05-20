import React from "react";
import { Countries } from "../Models/CountriesModel";

type CountriesContextType = {
    countries: Countries[];
    isDarkMode: boolean;
}

const defaultContextValue = {
    countries: [],
    isDarkMode: false,
}

export const CountriesContext = React.createContext<CountriesContextType>(defaultContextValue)