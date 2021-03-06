import React, { useState, useContext } from "react";
import { navigate } from "@reach/router";

import { AnswersContext } from "../../providers/AnswersProvider";

import QuizStyled from "../../styles/components/QuizStyled";
import ButtonStyled from "../../styles/components/ButtonStyled";
import { questions } from "./utils";

const Quiz = () => {
  const [index, setIndex] = useState(1);
  const [nextStatus, setNextStatus] = useState(true);
  const [correctsNumber, setCorrectsNumber] = useState(0);
  const [alternativeChoosen, setAlternativeChoosen] = useState(null);
  const { setAnswers } = useContext(AnswersContext);
  const questionsNumber = questions.length;
  const handleNext = () => {
    if (alternativeChoosen === questions[index - 1].answer) {
      setCorrectsNumber(correctsNumber + 1);
    }
    if (index + 1 <= questionsNumber) {
      document.querySelector(
        'input[name="alternative"]:checked'
      ).checked = false;
      setIndex(index + 1);
      setNextStatus(true);
    } else {
      setAnswers(correctsNumber);
      navigate("/results");
    }
  };
  const handleNextStatus = () => {
    setNextStatus(false);
  };
  const getAlternativeChoosen = event => {
    setAlternativeChoosen(event.target.value);
  };
  return (
    <QuizStyled>
      <h3 className="questionNumber">
        Question {index}
        <span>/{questionsNumber}</span>
      </h3>
      <h2 className="questionTitle">{questions[index - 1].question}</h2>
      <ul className="alternatives">
        {questions[index - 1].alternatives.map((alternative, i) => (
          <li key={i} onClick={handleNextStatus}>
            <label htmlFor={`op${i}`}>
              {alternative}
              <input
                type="radio"
                name="alternative"
                id={`op${i}`}
                value={alternative}
                onClick={getAlternativeChoosen}
              />
            </label>
          </li>
        ))}
      </ul>
      <div className="buttons">
        {index === questionsNumber ? (
          <ButtonStyled
            secondary={true}
            onClick={handleNext}
            disabled={nextStatus}
          >
            Finish
          </ButtonStyled>
        ) : (
          <ButtonStyled
            primary={true}
            onClick={handleNext}
            disabled={nextStatus}
          >
            Next
          </ButtonStyled>
        )}
      </div>
    </QuizStyled>
  );
};

export default Quiz;
