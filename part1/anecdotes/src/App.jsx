import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);

  const [votes, setVotes] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
  });

  const [votedOn, setVotedOn] = useState(false);

  let highestAnecdotes = [];
  let highestValue = -100000000000000;

  for (const [key, value] of Object.entries(votes)) {
    const numericKey = parseInt(key, 10);
    if (value > highestValue) {
      highestAnecdotes = [numericKey];
      highestValue = value;
    } else if (value === highestValue) {
      highestAnecdotes.push(numericKey);
    }
  }

  const randomNumberGenerator = () => {
    return Math.floor(Math.random() * anecdotes.length);
  };

  const handleSelectAnecdote = () => {
    const randomNumber = randomNumberGenerator();
    setSelected(randomNumber);
  };

  const handleUpvoteAnecdote = () => {
    const updatedVotes = { ...votes };
    updatedVotes[selected] += 1;
    setVotes(updatedVotes);
    setVotedOn(true);
  };

  return (
    <div>
      <h3>Anecdote of the day</h3>
      <div>{anecdotes[selected]}</div>
      <div>Has {votes[selected]} votes</div>
      <button onClick={handleSelectAnecdote}>Next anecdote</button>
      <button onClick={handleUpvoteAnecdote}>Vote</button>
      {/* <h1>Anecdotes:</h1>
      <div>
        <h3>One by one:</h3>
        {anecdotes.map((anec, index) => (
          <li key={index}>
            Anecdote {index + 1}: {anec}
          </li>
        ))}
      </div> */}
      {/* <div>
        <h3>Scores: </h3>
        {Object.keys(votes).map((vote, index) => (
          <li key={index}>
            Anecdote {+vote + 1}: {votes[vote]} votes
          </li>
        ))}
      </div> */}
      {!votedOn ? (
        <p>You've not voted yet</p>
      ) : highestAnecdotes.length > 1 ? (
        <div>
          <h3>Highest voted anecdotes are: </h3>

          {highestAnecdotes.map((anec, index) => (
            <p key={index}>{anecdotes[anec]}</p>
          ))}

          <p>They were both voted on {highestValue} times!</p>
        </div>
      ) : (
        <div>
          <h3>Anecdote with the most votes is....</h3>
          <div>
            <p>{anecdotes[highestAnecdotes]}</p>
            <p>It was voted on {highestValue} times!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

// Note to self: please use an array next time instead of an object.
