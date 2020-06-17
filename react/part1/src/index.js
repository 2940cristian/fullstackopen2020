import React from 'react';
import ReactDom from 'react-dom';

const Hello = (person) => {
  return (
    <div>
      <p>
        Hello there {person.name}, you are {person.info ? person.info : "nothing" }
      </p>
    </div>
  )
}

const App = () => {
  const davidInfo = "gay"
  return (
    <>
    <h1>lol</h1>
    <Hello name="cris" info="21"/>
    <Hello name="david" info={davidInfo}/>
    <Hello name="sam" info="papi sam"/>
    </>
  )
}

ReactDom.render(<App/>, document.getElementById("root"))