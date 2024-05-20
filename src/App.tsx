import { useEffect, useState } from 'react';
import './App.css';
import { CountriesPage } from './Countries';
import { Moon } from 'lucide-react';
import { CountriesContext } from './Helpers/Context/CountriesContext';
import { Countries } from "./Helpers/Models/CountriesModel"

const getCountriesUrl = "https://restcountries.com/v3.1/all?fields=name,flags,capital,region,population,tld,subregion,languages,cca3,borders"

export default function App() {
  const [isDarkMode, setDarkMode] = useState(false);
  const [countries, setCountries] = useState<Countries[]>([]);

  useEffect(() => {
    getAllCountries();
  }, [])

  async function getAllCountries() {
    const result = await fetch(getCountriesUrl)
    const data = await result.json()
    setCountries(data)
  }

  const Topbar = () => {
    const toggleTheme = () => {
      setDarkMode(!isDarkMode)
    }

    return (
      <div className={"topbar" + (isDarkMode ? " darkModeTopbar" : "")}>
        <div className='pageTitle'>Where in the world?</div>
        <div className='themeButtonContainer'>
          <span className='themeIcon'><Moon size={18} /> </span>
          <button
            className={"themeButton" + (isDarkMode ? " darkMode" : "")}
            onClick={toggleTheme}>
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={"appContainer" + (isDarkMode ? " darkMode" : "")}>
      <CountriesContext.Provider value={{ countries: countries, isDarkMode: isDarkMode }}>
        <Topbar />
        <CountriesPage />
      </CountriesContext.Provider>
    </div>
  );
}
