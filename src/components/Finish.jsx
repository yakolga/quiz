import { useQuiz } from "../contexts/QuizContext";

function Finish() {
    const {points, questions, highscore, restartQuiz} = useQuiz();
    const maxPossiblePoints = questions.reduce((prev, curr) => prev + curr.points, 0);
    const percentage = (points / maxPossiblePoints) * 100;
    let emoji;
    if (percentage === 100) emoji = '🥇';
    if (percentage >= 80 && percentage < 100) emoji = '🎉';
    if (percentage >= 50 && percentage < 80) emoji = '😊';
    if (percentage >= 0 && percentage < 50) emoji = '👀';
    if (percentage === 0) emoji = '🤦‍♀️';

    return (
        <>
            <p className="result">
                <span>{emoji}</span>You scored <strong>{points}</strong> out of {maxPossiblePoints} ({Math.ceil(percentage)}%)
            </p>
            <p className="highscore">(Highscore: {highscore} points)</p>
            <button className="btn btn-ui" onClick={restartQuiz}>Restart</button>
        </>
    )
}

export default Finish;