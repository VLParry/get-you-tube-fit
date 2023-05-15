import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { CssVarsProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';




const Login = ( {onLogin, setLoggedIn} ) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([])
    const nav = useNavigate();


    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(e) 
      fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json",},
        body: JSON.stringify({ email, password}),
      })
      .then((r) => {
        console.log(r)
        if (r.ok) {
          setErrors([])
          r.json().then((user) => {
            onLogin(user);
            setLoggedIn(true)
            nav('/')
        });
        }
        else{
          r.json().then((err) => setErrors(err.errors));
        }
      })
  }
  return (
    <div className='auth-form-container'>    <CssVarsProvider>
    <main>
      
      <Sheet
        sx={{
          width: 300,
          mx: 'auto', // margin left & right
          my: 4, // margin top & bottom
          py: 3, // padding top & bottom
          px: 2, // padding left & right
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          borderRadius: 'sm',
          boxShadow: 'md',
        }}
        variant="outlined"
      >
        <div>
          <Typography level="h4" component="h1">
            <b>Welcome!</b>
          </Typography>
          <Typography level="body2">Sign in to access your workouts.</Typography>
        </div>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            // html input attribute
            type="email" 
            placeholder="enter your email" 
            id="email" 
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            />
          
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input 
        type="password" 
        placeholder="enter password" 
        id="password" 
        value={password}
        name="password" 
        onChange={(e) => setPassword(e.target.value)}
        />
        </FormControl>
     
        <Button color="danger" variant="outlined" onClick={handleSubmit} sx={{ mt: 1 /* margin top */ }}>Log in</Button>
        <Typography
          endDecorator={<Link href="/signup">Sign up</Link>}
          fontSize="sm"
          sx={{ alignSelf: 'center' }}
        >
          Don&apos;t have an account?
        </Typography>
        {errors.map((err) => (
            <p key={err} style={{ color: "red" }}>{err}</p>
          ))}
      </Sheet>
    </main>
  </CssVarsProvider>
    {/* <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input 
        type="email" 
        placeholder="enter your email" 
        id="email" 
        value={email}
        name="email"
        onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input 
        type="password" 
        placeholder="enter password" 
        id="password" 
        value={password}
        name="password" 
        onChange={(e) => setPassword(e.target.value)}
        />
        <button className='btn'>Sign In!</button>
      
          {errors.map((err) => (
            <p key={err} style={{ color: "red" }}>{err}</p>
          ))}
         
        </form>
        <p>Don't have an account? &nbsp; <Link to="/Signup"><button>Create one here!</button></Link></p> */}
        </div>
  )
}

export default Login
