import { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
import axios from 'axios'

const FullCountry = (props) => {
  let country = props.country
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <h3>Languages:</h3>
      {Object.keys(country.languages).map((keyLanguageCode, index) => <li key={index}>{country.languages[keyLanguageCode]}</li>)}
      <br/>
      <img alt="Country flag" src={country.flags['png']}></img>
    </div>
  )
}

const CountryList = (props) => {
  let countries = props.countries
  let filterByName = props.filter

  return (
    <div>
      {countries.filter(filterByName).map((country, index) => {
        if (countries.filter(filterByName).length === 1) {
          return (
            <FullCountry key={index} country={country}></FullCountry>
          )
        } else if (countries.filter(filterByName).length <= 10) {
          return (
            <ul key={index}>
              <div id={index}>{country.name.common}</div>
              <ShowButton index={index} country={country}></ShowButton>
            </ul>
          )
        } else {
          return null
        }
      })}
    </div>
  )
}

const ShowButton = (props) => {
  const [isShow, setIsShow] = useState(true);

  const toggleAllData = (index, country) => {
    setIsShow(!isShow)

    if(isShow) {
      ReactDOM.render(
        <FullCountry key={index} country={country}></FullCountry>,
        document.getElementById(index)
      )
    } else {
      ReactDOM.render(
        <div id={index}>{country.name.common}</div>,
        document.getElementById(index)
      )
    }
  }

  return (
    <button onClick={() => toggleAllData(props.index, props.country)}>{isShow ? 'Show' : 'Hide'}</button>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filterValue, setFilterValue] = useState("")

  useEffect(() => {
    const eventHandler = response => {
      setCountries(response.data)
    }

    const promise = axios.get('https://restcountries.com/v3.1/all')
    promise.then(eventHandler)
  }, [])

  const handleCountries = (event) => {
    setFilterValue(event.target.value.toLowerCase())
  }

  const filterByName = (country) => {
    if (filterValue === "") {
      return ""
    }

    return country.name.common.toLowerCase().includes(filterValue)
  }

  return (
    <div>
      <h2>Find countries</h2>
      <p>Filter by name</p>
      <input onChange={handleCountries}></input>
      <CountryList countries={countries} filter={filterByName}></CountryList>
      {countries.filter(filterByName).length > 10 ? <p>Be more specific</p> : null}
    </div>
  )
}

export default App