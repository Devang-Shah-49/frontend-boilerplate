import {
  BrowserRouter as Router,
  Routes,
  Navigate,
  Route,
} from "react-router-dom";
import './App.css';
import Login from './components/login';
import Home from './pages/homepage';
import Landingpage from './pages/landingpage';
import Signup from './components/signup';
import { useContext, useState, useEffect } from 'react';
import { appContext } from "./context";
import PrivateRoute from './helpers/PrivateRoutes/PrivateRoute';


function App() {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)

  const context = { user, setUser, token, setToken };

  return (
    <>
      <appContext.Provider value={context}>
        <Router>
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/" element={<Landingpage />} />
            <Route exact path="/committee" element={<PrivateRoute component={Home} />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        </Router>
      </appContext.Provider>
    </>
  );
}

export default App;
