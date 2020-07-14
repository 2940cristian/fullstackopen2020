import React, {useState} from "react";
import ReactDOM from "react-dom";

const Button = (props) => {
  const [number, method, name] = props.values

  const handleClick = () => {
    return method(number+1)
  }

  return (
    <button onClick={handleClick}> {name}</button>
  )
}

const Statistics = (props) => {
  const [good, neutral, bad] = props.stats;
  const total = good + bad + neutral
  let average = () => {
    if(bad === 0) return good;
    else return ((good-bad)/2).toFixed(2)
  };
  
  let positiveFeedback = () => {
    console.log(bad, good)
    return 100 - (bad/good * 100).toFixed(2)
  }

  return (
    <section>
      <h4>Statistics</h4>
      {total === 0 ? <p>No feedback given</p> : (
        <>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>All: {total}</p>
        <p>average: {average()}</p>
        <p>positive feedback: {positiveFeedback()}% </p>
        </>
      )
      }
    </section>
  )
}


const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
  <section>
    <h2>Give feedback</h2>
    <br></br>
    <Button values={[good, setGood, "good"]}/>
    <Button values={[neutral, setNeutral, "neutral"]}/>
    <Button values={[bad, setBad, "bad"]}/>
    <Statistics stats={[good, neutral, bad]}/>
    </section>
  )
}

ReactDOM.render(<App/>, document.getElementById('root'))