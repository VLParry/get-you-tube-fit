import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import YouTube from 'react-youtube';
import { Grid, Card, CardContent, Typography} from '@mui/material';


const TagShow = () => {
  const { id } = useParams();
  const [tagShow, setTagShow] = useState(null);

  useEffect(() => {
    fetch(`/tags/${id}`)
      .then((response) => response.json())
      .then((data) => setTagShow(data))
      .catch((error) => console.error('Error:', error));
  }, [id]);

  if (!tagShow) {
    return <p>Loading...</p>;
  }

  if (tagShow.workouts.length === 0) {
    return <p>No workouts found.</p>;
  }

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
      <Typography variant="h4" component="h1" >
        {tagShow.name}
      </Typography>
      <Grid container spacing={2} style={{ display: 'flex' }} >
      {tagShow.workouts.map((workout) => (

       <Grid item xs={12} sm={6} md={4}>
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
  );
};

export default TagShow
