import { Dispatch, SetStateAction, useContext } from 'react';
import './CountriesModal.css'
import { CountriesContext } from '../Helpers/Context/CountriesContext';
import { ArrowLeft } from 'lucide-react';

type CountryModalPropType = {
    selectedCountryName: string
    setSelectedCountryName: Dispatch<SetStateAction<string | undefined>>
}

export default function CountriesModal(props: CountryModalPropType) {

    const { selectedCountryName, setSelectedCountryName } = props;
    const { countries, isDarkMode } = useContext(CountriesContext)
    const selectedCountry = countries.find(item => item.name.common === selectedCountryName);
    const borderCountries: any[] = []
    countries.forEach(item => {
        if (selectedCountry?.borders.includes(item.cca3)) { borderCountries.push(item.name.common) }
    })
    const currencies = ["India", "Pakistan", "Afganistan"]
    const languages = ["India", "Pakistan", "Afganistan"]

    const BackButton = () => {
        return (
            <div
                onClick={() => { setSelectedCountryName("") }}
                className={"buttonContainer" + (isDarkMode ? " darkModeElements" : "")}>
                <span><ArrowLeft size={18} /> </span>
                <button className={"themeButton" + (isDarkMode ? " darkModeElements" : "")}>Back</button>
            </div>
        )
    }

    const selectBorderCountry = (item: string) => {
        setSelectedCountryName(item);
    }

    const RenderBorderCountries = () => {
        return (
            <div className='borderCountriesContainer'>
                <span className='subHeading'>Border Countries: </span>
                <span>{borderCountries.map((item) => {
                    return (
                        <button
                            key={item}
                            onClick={() => { selectBorderCountry(item) }}
                            className={"borderButton" + (isDarkMode ? " darkModeElements" : "")}>
                            {item}
                        </button>
                    )
                })}</span>
            </div>
        )
    }

    const SelectedCountryDetail = () => {
        return (
            <div className="country-detail">
                <h2>{selectedCountry?.name.common}</h2>
                <div className='flexContainer'>
                    <span className='flexItem'>
                        <span className='subHeading'>Native Name: </span>
                        <span>{selectedCountry?.name.official}</span>
                    </span>
                    <span>
                        <span className='subHeading'>Top Level Domain: </span>
                        <span>{selectedCountry?.tld}</span>
                    </span>
                </div>
                <div className='flexContainer'>
                    <span className='flexItem'>
                        <span className='subHeading'>Population: </span>
                        <span>{selectedCountry?.population}</span>
                    </span>
                    <span>
                        <span className='subHeading'>Currncies: </span>
                        <span>{currencies.map(item => { return `${item}, ` })}</span>
                    </span>
                </div>
                <div className='flexContainer'>
                    <span className='flexItem'>
                        <span className='subHeading'>Region: </span>
                        <span>{selectedCountry?.region}</span>
                    </span>
                    <span>
                        <span className='subHeading'>Languages: </span>
                        <span>{languages.map(item => { return `${item}, ` })}</span>
                    </span>
                </div>
                <div className='flexContainer'>
                    <span className='flexItem'>
                        <span className='subHeading'>Sub Region: </span>
                        <span>{selectedCountry?.subregion}</span>
                    </span>
                </div>
                <div className='flexContainer'>
                    <span className='flexItem'>
                        <span className='subHeading'>Capital: </span>
                        <span>{selectedCountry?.capital}</span>
                    </span>
                </div>
                <div>
                    <RenderBorderCountries />
                </div>
            </div>

        )
    }

    const SelectedCountryDetailContainer = () => {
        return (
            <div className="countrydetailContainer">
                <img className="selectedCountryImage" src={selectedCountry?.flags.png} alt={selectedCountry?.name.common} />
                <SelectedCountryDetail />
            </div>
        );
    }

    return (
        <div className={"modalContainer" + (isDarkMode ? " darkMode" : "")}>
            <BackButton />
            <SelectedCountryDetailContainer />
        </div>
    );
}