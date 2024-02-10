import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from './components/header/Header';
import Home from './pages/home/home';
import MovieList from './components/movieList/movieList';
import { MyList } from './pages/myList/MyList';
import Movie from './pages/movieDetail/movie';

function App() {
  return (
    <div className="App">
        <Router>
          <Header />
            <Routes>
                <Route index element={<Home />}></Route>
                <Route path="discover/:type/:id" element={<Movie />}></Route>
                <Route path="movies/:type" element={<MovieList />}></Route>
                <Route path="mylist" element={<MyList />}></Route>
                <Route path="/*" element={<h1 className='error'>Error Page</h1>}></Route>
            </Routes>
        </Router>
    </div>
  );
}

export default App;
