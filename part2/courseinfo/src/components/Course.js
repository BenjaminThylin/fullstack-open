import React from 'react';

const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
}

const Part = (props) => {
    return (
        <p>
            {props.part.name} {props.part.exercises}
        </p>
    )
}

const Total = ({ course }) => {
    let totalSum = course.parts.reduce((totalValue, currentPart) => {
        return totalValue += currentPart.exercises;
    }, 0)
    return (
      <p><b>Total of {totalSum} exercises</b></p>
    )
}

const Content = ({ course }) => {
    return (
        <div>
            {course.parts.map(part => <Part key={part.name} part={part} />)}
        </div>
    )
}

const Course = ({course}) => {
    return (
        <div>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
        </div>
    )
}

export default Course