import { useState } from "react";

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  );
};

const Statistics = (props) => {
  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text="good" value={props.good} />
          <StatisticLine text="neutral" value={props.neutral} />
          <StatisticLine text="bad" value={props.bad} />
          <StatisticLine text="all" value={props.clicks} />
          <StatisticLine text="average" value={props.averageScore} />
          <StatisticLine text="positive" value={props.positiveScore + " %"} />
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [clicks, setClicks] = useState(0);

  const handleGoodFeedback = () => {
    const updatedGood = good + 1;
    setGood(updatedGood);
    const updatedClicks = clicks + 1;
    setClicks(updatedClicks);
  };

  const handleNeutralFeedback = () => {
    const updatedNeutral = neutral + 1;
    setNeutral(updatedNeutral);
    const updatedClicks = clicks + 1;
    setClicks(updatedClicks);
  };

  const handleBadFeedback = () => {
    const updatedBad = bad + 1;
    setBad(updatedBad);
    const updatedClicks = clicks + 1;
    setClicks(updatedClicks);
  };

  let averageScore = clicks === 0 ? 0 : (good - bad) / clicks;
  let positiveScore = clicks === 0 ? 0 : (good / clicks) * 100;

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={handleGoodFeedback} text="good" />
      <Button handleClick={handleNeutralFeedback} text="neutral" />
      <Button handleClick={handleBadFeedback} text="bad" />
      <h1>Statistics: </h1>
      {clicks === 0 ? (
        <p>No feedback given.</p>
      ) : (
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          clicks={clicks}
          averageScore={averageScore}
          positiveScore={positiveScore}
        />
      )}
    </div>
  );
};

export default App;
