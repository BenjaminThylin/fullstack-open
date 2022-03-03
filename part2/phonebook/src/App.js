import { useState } from 'react'

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
  return <li>{props.name} {props.number}</li>
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '8765432' },
    { name: 'Ada Lovelace', number: '76543' },
    { name: 'Dan Abramov', number: '3456' },
    { name: 'Mary Poppendieck', number: '765432' }
  ])

  const [filterValue, setFilterValue] = useState("")
  const [newPerson, setNewPerson] = useState({name: "", number: ""})

  const addPerson = (event) => {
    event.preventDefault()
    let tempPerson = {name: newPerson.name, number: newPerson.number}

    if (persons.some(person => person.name === newPerson.name) || persons.some(person => person.number === newPerson.number)) {
      alert(`${newPerson.name} or ${newPerson.number} is already added to the phonebook`)
    } else {
      setPersons(persons.concat(tempPerson))
    }
    console.log(persons)
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
      <Filter onChange={updatePhonebookOnChange}></Filter>
      <h2>Add new</h2>
      <PersonForm onSubmitHandler={addPerson} nameOnChange={handleNameOnChange} numberOnChange={handleNumberOnChange}></PersonForm>
      <h2>Numbers</h2>
      {persons.filter(filterByName).map((person, index) => <Person key={index} name={person.name} number={person.number}></Person>)}
    </div>
  )
}

export default App