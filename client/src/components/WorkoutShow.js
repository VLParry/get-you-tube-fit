import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';

import YouTube from 'react-youtube';
import { Card, CardContent, Typography, Grid, Button, Link } from "@mui/material";

const WorkoutShow = ( {handleDeleteWorkout }) => {
    const [workout, setWorkout] = useState(null);
    const [errors, setErrors] = useState([])
    const { id } = useParams();
    const {user} = useUserContext()
    const [isCreator, setIsCreator] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const nav = useNavigate();



console.log('logged in user', user)
  //you need the useEffect hook to fetch the data for the specific item and update the component's state when the ID in the URL changes.
    // useEffect(() => {
    //   setErrors([])
    //   fetch(`/workouts/${id}`)
    //     .then((r) => {
    //       if(r.ok) {
    //         setWorkout(data)
    //       } else {
    //         r.json().then((err) => setErrors(err.errors));
    //       });
    // }, [id]);

    useEffect(() => {
      setErrors([])
      fetch(`/workouts/${id}`)
        .then((r) => {
          if (r.ok) {
            return r.json();
          } else {
            throw new Error("Workout not found");
          }
        })
        .then((data) => {
          setWorkout(data);
          setIsCreator(user && user.id === data.user_id)
          console.log('did user create this workout', isCreator)
          setIsLoading(false);
          
        })
        .catch((error) => {
          setErrors([error.message]);
        });
    }, [id, user]);

  
    
    // if (errors.length > 0) {
    //   return <div>{errors.map((err) => <p key={err} style={{ color: "red" }}>{err}</p>)}</div>;
    // }

  
    if (workout === null) {
      return <div>Loading...</div>;
    }
  
    // const { title, description, video_url } = workout;
    const opts = {
      height: '360',
      width: '640',
      playerVars: {
        autoplay: 0,
      },
    };
  
    const getVideoId = (videoUrl) => {
      const pattern = /youtube.com\/watch\?v=(\w+)/;
      const match = videoUrl.match(pattern);
      return match ? match[1] : '';
    };

    console.log('isLoading', isLoading);
    console.log('isCreator', isCreator);

    function deleteWorkoutClick(){
      fetch(`/workouts/${id}`, {
        method: 'DELETE'
      }).then((r) =>{
       if(r.ok) {
        alert('Workout deleted successfully!');
        setWorkout(null); // remove the deleted workout from the state
        nav('/myWorkouts')
      
       handleDeleteWorkout(id)
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
      })  
  }

  return (
        <Grid container spacing={2} justifyContent="center">
          
    <Grid item xs={12} md={8}>
      <Card>
        <CardContent>
          <Typography variant="h3">{workout.title}</Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {workout.description}
          </Typography>
          <Typography variant="body1">
            Duration: {workout.duration} minutes
          </Typography>
          <Typography variant="body1">
            Warmup? {workout.warmup ? 'Yes' : 'No'}
          </Typography>
          <Typography variant="body1">
            Cooldown? {workout.cooldown ? 'Yes' : 'No'}
          </Typography>
          <Typography variant="body1">
            Tags: 
        {workout.tags && workout.tags.map((tag) => (
          <li key={tag.id}>{tag.name}</li>
        ))}
      
          </Typography>
          <div style={{ marginTop: 10 }}>
            <YouTube 
            videoId={getVideoId(workout.video_url)}
             opts={opts} />
          </div>
          
  <div style={{ marginTop: 16 }}>
    <Button variant="outlined" color="primary">
      Edit
    </Button>{" "}
    <Button onClick={deleteWorkoutClick} variant="outlined" color="error">
      Delete
    </Button>
    
    
  </div>


        </CardContent>
      </Card>
    </Grid>
   

  </Grid>
  
  )
}

export default WorkoutShow
