import { useEffect, useState } from "react";
import "./App.css";
import Description from "./components/Description/Description";
import Options from "./components/Options/Options";
import Feedback from "./components/Feedback/Feedback";
import Notification from "./components/Notification/Notification";

function App() {
  const stateReviews = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  // const [values, setValues] = useState(() => {
  //   const stringifiedFeedback = localStorage.getItem("feedback");
  //   if (!stringifiedFeedback) return stateReviews;
  //   const parsedFeedbacks = JSON.parse(stringifiedFeedback);
  //   return parsedFeedbacks;
  // });
  const [values, setValues] = useState(() => {
    const stringifiedFeedback = window.localStorage.getItem("feedback");
    if (stringifiedFeedback !== null)
      return (
        JSON.parse(stringifiedFeedback) || {
          good: 0,
          neutral: 0,
          bad: 0,
        }
      );
  });

  useEffect(() => {
    window.localStorage.setItem("feedback", JSON.stringify(values));
  }, [values]);

  const resetFeedback = () => {
    setValues(stateReviews);
  };
  const updateFeedback = (feedbackType) => {
    setValues((prevState) => ({
      ...prevState,
      [feedbackType]: prevState[feedbackType] + 1,
    }));
  };

  const totalFeedback = values.good + values.neutral + values.bad;
  const positiveFeedback = Math.round(
    ((values.good + values.neutral) / totalFeedback) * 100
  );

  return (
    <>
      <Description />
      <Options
        onUpdate={updateFeedback}
        onReset={resetFeedback}
        total={totalFeedback}
      />
      {/* якщо кількість відгуків = 0 то відображається повідомлення
      (нотифікашка с текстом) No feedback yet в іншому разі показуються відгуки */}
      {totalFeedback === 0 ? (
        <Notification />
      ) : (
        <Feedback
          good={values.good}
          neutral={values.neutral}
          bad={values.bad}
          total={totalFeedback}
          positive={positiveFeedback}
        />
      )}
    </>
  );
}

export default App;
