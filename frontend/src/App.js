import { BrowserRouter, Routes, Route} from 'react-router-dom';

//pages and components
import Home from './pages/Home';
import NavBar from './components/NavBar';
import Calendar from './pages/Calendar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <NavBar />
      <div className = "Pages">
        <Routes>
          <Route
            path = "/"
            element = {<Calendar />}
          />
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
