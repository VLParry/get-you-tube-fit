import React, { useEffect, useState } from 'react'
// import { useUserContext } from '../context/UserContext';
import YouTube from 'react-youtube';
import { Link } from 'react-router-dom';



const Home = ( {workouts, tags} ) => {
  const [randomWorkout, setRandomWorkout] = useState(null)

  useEffect(() => {
    if (workouts.length > 0) {
      const random = Math.floor(Math.random() * workouts.length)
      setRandomWorkout(workouts[random])
    }
  }, [workouts])


const getVideoId = (videoUrl) => {
  const pattern = /youtube.com\/watch\?v=(\w+)/;
  const match = videoUrl.match(pattern);
  return match ? match[1] : '';
}

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '200px' }}>
          <h3>Tags:</h3>
          {tags.map(tag => (
  <div key={tag.id}>
    <Link to={`/tags/${tag.id}`}>{tag.name}</Link>
  </div>
))}
        </div>
        </div>
      <h1>Featured Workout</h1>
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
