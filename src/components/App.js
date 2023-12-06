import React, { useState, useEffect } from "react";
import Question from "./Question";
import quiz from "../data/quiz";

function App() {
  const [questions] = useState(quiz);
  const [currentQuestionId, setCurrentQuestionId] = useState(1);
  const [score, setScore] = useState(0);
  const currentQuestion = questions.find((q) => q.id === currentQuestionId);
  
  useEffect(() => {
    let timer;
    if (currentQuestionId !== null) {
      timer = setTimeout(() => {
        setCurrentQuestionId((prevId) => {
          const nextId = prevId + 1;
          if (nextId <= questions.length) {
            return nextId;
          } else {
            return null;
          }
        });
      }, 10000); // Timer set to 10 seconds
    }

    return () => {
      clearTimeout(timer);
    };
  }, [currentQuestionId, questions.length]);

  function handleQuestionAnswered(correct) {
    if (correct) {
      setScore((prevScore) => prevScore + 1);
    }
    setCurrentQuestionId((prevId) => {
      const nextId = prevId + 1;
      if (nextId <= questions.length) {
        return nextId;
      } else {
        return null;
      }
    });
  }
  
  return (
    <main>
      <section>
        {currentQuestion ? (
          <Question
            question={currentQuestion}
            onAnswered={handleQuestionAnswered}
          />
        ) : (
          <>
            <h1>Game Over</h1>
            <h2>Total Correct: {score}</h2>
          </>
        )}
      </section>
    </main>
  );
}

export default App;
