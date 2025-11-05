import Header from './Header';
import Main from './Main';
import { useEffect, useReducer } from 'react';
import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';
import Question from './Question';

const initialState = {
  questions: [],
  status: 'loading', // loading, error, ready, active, finished
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
        status: 'active'
      }
    default: 
      throw new Error(`Unknown action`);
  }
}

export default function App() {
  const [{questions, status}, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch('http://localhost:8000/questions')
    .then((data) => data.json())
    .then((data) => dispatch({type: 'dataRecieved', payload: data}))
    .catch((err) => dispatch({type: 'dataFailed'}))
  }, []);

  const numQuestions = questions.length;

  return (
    <div className="app">
      <Header/>
      <Main>
        {status === 'loading' && <Loader/>}
        {status === 'error' && <Error/>}
        {status === 'ready' && <StartScreen numQuestions={numQuestions} dispatch={dispatch}/>}
        {status === 'active' && <Question/>}
      </Main>
    </div>
  )
}
