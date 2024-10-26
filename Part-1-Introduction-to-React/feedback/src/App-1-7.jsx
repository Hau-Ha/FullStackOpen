import { useState } from 'react';

const App = () => {
  // Save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // Handlers for each feedback type
  const handleGood = () => setGood(good + 1);
  const handleNeutral = () => setNeutral(neutral + 1);
  const handleBad = () => setBad(bad + 1);

  // Calculated values
  const totalFeedback = good + neutral + bad;
  const averageScore = totalFeedback === 0 ? 0 : (good - bad) / totalFeedback;
  const positivePercentage = totalFeedback === 0 ? 0 : (good / totalFeedback) * 100;

  return (
    <div>
      <h1>Customer Feedback</h1>
      
      <div>
        <h2>Give your feedback</h2>
        <button onClick={handleGood}>Good</button>
        <button onClick={handleNeutral}>Neutral</button>
        <button onClick={handleBad}>Bad</button>
      </div>
      
      <div>
        <h2>Statistics</h2>
        <p>Good: {good}</p>
        <p>Neutral: {neutral}</p>
        <p>Bad: {bad}</p>
        <p>Total feedback: {totalFeedback}</p>
        <p>Average score: {averageScore.toFixed(2)}</p>
        <p>Positive feedback: {positivePercentage.toFixed(2)}%</p>
      </div>
    </div>
  );
};

export default App;
