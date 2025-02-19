import React, { useState } from "react";
import "./App.css";
import gsap from "gsap";
import question from "./question.json" assert { type: "json" };
import "./index.css";

const App = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleOptionClick = (option) => {
    if (!isAnswered) {
      setSelectedOption(option);
      setIsAnswered(true);
      if (option === question[currentQuestion].answer) {
        setIsCorrect(true);
        setScore((prevScore) => prevScore + 1);
      } else {
        setIsCorrect(false);
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < question.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setIsCorrect(false);
    } else {
      setShowResult(true);
    }
  };

  const handlePlayAgain = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">React Quiz</h1>
        {showResult ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Quiz Result</h2>
            <p className="text-lg mb-4">
              You scored {score} out of {question.length}
            </p>
            <button
              onClick={handlePlayAgain}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Play Again
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold mb-4">
              Question {currentQuestion + 1}
            </h2>
            <p className="text-lg mb-4">{question[currentQuestion].question}</p>
            <div className="space-y-4">
              {question[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className={`w-full p-4 rounded-md ${
                    isAnswered && option === question[currentQuestion].answer
                      ? "bg-green-500"
                      : isAnswered && option === selectedOption && !isCorrect
                      ? "bg-red-500"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            <button
              onClick={handleNextQuestion}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
            >
              {currentQuestion < question.length - 1 ? "Next" : "Show Result"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default App;
