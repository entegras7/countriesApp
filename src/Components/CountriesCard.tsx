import { useContext } from "react"
import { Flags } from "../Helpers/Models/CountriesModel"
import './CountriesCard.css'
import { CountriesContext } from "../Helpers/Context/CountriesContext"

type CardComponentPropType = {
    flags: Flags,
    name: string,
    population: string,
    region: string,
    capital: string[],
    selectCountry: (arg0: string) => void
}

export default function CountriesCard(props: CardComponentPropType) {

    const { flags, name, population, region, capital, selectCountry } = props
    const { isDarkMode } = useContext(CountriesContext);

    return (
        <div className={"countriesCard" + (isDarkMode ? " darkModeElements" : "")} onClick={() => { selectCountry(name) }}>
            <img className="flag" src={flags.png} alt={flags.alt} />
            <div className="infoContainer">
                <h3>{name}</h3>
                <div>
                    <span className="subheading">Popuation:</span>
                    <span>{population}</span>
                </div>
                <div>
                    <span className="subheading">Region:</span>
                    <span>{region}</span>
                </div>
                <div>
                    <span className="subheading">Capital:</span>
                    <span>{capital}</span>
                </div>
            </div>
        </div>
    )
}