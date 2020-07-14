import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

  const Header = (props) => {
    return (
      <>
      <h2>{props.course}</h2>
      </>
    )
  }

  const Part = (props) => {
    return (
      <>
      <h4>{props.part}</h4>
      <p>{props.exercise}</p>
      </>
    )
  }
  
  const Content = (props) => {
    console.log(props);
    return (
      <>
      <Part part={props.parts.name} exercise={props.parts[0].exercises}/>
      <Part part={props.parts[1].name} exercise={props.parts[1].exercises}/>
      <Part part={props.parts[2].name} exercise={props.parts[2].exercises}/>
      </>
    )
  }
  
  const Total = (props) => {
    return (
      <>
      <h5>Total exercises: {props.parts[0].exercises+props.parts[1].exercises+props.parts[2].exercises}</h5>
      </>
    )
  }

  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}



ReactDOM.render(<App />, document.getElementById('root'))
