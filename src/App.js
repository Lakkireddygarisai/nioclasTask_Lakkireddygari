import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

function App() {
  const questionIds = [
    'AreaUnderTheCurve_901',
    'BinomialTheorem_901',
    'DifferentialCalculus2_901',
  ];
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [results, setResults] = useState({});

  useEffect(() => {
    const fetchQuestion = async () => {
      const response = await axios.get(
        `https://0h8nti4f08.execute-api.ap-northeast-1.amazonaws.com/getQuestionDetails/getquestiondetails?QuestionID=${questionIds[currentQuestionIndex]}`
      );
      setCurrentQuestion(response.data[0]);
      setResults(prevResults => ({
        ...prevResults,
        [questionIds[currentQuestionIndex]]: '',
      }));
    };
    fetchQuestion();
  }, [currentQuestionIndex]);

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex(prevIndex => prevIndex - 1);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
  };

  const handleResultChange = event => {
    setResults(prevResults => ({
      ...prevResults,
      [questionIds[currentQuestionIndex]]: event.target.value,
    }));
  };

  if (!currentQuestion) {
    return <div>Loading question...</div>;
  }

  return (
    <div className='question-container'>
      <h1>Question</h1>
      <h2 className='question-text'>{currentQuestion.Question}</h2>
      <p>Chapter: {currentQuestion.ChapterID}</p>
      <p>Source: {currentQuestion.Source}</p>
      <p>Expected Time: {currentQuestion.ExpectedTime}</p>
      <p>Difficulty: {currentQuestion.Difficulty}</p>
      <p>Tags: {currentQuestion.Tags}</p>
      <textarea
        value={results[questionIds[currentQuestionIndex]]}
        onChange={handleResultChange}
        placeholder="Enter your answer here..."
      />
      <div>
        <button className='navigation-btn'
          disabled={currentQuestionIndex === 0}
          onClick={handlePreviousQuestion}
        >
          Previous Question
        </button>
        <button className='navigation-btn'
          disabled={currentQuestionIndex === questionIds.length - 1}
          onClick={handleNextQuestion}
        >
          Next Question
        </button>
      </div>
      <div>
        {Object.entries(results).map(([id, result]) => (
          <div key={id}>
            <p>{id}</p>
            <p>Result: {result}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
