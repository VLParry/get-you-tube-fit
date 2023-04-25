import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useUserContext } from "./context/UserContext";
import { useState, useEffect } from 'react';
import Workouts from './components/Workouts';
import Home from './components/Home';
import UserWorkouts from './components/UserWorkouts';

function App() {
  const {setUser, user} = useUserContext()
  const [workouts, setWorkouts] = useState([])

  // useEffect(() => {
  //   fetch("/auth")
  //     .then((r) => {
  //       if (r.ok) {
  //         r.json().then((user) => {setUser(user)
  //        });
  //     }
  //     });
  //   },[setUser]);

    useEffect(() => {
      fetch("/workouts")
      .then((r) => r.json())
      .then(setWorkouts)
    }, [setWorkouts])

    console.log(workouts)


  return (
    <div className="App">
     <Router>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workouts" element={<Workouts workouts={workouts} setWorkouts={setWorkouts} />} />
          <Route path="/myWorkouts" element={<UserWorkouts  />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
