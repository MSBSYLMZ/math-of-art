import './App.css';
import { Route, Routes } from 'react-router-dom'

import HomePage from './pages/home/Home.component';
import PuzzlePage from './pages/puzzle/Puzzle-page.component';
// import PuzzleSection from './components/puzzle-section/Puzzle-section.component';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route exact path="/" element={<HomePage/>}></Route>
          <Route exact path="/puzzle" element={<PuzzlePage/>}></Route>
        </Routes>
    </div>
  );
}

export default App;
