import React, { useEffect, useState } from 'react'
// import { useUserContext } from '../context/UserContext';
import YouTube from 'react-youtube';



const Home = ( {workouts} ) => {
  const [randomWorkout, setRandomWorkout] = useState(null)

  useEffect(() => {
    if (workouts.length > 0) {
      const random = Math.floor(Math.random() * workouts.length)
      setRandomWorkout(workouts[random])
    }
  }, [workouts])

console.log("randomworkout", randomWorkout)

const getVideoId = (videoUrl) => {
  const pattern = /youtube.com\/watch\?v=(\w+)/;
  const match = videoUrl.match(pattern);
  return match ? match[1] : '';
}

  return (
    <div>
      <h1>A workout we love!</h1>
      {randomWorkout && (
        <div>
          <p>{randomWorkout.title}</p>
          <YouTube videoId={getVideoId(randomWorkout.video_url)} />
        </div>
          
      )}
    </div>
  )
}

export default Home
