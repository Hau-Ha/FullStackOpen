import { useState } from 'react';
const Button = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
);

const StatisticLine = ({ text, value }) => (
  <p>
    {text}: {value}
  </p>
);

const Statistics = ({ good, neutral, bad }) => {
  const totalFeedback = good + neutral + bad;
  const averageScore = totalFeedback === 0 ? 0 : (good - bad) / totalFeedback;
  const positivePercentage = totalFeedback === 0 ? 0 : (good / totalFeedback) * 100;

  if (totalFeedback === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <div>
      <h2>Statistics</h2>
      <StatisticLine text="Good" value={good} />
      <StatisticLine text="Neutral" value={neutral} />
      <StatisticLine text="Bad" value={bad} />
      <StatisticLine text="Total feedback" value={totalFeedback} />
      <StatisticLine text="Average score" value={averageScore.toFixed(2)} />
      <StatisticLine text="Positive feedback" value={`${positivePercentage.toFixed(2)}%`} />
    </div>
  );
};



const App = () => {
  // Save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Customer Feedback</h1>
      
      <div>
        <h2>Give your feedback</h2>
        <Button onClick={() => setGood(good + 1)} text="Good" />
        <Button onClick={() => setNeutral(neutral + 1)} text="Neutral" />
        <Button onClick={() => setBad(bad + 1)} text="Bad" />
      </div>
      
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
