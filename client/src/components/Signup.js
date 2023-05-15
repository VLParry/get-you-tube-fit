import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button/Button';


const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation]= useState("");
    const [name, setName] = useState("")
    const [errors, setErrors] = useState([])
    const nav = useNavigate();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            email,
            password,
            password_confirmation: passwordConfirmation,
            name
        }
        fetch ('/signup', {
            method: "POST",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(user)
        })
        .then((r) => {
          setErrors([])
console.log(user)
            if (r.ok) {
              nav('/Login')
            }
            else{
              r.json().then((err) => setErrors(err.errors));
            }
          })
        
    }
  return (
    <div className='auth-form-container'>
        <h1>Please enter your information below to sign up!</h1>
    <form className="signup-form">
        <label htmlFor="email">Email:</label>
        <Input 
        // size="small"
        type="email" 
        placeholder="add your email" 
        variant="outlined" 
        color="danger"
        id="email" 
        value={email}
        name="email"
        onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <Input 
        type="password" 
        placeholder="create password" 
        variant="outlined" 
        color="danger"
        id="password" 
        value={password}
        name="password" 
        onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="password">Password confirmation:</label>
        <Input 
        type="password" 
        placeholder="confirm password" 
        variant="outlined" 
        color="danger"
        id="password_confirmation" 
        value={passwordConfirmation}
        name="password_confirmation" 
        onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
        <label htmlFor="name">Your name:</label>
        <Input 
        type="name" 
        placeholder="your name here" 
        variant="outlined" color="danger"
        id="name" 
        value={name}
        name="name" 
        onChange={(e) => setName(e.target.value)}
        />
        <Button color="danger" className='btn' onClick={handleSubmit}>Create Account</Button>
        {errors.map((err) => (
            <p key={err} style={{ color: "red" }}>{err}</p>
          ))}
    </form>
 
    </div>
  )
}

export default Signup
