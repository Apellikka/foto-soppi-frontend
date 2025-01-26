import React from 'react';
import { TextField, Button, Box, Typography, Icon } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

export default function Login() {
  return (
    <Box sx={{
      bgcolor: "#181818",
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
    }}>
      
      <form>
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
            />
          </Box>

          <Button type="submit" variant="contained" color='primary'>
            Sign In
          </Button>
          
        </Box>
      </form>
    </Box>
  );
}