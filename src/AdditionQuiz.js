import { useEffect, useState } from "react";

import './AdditionQuiz.css';

function AdditionQuiz() {
    const [scores, setScores] = useState([-1, -1, -1, -1, -1]);
    const [questionNum, setQuestionNum] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);
    const [firstNum, setFirstNum] = useState(0);
    const [secondNum, setSecondNum] = useState(0);
    const [answerField, setAnswerField] = useState('');
    const [score, setScore] = useState(0);
    const [isQuizEnd, setIsQuizEnd] = useState(false)

    useEffect(() => {
        const scores = JSON.parse(localStorage.getItem('scores'));
        if (scores.length) {
            setScores(scores);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('scores', JSON.stringify(scores));
    }, [scores]);

    function playQuiz() {
        const firstNum = Math.floor(Math.random() * 10);
        const secondNum = Math.floor(Math.random() * 10);

        setFirstNum(firstNum);
        setSecondNum(secondNum);

        setQuestionNum(1);
        setIsPlaying(true);
        setIsQuizEnd(false);
        setScore(0);
    }

    function checkFinalScore(scr) {
        if (scr === score) {
            return true
        }
        return false;
    }

    function nextQuestion() {
        if (questionNum === 10) {
            let numArray = [...scores];

            numArray.push(score);

            numArray.sort(function (a, b) {
                return b - a;
            });
            numArray.pop();

            setScores(numArray);
            setIsQuizEnd(true);
        } else {
            console.log(scores)
            const answer = (firstNum + secondNum) === parseInt(answerField);
            if (answer) {
                setScore((prevScore) => prevScore + 1)
            }

            const first = Math.floor(Math.random() * 9 + 1);
            const second = Math.floor(Math.random() * 9 + 1);

            setFirstNum(first);
            setSecondNum(second);

            setAnswerField('')

            setQuestionNum((questionNum) => questionNum + 1)
        }
    }

    function exit() {
        setIsPlaying(false);
        setIsQuizEnd(false);
    }

    return (
        <div className="add-quiz">
            {isQuizEnd ?
                <div className="final-score">
                    <h2>Final Score: {score.toString()}</h2>

                    <ul>
                        {scores.map((score, index) => {
                            return <li className={checkFinalScore(score) ? 'red' : ''}><span className="number-list">{index + 1}.</span> <span className="score-list">{score < 0 ? '-' : score.toString()}</span> Points</li>
                        })}
                    </ul>

                    <div className="button-container">
                        <button className="button" onClick={playQuiz}>Retry</button>
                        <button className="button" onClick={exit}>Exit</button>
                    </div>
                </div>
                : null}
            {!isPlaying ?
                <div>
                    <h1>Top Scores</h1>

                    <ul>
                        {scores.map((score, index) => {
                            return <li><span className="number-list">{index + 1}.</span> <span className="score-list">{score < 0 ? '-' : score.toString()}</span> Points</li>
                        })}
                    </ul>
                    <button onClick={playQuiz} className='button'>Play</button>
                </div>
                :
                <div className="quiz">
                    <h1>Question {questionNum.toString()}/10</h1>

                    <div className="quiz-ground">
                        <span>{firstNum}</span>
                        <span> + </span>
                        <span>{secondNum}</span>
                        <span> = </span>
                        <input type='number' min='0' max='10' value={answerField} onChange={(e) => setAnswerField(e.target.value)} />
                    </div>

                    <button className="button" onClick={nextQuestion}>Submit</button>

                    <p>Score: {score.toString()}</p>
                </div>
            }
        </div>
    )
}

export default AdditionQuiz;