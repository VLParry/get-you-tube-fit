import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Checkbox from '@mui/joy/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FormGroup } from '@mui/material';
import YouTube from 'react-youtube';
import { Card, CardContent, Grid} from "@mui/material";




const WorkoutShow = ( {handleDeleteWorkout, handleEditWorkout, tags }) => {
    const [workout, setWorkout] = useState(null);
    const [errors, setErrors] = useState([])
    const { id } = useParams();
    const {user} = useUserContext()
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false)
    const [selectedTags, setSelectedTags] = useState([]);
    const [editedWorkout, setEditedWorkout] = useState({
      title: '',
      description: '',
      warmup: '',
      cooldown: '',
      duration: '',
      videoUrl: '',
      tags: []  
    });
    const nav = useNavigate();

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

    useEffect(() => {
      setErrors([])
      fetch(`/workouts/${id}`)
        .then((r) => {
          if (r.ok) {
            return r.json();
          } else {
            throw new Error("Workout not found");
          }
        })
        .then((data) => {
          setWorkout(data);
          setIsLoading(false);
          // Set initial values for the form fields based on the fetched workout data
        setEditedWorkout({
          title: data.title,
          description: data.description,
          warmup: data.warmup ? 'yes' : 'no',
          cooldown: data.cooldown ? 'yes' : 'no',
          duration: data.duration.toString(),
          videoUrl: data.video_url,
          tags: data.tags.map(tag => tag.id.toString())
        }); 
        setSelectedTags(data.tags.map(tag => tag.id.toString()))
        })
        .catch((error) => {
          setErrors([error.message]);
        });
    }, [id, user]);


  
    if (workout === null) {
      return <div>Loading...</div>;
    }
  


    function deleteWorkoutClick(){
      fetch(`/workouts/${id}`, {
        method: 'DELETE'
      }).then((r) =>{
       if(r.ok) {
        // alert('Workout deleted successfully!');
        handleDeleteWorkout(parseInt(id))
        nav('/myWorkouts')
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
      })  
  }

  function editWorkoutClick() {
    const newEditedWorkout = {...editedWorkout, warmup: editedWorkout.warmup === "yes", cooldown: editedWorkout.cooldown === "yes", tags: selectedTags}
    fetch(`/workouts/${id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
    }, 
    body: JSON.stringify(newEditedWorkout)
  }) 
    .then((r) =>{
      if(r.ok) {
        handleEditWorkout(newEditedWorkout);
        setIsEditing(false)
       
    } else {
       r.json().then((err) => setErrors(err.errors));
    }
  })
}

  return (
        <Grid container spacing={2} justifyContent="center">
          
    <Grid item xs={12} md={8}>
      <Card>
        <CardContent>
          <Typography variant="h1" sx={{ fontSize: '3rem' }}>{workout.title}</Typography>
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
<Typography variant="body1" sx={{ marginBottom: '0.5rem' }}>
      Tags:{' '}
      {workout.tags && workout.tags.map((tag) => (
        <a key={tag.id} href={`/tags/${tag.id}`} style={{ marginRight: '0.5rem' }}>{tag.name}</a>
      ))}
    </Typography>










            {isEditing && <>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  type="text"
                  placeholder="title"
                  id="title"
                  value={editedWorkout.title}
                  name="title"
                  onChange={(e) =>
                    setEditedWorkout({
                      ...editedWorkout,
                      title: e.target.value
                    })
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input
                  type="text"
                  placeholder="enter description"
                  id="description"
                  value={editedWorkout.description}
                  name="description"
                  onChange={(e) =>
                    setEditedWorkout({
                      ...editedWorkout,
                      description: e.target.value
                    })
                  }
                />
              </FormControl>
              <FormControl component="fieldset">
                <FormLabel component="legend">Warmup?</FormLabel>
                <RadioGroup
                  aria-label="warmup"
                  name="warmup"
                  value={editedWorkout.warmup}
                  onChange={(e) =>
                    setEditedWorkout({
                      ...editedWorkout,
                      warmup: e.target.value
                    })
                  }
                >
                  <FormControlLabel
                    value="yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel
                    value="no"
                    control={<Radio />}
                    label="No"
                  />
                </RadioGroup>
              </FormControl>

              <FormControl component="fieldset">
                <FormLabel component="legend">Cooldown?</FormLabel>
                <RadioGroup
                  aria-label="cooldown"
                  name="cooldown"
                  value={editedWorkout.cooldown}
                  onChange={(e) =>
                    setEditedWorkout({
                      ...editedWorkout,
                      cooldown: e.target.value
                    })
                  }
                >
                  <FormControlLabel
                    value="yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel
                    value="no"
                    control={<Radio />}
                    label="No"
                  />
                </RadioGroup>
              </FormControl>

              <FormControl>
                <FormLabel>Duration in minutes</FormLabel>
                <Input
                  type="number"
                  placeholder="duration"
                  id="duration"
                  value={editedWorkout.duration}
                  name="duration"
                  onChange={(e) =>
                    setEditedWorkout({
                      ...editedWorkout,
                      duration: e.target.value
                    })
                  }
                />
              </FormControl>


              
     <FormControl>
       <FormLabel>Link to video</FormLabel>
       <Input 
     type="link" 
     placeholder="video link" 
     id="videoUrl" 
     value={editedWorkout.videoUrl}
     name="videoUrl" 
     onChange={(e) =>
      setEditedWorkout({
        ...editedWorkout,
        duration: e.target.value
      })
    }
     />
     </FormControl>
     <FormGroup>
                <FormLabel>Choose your tags</FormLabel>
                {tags.map((tag) => (
                  <Checkbox
                    key={tag.id}
                    value={tag.id}
                    label={tag.name}
                    checked={selectedTags.includes(tag.id.toString())}
                    onChange={(e) => {
                      if (selectedTags.includes(e.target.value)) {
                        const filteredTags = selectedTags.filter(
                          (tag) => tag !== e.target.value
                        );
                        setSelectedTags(filteredTags);
                      } else {
                        setSelectedTags([...selectedTags, e.target.value]);
                      }
                    }}
                  />
                ))}
              </FormGroup>
          <Button onClick={editWorkoutClick}>Save</Button></>}
          <div style={{ marginTop: 10 }}>
            <YouTube 
            videoId={getVideoId(workout.video_url)}
             opts={opts} />
          </div>
          

          


  {user && user.id === workout.user_id && (
  <div style={{ marginTop: 16 }}>
    <Button variant="outlined" color="primary" onClick={() => setIsEditing(true)}>
      Edit
    </Button>{" "}
    <Button onClick={deleteWorkoutClick} variant="outlined" color="error">
      Delete
    </Button>
    
  </div>
  )}


        </CardContent>
      </Card>
    </Grid>
   

  </Grid>
  
  )
}

export default WorkoutShow
