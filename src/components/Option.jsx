import { useQuiz } from "../contexts/QuizContext";

function Options() {
    const {questions, index, answer, setNewAnswer} = useQuiz();
    const hasAnswered = answer !== null;
    return (
        <div className="options">
            {questions[index].options.map((option, i) => (
                <button className={`btn btn-option ${i === answer ? 'answer' : ''} ${hasAnswered ? i === questions[index].correctOption ? 'correct' : 'wrong' : ''}`} key={i} onClick={() => setNewAnswer(i)}>{option}</button>
            ))}
        </div>
    )
}

export default Options;