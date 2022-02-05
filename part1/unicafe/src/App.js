import React, { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const StatisticLine = (props) => {
  if (props.text === "Positive") {
    return (
      <tr>
        <td>{props.text}:</td>
        <td>{props.value}%</td>
      </tr>
    )
  }
  return (
    <tr>
      <td>{props.text}:</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  if (props.all === 0) {
    return (
      <h2>No feedback collected</h2>
    )
  }
  return (
    <div>
      <h2>Statistics</h2>
      <table>
        <tbody>
            <StatisticLine text="Good" value={props.good}></StatisticLine>
            <StatisticLine text="Neutral" value={props.neutral}></StatisticLine>
            <StatisticLine text="Bad" value={props.bad}></StatisticLine>
            <StatisticLine text="All" value={props.all}></StatisticLine>
            <StatisticLine text="Average" value={(props.good - props.bad)/props.all}></StatisticLine>
            <StatisticLine text="Positive" value={props.good/props.all}></StatisticLine>
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  let all = good + neutral + bad

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="Good"></Button>
      <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral"></Button>
      <Button handleClick={() => setBad(bad + 1)} text="Bad"></Button>
      <Statistics good={good} neutral={neutral} bad={bad} all={all}></Statistics>
    </div>
  )
}

export default App