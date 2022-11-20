import { useState } from "react";
import AdditionQuiz from "./AdditionQuiz";
import MovieApp from "./MovieApp";

const routes = ['/movie-app', '/addition-quiz']

function App() {
  const [appState, setAppState] = useState('/movie-app');

  function changeRoute(route) {
    setAppState(route)
  }

  return (
    <div>
      <nav>
        <ul>
          <li onClick={(_) => changeRoute('/movie-app')} > Movie App</li>
          <li onClick={(_) => changeRoute('/addition-quiz')}>Addition Quiz</li>
        </ul>
      </nav>

      {
        appState === routes[0] ?
          <MovieApp /> :
          <AdditionQuiz />
      }
    </div >
  )
}

export default App;
