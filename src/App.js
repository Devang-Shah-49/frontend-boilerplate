import {
  BrowserRouter as Router,
  Routes,
  Navigate,
  Route,
} from "react-router-dom";
import './App.css';
import Login from './components/login';
import CreateEvent from './components/Committee/CreateEvent';
import CreateCommittee from "./components/College/CreateCommittee";
import CollegeHome from "./pages/collegepage";
import Home from './pages/homepage';
import EventDetails from './components/Committee/EventDetails';
import Landingpage from './pages/landingpage';
import Signup from './components/signup';
import { useContext, useState, useEffect } from 'react';
import { appContext } from "./context";
import PrivateRoute from './helpers/PrivateRoutes/PrivateRoute';


function App() {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)

  const context = { user, setUser, token, setToken };
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("appUser")))
    setToken(localStorage.getItem("appToken"))
    // setAccount(JSON.parse(localStorage.getItem("kpupAccount")))
  }, [])

  return (
    <>
      <appContext.Provider value={context}>
        <Router>
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="committee/:event_id" element={<PrivateRoute component={EventDetails} />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/" element={<Landingpage />} />
            <Route exact path="/committee/create-event" element={<PrivateRoute component={CreateEvent} />} />
            <Route exact path="/college/create-committee" element={<PrivateRoute component={CreateCommittee} />} />
            <Route exact path="/committee" element={<PrivateRoute component={Home} />} />
            <Route exact path="/college" element={<PrivateRoute component={CollegeHome} />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        </Router>
      </appContext.Provider>
    </>
  );
}

export default App;
