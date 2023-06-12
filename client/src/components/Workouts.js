import React, { useState } from 'react'
import YouTube from 'react-youtube';
// NPM package gave us this YouTube component for embedding and controlling Youtube videos in react application. 

import { Grid, Card, CardContent, Typography, FormControl, InputLabel, Select, MenuItem} from '@mui/material';
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
      // opts` object that specifies the configuration options for the YouTube player. In this case, it sets the height and width of the player to 180 and 320 pixels, respectively. The `playerVars` object within `opts` allows additional player parameters to be specified, such as autoplay. In this example, autoplay is set to 0 (disabled).

    const getVideoId = (videoUrl) => {
        const pattern = /youtube.com\/watch\?v=(\w+)/;
        const match = videoUrl.match(pattern);
        return match ? match[1] : '';   
    }
//     This code defines a function called getVideoId that takes a videoUrl parameter.
// It uses a regular expression pattern /youtube.com\/watch\?v=(\w+)/ to match the YouTube video URL and extract the video ID.
// The match variable holds the result of the pattern matching operation.
// If there is a match, it returns the captured group at index 1 (which is the video ID), otherwise, it returns an empty string.

    const handleDurationFilterChange = (e) => {
      setDurationFilter(e.target.value)
    }

    let filteredWorkouts = workouts
    if (durationFilter !== 'all') {
      const [minDuration, maxDuration] = durationFilter.split("-");
      //  splits the durationFilter string into an array using the hyphen ('-') as the separator. The result is an array with two elements: the minimum duration (minDuration) and the maximum duration (maxDuration). Based off the values seen below in the filter form. 
      filteredWorkouts = workouts.filter(workout => workout.duration >= parseInt(minDuration) && workout.duration <= parseInt(maxDuration)
      // checks if the workout.duration (parsed as an integer) is greater than or equal to the minDuration value and less than or equal to the maxDuration value. This condition determines whether a workout should be included in the filtered array or not.
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
           {/* The video ID is extracted from the `workout.video_url` variable using the `getVideoId` function, and the player is rendered with the specified options. */}
         </CardContent>
       </Card>
     </Grid>
      ))}
    </Grid>


    </div>
  )
}

export default Workouts
