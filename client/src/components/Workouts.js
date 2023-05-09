import React from 'react'
import YouTube from 'react-youtube';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import AddWorkout from './AddWorkout';

//should I pass the workout state and addworkout from App or ok to go through workouts?


const Workouts = ( {workouts, setWorkouts, handleAddWorkout} ) => {
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
    }
  
  return (
    <div>
      <AddWorkout 
      key={workouts.id}
      workout={workouts}
      setWorkouts={setWorkouts}
      handleAddWorkout={handleAddWorkout} />
        {/* <ul>
      {workouts.map(workout => (

    <li key={workout.id}>
        <h2>{workout.title}</h2>
        <p>{workout.description}</p>
        <YouTube videoId={getVideoId(workout.video_url)} opts={opts} />

      
    </li>
))}
</ul> */}
    <Grid container spacing={2}>
      {workouts.map((workout) => (
        <Grid key={workout.id} item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
              <a href={`/workouts/${workout.id}`}>{workout.title}</a>              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {workout.description}
              </Typography>
              <YouTube videoId={getVideoId(workout.video_url)} opts={opts} />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>


    </div>
  )
}

export default Workouts
