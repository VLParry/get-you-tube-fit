import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';


const TagShow = ( {match} ) => {
    const [tagShow, setTagShow] = useState([])
    const { id } = useParams();


    useEffect(() => {
        fetch(`/tags/${id}`)
          .then((response) => response.json())
          .then((data) => setTagShow(data));
          
      }, [id]);
console.log(tagShow)
  return (
    <div>
{/* <h1>{tagShow.name}</h1>
      <ul>
        {tagShow.workouts.map((workout) => (
          <li key={workout.id}>
            <h2>{workout.title}</h2>
            <p>{workout.description}</p>
            <p>Duration: {workout.duration} minutes</p>
          </li>
        ))}
      </ul>    */}
       </div>
  )
}

export default TagShow
