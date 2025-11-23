import { createContext, useContext, useReducer, useEffect } from "react";

const QuizContext = createContext();

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],
  status: 'loading', // loading, error, ready, active, finished,
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  switch(action.type) {
    case 'dataRecieved':
      return {
        ...state,
        questions: action.payload,
        status: 'ready',
      };
    case 'dataFailed':
      return {
        ...state,
        status: 'error',
      };
    case 'dataActive': 
      return {
        ...state,
        status: 'active',
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      }
    case 'newAnswer':
      const question = state.questions[state.index];
      return {
        ...state,
        answer: action.payload,
        points: action.payload === question.correctOption ? state.points + question.points : state.points,
      }
    case 'nextQuestion': 
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      }
    case 'finish': 
      return {
        ...state,
        status: 'finished',
        highscore: state.points > state.highscore ? state.points : state.highscore,
      }
    case 'restart': 
      return {
        ...state,
        status: 'ready',
        index: 0,
        answer: null,
        points: 0,
      }
    case 'tick':
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? 'finished' : state.status,
      }
    default: 
      throw new Error(`Unknown action`);
  }
}

function QuizProvider({children}) {
    const [{questions, status, index, answer, points, highscore, secondsRemaining}, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        fetch('http://localhost:8000/questions')
        .then((data) => data.json())
        .then((data) => dispatch({type: 'dataRecieved', payload: data}))
        .catch((err) => dispatch({type: 'dataFailed'}))
    }, []);

    function startQuiz() {
        dispatch({type: 'dataActive'});
    }

    function setNewAnswer(index) {
        dispatch({type: 'newAnswer', payload: index});
    }

    function tickTimer() {
        dispatch({type: 'tick'});
    }

    function nextQuestion() {
        dispatch({type: 'nextQuestion'});
    }

    function finishQuiz() {
        dispatch({type: 'finish'});
    }

    function restartQuiz() {
        dispatch({type: 'restart'});
    }
    
    return (
        <QuizContext.Provider value={{
            questions,
            status,
            index,
            answer,
            points,
            highscore,
            secondsRemaining,
            startQuiz,
            setNewAnswer,
            tickTimer,
            nextQuestion,
            finishQuiz,
            restartQuiz
        }}>
            {children}
        </QuizContext.Provider>
    )
}

function useQuiz() {
    const context = useContext(QuizContext);
    if (context === undefined) throw new Error("QuizContext was used outside the QuizProvider");
    return context
}

export {QuizProvider, useQuiz}