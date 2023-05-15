import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';
import Add from '@mui/icons-material/Add';
import Checkbox from '@mui/joy/Checkbox';
import { FormGroup } from '@mui/material';



import FormControlLabel from '@mui/material/FormControlLabel';


const AddWorkout = ({tags, handleAddWorkout}) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [warmup, setWarmup] = useState("no")
  const [cooldown, setCooldown] = useState("no")
  const [duration, setDuration] = useState(0)
  const [videoUrl, setVideoUrl] = useState("")
  const [selectedTags, setSelectedTags] = useState([]);
  const [errors, setErrors] = useState([])
  const navigate = useNavigate()
  const [open, setOpen] = React.useState(false);

  
  const handleSubmitWorkout= (e) => {
    e.preventDefault();
    const newWorkout = {
      title,
      description,
      warmup: warmup === "yes" ? true : false,
      cooldown: cooldown === "yes" ? true : false,
      duration,
      video_url: videoUrl,
      // tags: selectedTags
      tag_ids: selectedTags
    }
    fetch("/workouts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newWorkout)
    })
    .then((r) => {
      if (r.ok) {
        setErrors([])
        r.json().then((addedWorkout) => {
          console.log(addedWorkout)
          handleAddWorkout(addedWorkout)
        navigate('/workouts')
        });
      }
      else{
        r.json().then((err) => setErrors(err.errors));
      }
    })
}
console.log('selected tags', selectedTags)


  return (
    <div>
      <React.Fragment>
      <Button
        variant="outlined"
        color="neutral"
        startDecorator={<Add />}
        onClick={() => setOpen(true)}
      >
        New Workout
      </Button>
      <Modal  open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          aria-labelledby="basic-modal-dialog-title"
          aria-describedby="basic-modal-dialog-description"
          sx={{ maxWidth: 500, overflow: 'auto' }}
        >
         
          <Typography level="h4" component="h1">
            <b>Feel free to add a favorite workout here so others can check it out!</b>
          </Typography>
          <form  onSubmit={(event) => {
          handleSubmitWorkout(event);
          setOpen(false);
          }}>
            <Stack spacing={2}>
       
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input
            // html input attribute
            type="title" 
            placeholder="title" 
            id="title" 
            value={title}
            name="title"
            onChange={(e) => setTitle(e.target.value)}
            />
          
        </FormControl>
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Input 
        type="description" 
        placeholder="enter description" 
        id="description" 
        value={description}
        name="description" 
        onChange={(e) => setDescription(e.target.value)}
        />
        </FormControl>
        <FormControl component="fieldset">
  <FormLabel component="legend">Warmup?</FormLabel>
  <RadioGroup aria-label="warmup" name="warmup" value={warmup} onChange={(e) => setWarmup(e.target.value)}>
    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
    <FormControlLabel value="no" control={<Radio />} label="No" />
  </RadioGroup>
</FormControl>

<FormControl component="fieldset">
  <FormLabel component="legend">Cooldown?</FormLabel>
  <RadioGroup aria-label="cooldown" name="cooldown" value={cooldown} onChange={(e) => 
  {
    setCooldown(e.target.value)}
}>
    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
    <FormControlLabel value="no" control={<Radio />} label="No" />
  </RadioGroup>
</FormControl>

        <FormControl>
          <FormLabel>Duration in minutes</FormLabel>
          <Input 
        type="integer" 
        placeholder="duration" 
        id="duration" 
        value={duration}
        name="duration" 
        onChange={(e) => setDuration(e.target.value)}
        />
        </FormControl>
        <FormControl>
          <FormLabel>Link to video</FormLabel>
          <Input 
        type="link" 
        placeholder="video link" 
        id="videoUrl" 
        value={videoUrl}
        name="videoUrl" 
        onChange={(e) => setVideoUrl(e.target.value)}
        />
        </FormControl>
        <FormGroup>
          <FormLabel>Choose your tags</FormLabel>
         {tags.map(tag => {
         
          return <Checkbox
          key={tag.id}
          value={tag.id}
          // value={tag}
          label={tag.name}
          onChange={(e) => {
            if (selectedTags.includes(e.target.value)){
              const filteredTags = selectedTags.filter(tag => tag !== e.target.value)
              setSelectedTags(filteredTags)
            } else {
              setSelectedTags([...selectedTags, e.target.value])
            }
        
          }}
          />
         
         })}
        </FormGroup>

     
        <Button type="submit" color="danger" variant="outlined" 
       
        sx={{ mt: 1 /* margin top */ }}>Add Workout</Button>
      
      {errors.map((err) => (
            <p key={err} style={{ color: "red" }}>{err}</p>
          ))}
          </Stack>
          </form>
          </ModalDialog>
      </Modal>
          </React.Fragment>
    </div>
  )
}

export default AddWorkout
