import React from 'react'
import YouTube from 'react-youtube';



const Workouts = ( {workouts, setWorkouts} ) => {
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

        <ul>
      {workouts.map(workout => (

    <li key={workout.id}>
        <h2>{workout.title}</h2>
        <p>{workout.description}</p>
        <YouTube videoId={getVideoId(workout.video_url)} opts={opts} />

      
    </li>
))}
</ul>
    </div>
  )
}

export default Workouts
