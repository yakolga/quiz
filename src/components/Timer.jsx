import { useEffect } from "react";
import { useQuiz } from "../contexts/QuizContext";

function Timer() {
    const {secondsRemaining, tickTimer} = useQuiz();

    const minutes = Math.floor(secondsRemaining / 60);
    const seconds = secondsRemaining % 60;

    useEffect(function() {
        const timer = setInterval(function() {
            tickTimer();
        }, 1000);

        return () => clearInterval(timer);
    }, [tickTimer]) 
    return (
        <div className="timer">{minutes < 10 ? '0' + minutes : minutes}:{seconds < 10 ? '0' + seconds : seconds}</div>
    )
}

export default Timer;