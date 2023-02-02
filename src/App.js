import {
  BrowserRouter as Router,
  Routes,
  Navigate,
  Route,
} from "react-router-dom";
import './App.css';
import Login from './components/login';
import Home from './components/home';
import Signup from './components/signup';


function App() {
  return (
    <>
      <Router>
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/" element={<Home />} />
            <Route path="*" element={<Navigate replace to="/login" />} />
          </Routes>
        </Router>
    </>
  );
}

export default App;
