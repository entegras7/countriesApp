import React, { useContext, useEffect, useRef, useState } from "react"
import { CountriesContext } from "../Helpers/Context/CountriesContext";
import { Countries } from "../Helpers/Models/CountriesModel"
import './index.css'
import CountriesCard from "../Components/CountriesCard";
import CountriesModal from "../Components/CountriesModal";
import { Search } from 'lucide-react';

export const CountriesPage: React.FC = () => {

    const { countries,isDarkMode } = useContext(CountriesContext);
    const [countriesToShow, setCountriesToShow] = useState<Countries[]>(countries)
    const [regionsList, setRegionsList] = useState<String[]>([]);
    const [query, setQuery] = useState<string>("");
    const [selectedCountryName, setSelectedCountryName] = useState<string>()

    const searchInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setCountriesToShow(countries);
        const uniqueRegions: String[] = [];

        countries.forEach(item => {
            if (!uniqueRegions.includes(item.region)) {
                uniqueRegions.push(item.region);
            }
        })
        setRegionsList(uniqueRegions);

    }, [countries])

    useEffect(() => {
        if (searchInputRef.current && document.activeElement !== searchInputRef.current) {
            searchInputRef.current.focus();
        }
    });

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if(event.target.value===""){
            setCountriesToShow(countries);
            return;
        }
        setCountriesToShow(countries.filter((item) => { return (item.region === event.target.value) }))
    }

    const debounce = (func: Function, delay: number) => {
        let timeoutId: ReturnType<typeof setTimeout>;
        return (...args: any[]) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func(...args);
            }, delay);
        };
    };

    const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        debouncedSearch(value);
    };

    const debouncedSearch = debounce((value: string) => {
        setQuery(value)
        setCountriesToShow(countries.filter(country =>
            country.name.common.toLowerCase().includes(value.toLowerCase())
        ));
    }, 400);


    const ActionsContainer = () => {
        return (
            <div className="actionsContainer">
                <div className="searchContainer">
                    <Search size={18} className="searchicon"/>
                    <input
                        ref={searchInputRef}
                        type="text"
                        value={query}
                        onChange={handleChangeSearch}
                        placeholder="Search for Country"
                        className={"searchbar" + (isDarkMode ? " darkModeElements" : "")}
                    />
                </div>
                <select className={isDarkMode?"darkModeElements":""} onChange={handleSelectChange}>
                    <option value="">Filter by Region</option>
                    {regionsList.map((item) => {
                        return <option key={`${item}_region`}>{item}</option>
                    })}
                </select>
            </div>
        )
    }

    const SelectCountry = (name: string) => {
        setSelectedCountryName(name)
    }

    const CountriesTabs = () => {
        return (
            <div className="container">
                {countriesToShow.map((item) => {
                    return (
                        <CountriesCard
                            selectCountry={SelectCountry}
                            key={`${item.name.common}_card`}
                            flags={item.flags}
                            name={item.name.common}
                            population={item.population}
                            capital={item.capital}
                            region={item.region}
                        />
                    )
                })}
            </div>
        )
    }

    return (
        <div className="countriesPageContainer">
            {!selectedCountryName && <ActionsContainer />}
            {!selectedCountryName && <CountriesTabs />}
            {selectedCountryName && <CountriesModal selectedCountryName={selectedCountryName}
                setSelectedCountryName={setSelectedCountryName} />}
        </div>
    );
}