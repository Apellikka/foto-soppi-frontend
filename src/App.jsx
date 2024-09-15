import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PhotoAlbumIcon from '@mui/icons-material/PhotoAlbum';
import FolderIcon from '@mui/icons-material/Folder';
import FavoriteIcon from '@mui/icons-material/Favorite'
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import "./App.css"
import { Grid2 } from '@mui/material';

const drawerWidth = 240;
const appBarHeight = 64;

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  height: '100%',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    height: '100%', 
  },
}));


const ImageGridItem = styled('div')(({}) => ({
  margin: "5px",
  height: "300px",
  width: "300px",
  objectFit: "cover"
}))


export default function FotoSoppi() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ 
          width: `calc(100% - ${drawerWidth}px)`, 
          ml: `${drawerWidth}px`, 
          bgcolor: "#303030",
        }}
      >
        <Toolbar
          sx={{
            px: 0, 
            height: appBarHeight, 
            display: 'flex',
            alignItems: 'center',
            [`@media (min-width: 600px)`]: {
              paddingLeft: '0px',
              paddingRight: '0px',
            },
          }}
        >
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box', 
            bgcolor: "#181818"
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar sx={{ color: "#E0E0E0", typography: "h1", fontSize: "2em" }}>Foto-Soppi</Toolbar>
        <Divider sx={{ bgcolor: "white" }} />
        <List sx={{ color: "#E0E0E0" }}>
          {['All', 'Folders', 'Favorites'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton sx={{ ":hover": { bgcolor: "#303030" } }}>
                <ListItemIcon sx={{ color: "#E0E0E0" }}>
                  {index === 0 ? <PhotoAlbumIcon/> : index === 1 ? <FolderIcon/> : <FavoriteIcon/>}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1, 
          bgcolor: '#303030',
          marginTop: `${appBarHeight}px`,
          padding: "1rem"}}
      >
        <Grid2 container>
          <ImageGridItem>
            <img src='https://images.unsplash.com/photo-1551963831-b3b1ca40c98e' width={"100%"} height={"100%"}></img>
          </ImageGridItem>
          <ImageGridItem>
            <img src='https://images.unsplash.com/photo-1551782450-a2132b4ba21d' width={"100%"} height={"100%"}></img>
          </ImageGridItem>
          <ImageGridItem>
            <img src='https://images.unsplash.com/photo-1522770179533-24471fcdba45' width={"100%"} height={"100%"}></img>
          </ImageGridItem>
          <ImageGridItem>
            <img src='https://images.unsplash.com/photo-1522770179533-24471fcdba45' width={"100%"} height={"100%"}></img>
          </ImageGridItem>
          <ImageGridItem>
            <img src='https://images.unsplash.com/photo-1522770179533-24471fcdba45' width={"100%"} height={"100%"}></img>
          </ImageGridItem>
          <ImageGridItem>
            <img src='https://images.unsplash.com/photo-1522770179533-24471fcdba45' width={"100%"} height={"100%"}></img>
          </ImageGridItem>
          <ImageGridItem>
            <img src='https://images.unsplash.com/photo-1522770179533-24471fcdba45' width={"100%"} height={"100%"}></img>
          </ImageGridItem>
          <ImageGridItem>
            <img src='https://images.unsplash.com/photo-1522770179533-24471fcdba45' width={"100%"} height={"100%"}></img>
          </ImageGridItem>
          <ImageGridItem>
            <img src='https://images.unsplash.com/photo-1522770179533-24471fcdba45' width={"100%"} height={"100%"}></img>
          </ImageGridItem>
        </Grid2>
      </Box>
    </Box>
  );
}
