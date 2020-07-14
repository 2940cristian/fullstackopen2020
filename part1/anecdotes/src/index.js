import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const handleNextAnecdote = (props) => {
  const [selected, setSelected] = props.states;
  const anecdotes = props.anecdotes;
  setSelected(Math.floor(Math.random()*anecdotes.length));
}

const handleVote = (props) => {
  const [votes, setVotes] = props.states;
  const selected = props.selected;
  const votesCopy = votes;
  votesCopy[selected]+=1;
  setVotes(votesCopy);
  return;
}

const Button = (props) => {
  return (
    <button onClick={() => {
      props.handleClick(props)
    }}>{props.text}</button>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0);
  let votesCopy = {};
  anecdotes.forEach((el, index) => {votesCopy[index] = 0});

  const [votes, setVotes] = useState(votesCopy);

  return (
    <div>
      {props.anecdotes[selected]}
      <br></br>
      <Button handleClick={handleNextAnecdote} anecdotes={anecdotes} states={[selected, setSelected]} text="Generate New Anecdote"/>
      <Button handleClick={handleVote} votesCopy={votesCopy} states={[votes, setVotes]} selected={selected} text="vote"></Button>
      <p>Anecdote {selected+1} has {votes[0]} votes</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)