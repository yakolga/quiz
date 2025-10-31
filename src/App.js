import Header from './Header';
import Main from './Main';
import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    fetch('http://localhost:3000/questions.json')
    .then((res) => res.json())
    .then((data) => console.log(data))
  }, []);
  return (
    <div className="app">
      <Header/>
      <Main>
        <p>1/15</p>
        <p>Question?</p>
      </Main>
    </div>
  )
}
