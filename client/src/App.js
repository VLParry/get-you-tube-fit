import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useUserContext } from "./context/UserContext";
import { useState, useEffect } from 'react';
import Workouts from './components/Workouts';
import Home from './components/Home';
import UserWorkouts from './components/UserWorkouts';
import Login from './components/Login';
import Signup from './components/Signup';
import NavBar from './components/NavBar';
import WorkoutShow from './components/WorkoutShow';
import TagShow from './components/TagShow';



function App() {
  const {setUser, user} = useUserContext()
  const [workouts, setWorkouts] = useState([])
  const [tags, setTags] = useState([])
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    fetch("/auth")
      .then((r) => {
        if (r.ok) {
          r.json().then((user) => {
            setUser(user)
            setLoggedIn(true)
         });
      }
      });
    },[setUser, setLoggedIn]);

    useEffect(() => {
      fetch("/workouts")
      .then((r) => r.json())
      .then(setWorkouts)
    }, [setWorkouts])

    useEffect(() => {
      fetch("/tags")
      .then((r) => r.json())
      .then(setTags)
    }, [setTags])


    const handleLogout = ()=> {
      fetch("/logout", {method: "DELETE"})
      .then (() => {
        setUser({})
        setLoggedIn(false)
      })
    }

 

    const handleAddWorkout = (newWorkout) => {
      setWorkouts([...workouts, newWorkout])
      setUser({...user, workouts: [...user.workouts,newWorkout]})
    }
    //

    const handleDeleteWorkout = (id) => {
      const updatedWorkouts = workouts.filter((deletedWorkout) => deletedWorkout.id !== id)
      const updatedUserWorkouts = user.workouts.filter((deletedUserWorkout) => deletedUserWorkout.id !== id)
      console.log(typeof id)
      console.log(updatedUserWorkouts)
      setUser({...user, workouts: updatedUserWorkouts})
      setWorkouts(updatedWorkouts)
     
    }
    
    const handleEditWorkout = (updatedWorkout) => {
      const updatedWorkouts = workouts.map(workout => {
        if (workout.id === updatedWorkout.id) {
          return updatedWorkout; // Replace the edited workout with the updated one
        }
        return workout;
      });
      const updatedUserWorkouts = user.workouts.map(userWorkout => {
        if (userWorkout.id === updatedWorkout.id) {
          return updatedWorkout; // Replace the edited workout with the updated one
        }
        return userWorkout;
      })
      setWorkouts(updatedWorkouts);
      setUser({...user, workouts: updatedUserWorkouts})
    };

  return (
    <div className="App">
     <Router>
      <NavBar loggedIn={loggedIn} handleLogout={handleLogout}/>
      <Routes>
          <Route path="/" element={<Home workouts={workouts} tags={tags} />} />
          <Route path="/login" element={<Login onLogin={setUser} setLoggedIn={setLoggedIn}/>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/workouts" element={<Workouts loggedIn={loggedIn} workouts={workouts} setWorkouts={setWorkouts} handleAddWorkout={handleAddWorkout} tags={tags} />} />
          <Route path="/myWorkouts" element={<UserWorkouts  />} />
          <Route path="/workouts/:id" element={<WorkoutShow handleDeleteWorkout={handleDeleteWorkout} handleEditWorkout={handleEditWorkout} tags={tags}/>}  />
          <Route path="/tags/:id" element={<TagShow  />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
