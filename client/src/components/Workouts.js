import React, { useState } from 'react'
import YouTube from 'react-youtube';
import { Grid, Card, CardContent, Typography, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import AddWorkout from './AddWorkout';



const Workouts = ( {loggedIn, workouts, setWorkouts, handleAddWorkout, tags} ) => {
const [durationFilter, setDurationFilter] = useState('all');

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

    const handleDurationFilterChange = (e) => {
      setDurationFilter(e.target.value)
    }

    let filteredWorkouts = workouts
    if (durationFilter !== 'all') {
      const [minDuration, maxDuration] = durationFilter.split("-");
      filteredWorkouts = workouts.filter(workout => workout.duration >= parseInt(minDuration) && workout.duration <= parseInt(maxDuration)
      )
    }
  
  return (
    <div>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="duration-filter-label">Filter by Duration</InputLabel>
        <Select
          labelId="duration-filter-label"
          id="duration-filter"
          value={durationFilter}
          label="Duration"
          onChange={handleDurationFilterChange}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="0-15">0-15 minutes</MenuItem>
          <MenuItem value="15-30">15-30 minutes</MenuItem>
          <MenuItem value="30-45">30-45 minutes</MenuItem>
          <MenuItem value="45-90">45+ minutes</MenuItem>
        </Select>
      </FormControl>
      {loggedIn && <AddWorkout 
      key={workouts.id}
      workout={workouts}
      setWorkouts={setWorkouts}
      handleAddWorkout={handleAddWorkout}
      tags={tags}
     />}
   
    <Grid container spacing={2} >
      {filteredWorkouts.map((workout) => (
       <Grid key={workout.id} item xs={12} sm={6} md={4}>
       <Card>
         <CardContent>
           <Typography gutterBottom variant="h5" component="h2" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
           <a href={`/workouts/${workout.id}`}>{workout.title}</a>              </Typography>
           <Typography variant="body2" color="textSecondary" component="p"style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
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
