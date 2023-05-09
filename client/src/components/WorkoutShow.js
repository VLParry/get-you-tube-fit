import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import YouTube from 'react-youtube';
import { Card, CardContent, Typography, Grid } from "@mui/material";

const WorkoutShow = () => {
    const [workout, setWorkout] = useState(null);
    const { id } = useParams();
  
    useEffect(() => {
      fetch(`/workouts/${id}`)
        .then((response) => response.json())
        .then((data) => setWorkout(data));
    }, [id]);
   
  
    if (!workout) {
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
        {workout.tags.map((tag) => (
          <li key={tag.id}>{tag.name}</li>
        ))}
      
          </Typography>
          <div style={{ marginTop: 16 }}>
            <YouTube videoId={getVideoId(workout.video_url)} opts={opts} />
          </div>
        </CardContent>
      </Card>
    </Grid>
  </Grid>
  )
}

export default WorkoutShow
