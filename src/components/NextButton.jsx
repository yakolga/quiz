import { useQuiz } from "../contexts/QuizContext";

function NextButton() {
    const {questions, answer, index, nextQuestion, finishQuiz} = useQuiz();
    if (answer === null) return null;
    if (index < questions.length - 1) return (
        <button className="btn btn-ui" onClick={nextQuestion}>Next</button>
    )

    if (index === questions.length - 1) return (
        <button className="btn btn-ui" onClick={finishQuiz}>Finish</button>
    )
}

export default NextButton;