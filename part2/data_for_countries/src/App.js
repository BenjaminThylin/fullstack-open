import { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const FullCountry = (props) => {
  const [weatherData, setWeatherData] = useState()
  let country = props.country

  useEffect(() => {
    const eventHandler = response => {
      setWeatherData(response.data)
    }

    const promise = axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}&units=metric`)
    promise.then(eventHandler)
  }, [country.capital])

  if (!weatherData) return <p>Wait</p>

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <h3>Languages:</h3>
      {Object.keys(country.languages).map((keyLanguageCode, index) => <li key={index}>{country.languages[keyLanguageCode]}</li>)}
      <br/>
      <img alt="Country flag" src={country.flags['png']}></img>
      <h3>Weather in {country.capital}</h3>
      <p>Temperature : {weatherData.main.temp} Celsius</p>
      <img alt={`${country.capital} weather`} src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}></img>
      <p>Wind : {weatherData.wind.speed} m/s</p>
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