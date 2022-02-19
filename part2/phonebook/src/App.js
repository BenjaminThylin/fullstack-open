import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '8765432' },
    { name: 'Ada Lovelace', number: '76543' },
    { name: 'Dan Abramov', number: '3456' },
    { name: 'Mary Poppendieck', number: '765432' }
  ])
  const [newPerson, setNewPerson] = useState({name: "", number: ""})

  const addPerson = (event) => {
    event.preventDefault()
    let tempPerson = {name: newPerson.name, number: newPerson.number}

    if (persons.some(person => person.name === newPerson.name) || persons.some(person => person.number === newPerson.number)) {
      alert(`${newPerson.name} or ${newPerson.number} is already added to the phonebook`)
    } else {
      setPersons(persons.concat(tempPerson))
    }
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
      <form onSubmit={addPerson}>
        <div>
          Name:
          <input onChange={handleNameOnChange}/>
        </div>
        <div>
          Number:
          <input onChange={handleNumberOnChange}/>
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person, index) => <li key={index}>{person.name} {person.number}</li>)}
    </div>
  )
}

export default App