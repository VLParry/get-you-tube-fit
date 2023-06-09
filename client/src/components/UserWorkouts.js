import React from 'react'
import { useUserContext } from '../context/UserContext';
import YouTube from 'react-youtube';
import { Card, CardContent, Typography } from '@mui/material';
import { Grid } from '@mui/material';



const UserWorkouts = ( ) => {
  const {user} = useUserContext()

  const opts = {
    height: '180',
    width: '320',
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
      <h1>My workouts</h1>
      <Grid container spacing={2}>
      {user.workouts.map((workout) => (
        <Grid key={workout.id} item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              <a href={`/workouts/${workout.id}`}>{workout.title}</a>              </Typography>
              <Typography variant="body2" color="textSecondary" component="p" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
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

export default UserWorkouts
