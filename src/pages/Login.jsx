import { TextField, Button, Box, Typography, Icon } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const LOGIN_API_URL = import.meta.env.VITE_API_URL_LOGIN;

export default function Login() {
  
    const navigate = useNavigate();
    const navigateToRegister = () => {
      navigate('/register');
    }

    const [form, setForm] = useState({
      username: '',
      password: ''
    });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value
    }));
  };

  function handleSubmit(event) {
    event.preventDefault(); 
    console.log('username:', form.username);
    console.log('password:', form.password);
    // TODO: Validate form data here 
    
    // Here send the form data to backend API for registration
    fetch(LOGIN_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })
    setForm({
      username: '',
      password: ''
    });
  }
  
  return (
    <Box sx={{
      bgcolor: "#181818",
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
    }}>
      
      <form onSubmit={handleSubmit}>
        <Box sx={{
          bgcolor: '#303030',
          display: 'flex',
          flexDirection: 'column',
          width: '400px',
          height: 'fit-content',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '16px',
          padding: '2rem'
        }}>

          <Typography variant="h4" color="#E0E0E0" sx={{ marginBottom: '2rem' }} fontFamily={'Roboto'}>
            Foto-Soppi
          </Typography>

          <PhotoCamera sx={{ fontSize: '80px', color: '#181818', marginBottom: '1rem' }} />

          <Typography variant="h5" color="#E0E0E0" sx={{ marginBottom: '1rem' }}>
            Sign In
          </Typography>

          <Box sx={{ marginBottom: '1rem', width: '300px', bgcolor: '#181818', borderRadius: '16px' }}>
            <TextField sx={{
              '& .MuiInputBase-root': {
                color: '#E0E0E0',
              },
              '& .MuiInputLabel-root': {
                color: '#E0E0E0',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#E0E0E0',
              },
              '& .MuiOutlinedInput-root': {
                borderRadius: '16px',
              },
            }}
              label="Username"
              variant="outlined"
              type="username"
              fullWidth
              value={form.username}
              onChange={handleChange}
              name="username"
            />
          </Box>

          <Box sx={{ marginBottom: '1rem', width: '300px', bgcolor: '#181818' ,borderRadius: '16px' }}>
            <TextField sx={{
              '& .MuiInputBase-root': {
                color: '#E0E0E0',
              },
              '& .MuiInputLabel-root': {
                color: '#E0E0E0',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#E0E0E0', 
              },
              '& .MuiOutlinedInput-root': {
                borderRadius: '16px', 
              },
            }}
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              value={form.password}
              onChange={handleChange}
              name="password"
            />
          </Box>

          <Button type="submit" variant="contained" color='primary' 
            sx={{
              marginTop: '1rem',
              width: '100px',
              }}>
            Sign In
          </Button>

          <Typography variant="h8" color="#E0E0E0" sx={{ marginTop: '0.5rem' }} fontFamily={'Roboto'}>
            No account? Sign up! 
          </Typography>
          
          <Button type="button" variant="contained" color='primary' onClick={() => navigateToRegister()} 
            sx={{ 
              marginTop: '0.2rem',
              width: '100px',}}>
            Sign Up
          </Button>
        </Box>
      </form>
    </Box>
  );
}
