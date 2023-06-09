import React, { useEffect, useState } from 'react'
// import { useUserContext } from '../context/UserContext';
import YouTube from 'react-youtube';
import { Link } from 'react-router-dom';
import { Typography, Grid } from '@mui/material';


//The API component will pass an event object as the sole argument to each of those functions the event handler props. The event object has the following properties:
// The event's target identifies the video player that corresponds to the event.
// The event's data specifies a value relevant to the event. Note that the onReady event does not specify a data property.


const Home = ( {workouts, tags} ) => {
  const [randomWorkout, setRandomWorkout] = useState(null)

  const getVideoId = (videoUrl) => {
    const pattern = /youtube.com\/watch\?v=(\w+)/;
    const match = videoUrl.match(pattern);
    return match ? match[1] : '';
  }

  useEffect(() => {
    if (workouts.length > 0) {
      const random = Math.floor(Math.random() * workouts.length)
      setRandomWorkout(workouts[random])
    }
  }, [workouts])




  return (

<div>
      <Typography variant="h4" gutterBottom>
        Welcome to Get You(tube) Fit!
      </Typography>
      <Typography variant="h5" gutterBottom>
        The best place to keep track of your favorite YouTube workout videos!
      </Typography>
      <Grid container spacing={2} >
        <Grid item xs={12} >
          <Typography variant="h5" gutterBottom style={{ color: 'red', fontWeight: 'bold' }}>
            Featured Workout
          </Typography>
          {randomWorkout && (
            <div style={{ marginBottom: '60px' }}>
              <Typography variant="subtitle1">{randomWorkout.title}</Typography>
              <YouTube videoId={getVideoId(randomWorkout.video_url)} />
              <Link to={`/workouts/${randomWorkout.id}`}>View Workout</Link>
            </div>
          )}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom style={{ color: 'red' }}>
          Discover videos categorized by different tags! 
          </Typography>
          <Typography variant="h5" gutterBottom style={{ color: 'red' }}>
         Simply click on a tag to explore related content.
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {tags.map((tag) => (
              <div key={tag.id} style={{ marginRight: '10px' }}>
                <Link to={`/tags/${tag.id}`}>{tag.name}</Link>
              </div>
            ))}
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default Home
