import { useState, useEffect } from 'react'
import services from './services'

const Filter = (props) => {
  return (
    <div>
      <p>Filter by name</p>
        <input onChange={props.onChange}></input>
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.onSubmitHandler}>
      <div>
        Name:
        <input onChange={props.nameOnChange}/>
      </div>
      <div>
        Number:
        <input onChange={props.numberOnChange}/>
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  )
}

const Person = (props) => {
  return <li>{props.person.name} {props.person.number} <button onClick={props.onClickHandle}>Delete</button></li>
}

const Notification = ({visibility, isError, message}) => {
  let isVisible = visibility
  if (message === null || message === "") {
    isVisible = false
  }

  const notificationStyle = {
    color: isError ? "red" : "green",
    fontSize: "20px",
    backgroundColor: "lightgrey",
    padding: "15px 20px",
    border: isError ? "3px solid red" : "3px solid green",
    borderRadius: "5px",
    display: isVisible ? "inline-block" : "none"
  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [filterValue, setFilterValue] = useState("")
  const [newPerson, setNewPerson] = useState({name: "", number: ""})
  const [notificationMessage, setNotificationMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const [notificationVisibility, setNotificationVisibility] = useState(false)

  useEffect(() => {
    services
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const notificationHandler = (isError, message) => {
    setNotificationMessage(message)
    setIsError(isError)
    setNotificationVisibility(true)
    setTimeout(() => {
      setNotificationVisibility(false)
    }, 3000);
  }

  const addPerson = (event) => {
    event.preventDefault()
    let tempPerson = {name: newPerson.name, number: newPerson.number}

    if (persons.some(person => person.name === newPerson.name)) {
      let existingPerson = persons.filter(person => {
        return person.name === newPerson.name
      })[0]

      if (existingPerson.number === newPerson.number) {
        notificationHandler(true, "Person already in the phonebook")
      } else if (window.confirm(`${existingPerson.name} is already added to the phonebook, replace the old number with the new one?`)) {
        services
        .update(existingPerson.id, newPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
          notificationHandler(false, `Number for ${existingPerson.name} has been updated`)
        })
        .catch(error => {
          notificationHandler(true, `Information of ${existingPerson.name} has already been deleted`)
          setPersons(persons.filter(p => p.id !== existingPerson.id))
        })
      }
    } else {
      //Add to server
      services
      .create(tempPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        notificationHandler(false, `Added ${returnedPerson.name}`)
      })
      .catch(error => {
        notificationHandler(true, error.response.data)
      })
    }
  }

  const removePerson = (person) => {
    if (window.confirm(`Do you really want to remove ${person.name}?`)) {
      services
      .deleteSingle(person.id)
      .then(
        setPersons(persons.filter(p => p.id !== person.id))
      )
    }
  }

  const filterByName = (person) => {
    if (filterValue === "") {
      return person
    }

    return person.name.toLowerCase().includes(filterValue)
  }

  const updatePhonebookOnChange = (event) => {
    setFilterValue(event.target.value.toLowerCase())
  }

  const handleNameOnChange = (event) => {
    let tempPerson = {name: event.target.value, number: newPerson.number}
    setNewPerson(tempPerson)
  }

  const handleNumberOnChange = (event) => {
    let tempPerson = {name: newPerson.name, number: event.target.value}
    setNewPerson(tempPerson)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification visibility={notificationVisibility} isError={isError} message={notificationMessage}></Notification>
      <Filter onChange={updatePhonebookOnChange}></Filter>
      <h2>Add new</h2>
      <PersonForm onSubmitHandler={addPerson} nameOnChange={handleNameOnChange} numberOnChange={handleNumberOnChange}></PersonForm>
      <h2>Numbers</h2>
      {persons.filter(filterByName).map((person, index) => <Person key={index} person={person} onClickHandle={() => removePerson(person)}></Person>)}
    </div>
  )
}

export default App