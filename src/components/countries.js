import React from "react";
import axios from "axios";
import {useState, useEffect} from "react";

const CountryElement = ({el}) => {
    return (
        <div>
            <div>{el.name.official}</div>
            <img src={el.flags.png} />
        </div>
    );

}

const CountriesRender = ({countriesList, showHandler}) => {

    if (countriesList.length > 10) {
        return (<div>too many countries</div>);
    } else if (countriesList.length > 1) {
        return (
            <div>
                {countriesList.map(el =>
                    (
                        <div key={el.ccn3}>
                            {el.name.official}
                            <button onClick={() => showHandler(el.name.official)}>show</button>
                        </div>
                    )
                )}
            </div>
        );
    } else if (countriesList.length === 1) {
        return <CountryElement el={countriesList[0]} />
    } else {
        return (<div>no such countries</div>);
    }
}

const Countries = () => {
    const [countries, setCountries] = useState([]);
    const [loadStatus, setLoadStatus] = useState('Loading...');
    const [filterCountries, setFilterCountries] = useState('')

    useEffect(() => {
        axios
            .get("https://restcountries.com/v3.1/all")
            .then(response => {
                setCountries(response.data)
                setLoadStatus('')
            })
    }, [])

    const showCountries = countries.filter(el => el.name.official.toLowerCase().includes(filterCountries.toLowerCase()));

    const filterHandle = (event) => setFilterCountries(event.target.value)

    const showHandler = (countryShowName) => {
        console.log(countryShowName);
        setFilterCountries(countryShowName);
    }

    return (

        <div>
            <div>
                Find countries: <input value={filterCountries} onChange={filterHandle} />
            </div>
            <div>
                <b>{loadStatus}</b>
                <CountriesRender countriesList={showCountries} showHandler={showHandler} />
            </div>
        </div>

    )
}

export default Countries;