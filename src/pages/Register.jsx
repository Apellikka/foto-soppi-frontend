import { TextField, Button, Box, Typography, Icon } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const REGISTER_API_URL = import.meta.env.VITE_API_URL_REGISTER;

export default function Register() {

  const [invalidRegister, setInvalidRegister] = useState(false);
  const [registerErrorMessage, setRegisterErrorMessage] = useState('');

  const navigate = useNavigate();
  const navigateToLogin = () => {
    navigate('/login');
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

  async function handleSubmit(event) {
    event.preventDefault(); 
    console.log('username:', form.username);
    console.log('password:', form.password);
    // TODO: Validate form data here 
    
    // Here send the form data to backend API for registration
    const response = await fetch(REGISTER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    });

    const body = await response.json();

    if (response.status === 201) {
      setForm({
        username: '',
        password: ''
      });
      setInvalidRegister(false);
      navigateToLogin();
    }
    else if (response.status === 409) {
      setInvalidRegister(true);
      setRegisterErrorMessage('Username already exists. Please choose a different one.');
    }
    else {
      setInvalidRegister(true);
      setRegisterErrorMessage('Registration failed. Please try again later.\n' + 'Status code ' + response.status + ': ' + body.message);
    }
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
          padding: '2rem',
          props: { invalidRegister }
        }}>

          <Typography variant="h4" color="#E0E0E0" sx={{ marginBottom: '2rem' }} fontFamily={'Roboto'}>
            Foto-Soppi
          </Typography>

          <PhotoCamera sx={{ fontSize: '80px', color: '#181818', marginBottom: '1rem' }} />

          <Typography variant="h5" color="#E0E0E0" sx={{ marginBottom: '1rem' }}>
            Sign Up
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
              name="username"
              label="Username"
              variant="outlined"
              type="username"
              value={form.username}
              onChange={handleChange}
              fullWidth
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
              name="password"
              label="Password"
              variant="outlined"
              type="password"
              value={form.password}
              onChange={handleChange}
              fullWidth
            />
          </Box>

          {invalidRegister && (
            <Typography variant="body2" color="red" sx={{ marginBottom: '1rem', width: '300px', textAlign: 'center' }}>
              {registerErrorMessage}
            </Typography>
          )}

          <Button type="submit" variant="contained" color='primary'
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