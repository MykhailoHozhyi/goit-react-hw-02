import { useEffect, useState } from 'react';
import Description from '../Description/Description';
import Feedback from '../Feedback/Feedback';
import Options from '../Options/Options';
import './App.css';
import Notification from '../Notification/Notification';

export default function App() {
  const [feedback, setFeedback] = useState(() => {
    const savedFeedback = localStorage.getItem('saved-feedback');

    if (savedFeedback !== null) {
      return JSON.parse(savedFeedback);
    }

    return {
      good: 0,
      neutral: 0,
      bad: 0,
    };
  });

  useEffect(() => {
    localStorage.setItem('saved-feedback', JSON.stringify(feedback));
  }, [feedback]);

  function updateFeedback(feedbackType) {
    setFeedback({ ...feedback, [feedbackType]: feedback[feedbackType] + 1 });
  }

  function resetFeedback() {
    setFeedback({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  }

  const totalFeedback = feedback.good + feedback.neutral + feedback.bad;
  const positiveFeedback = Math.round((feedback.good / totalFeedback) * 100);

  return (
    <>
      <Description />

      <Options
        updateFeedback={updateFeedback}
        totalFeedback={totalFeedback}
        resetFeedback={resetFeedback}
      />

      {totalFeedback > 0 ? (
        <Feedback
          feedback={feedback}
          totalFeedback={totalFeedback}
          positiveFeedback={positiveFeedback}
        />
      ) : (
        <Notification />
      )}
    </>
  );
}
