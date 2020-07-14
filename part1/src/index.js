import React from 'react';
import ReactDom from 'react-dom';


const App = () => {
  const course = 'Half Stack application development'
  const parts= [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
    name: 'Using props to pass data',
    exercises: 7
    },
    {
    name: 'State of a component',
    exercises: 14
    }
  ]

  return (
    <div>
      ...
    </div>
    )
  }
ReactDom.render(<App/>, document.getElementById("root"))