import * as React from 'react';
import {useState, useEffect, useRef} from 'react';
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
  justifyContent: 'center'
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
  objectFit: "cover",
  
  '& img': {
    objectFit: "cover",
    width: "100%",
    height: "100%",
    margin: "5px",
  }
}))

export default function FotoSoppi() {
  const [page, setPage] = useState(0);
  const [images, updateImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const boxRef = useRef(0);

  function getImages()
  {
    const apiUrl = `http://localhost:8080/images/all?page=${page}`;

    fetch(apiUrl)
    .then(res => res.json())
    .then((data) => {
      if(!data._embedded || !data._embedded.imageList)
      {
        console.warn("No more images found in response.");
        setLoading(false);
        return;
      }
      const fetchedImages = data._embedded.imageList;
      if(page === 0) updateImages([]); // If page is reloaded we want to reset the array so there'll be no duplicates
      updateImages((images) => [...images, ...fetchedImages]);
      setLoading(false);
    })
  }

  useEffect(() => {
    getImages();
  }, [page])
  
  useEffect(() => {
    const box = boxRef.current;
    if (box) {
      box.scrollTop = 0; // Resets scroll to top on page reload
      box.addEventListener('scroll', debounce(handleScroll, 500));
    }
    return () => {
      if (box) {
        box.removeEventListener('scroll', debounce(handleScroll, 500));
      }
    };
  }, []);

  
  const handleScroll = () => {
    const box = boxRef.current;
    if(!box) return;
    const isAtBottom = box.scrollHeight - box.scrollTop === box.clientHeight;
    if(isAtBottom && !loading) 
    {
      setLoading(true);
    }
  };

  function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }

  useEffect(() => {
    if(loading)
    {
      setPage((prevPage) => prevPage+1);
    }
  }, [loading]);

  // Update window height when resizing
  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Box sx={{ display: 'flex'}}>
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
        ref={boxRef}
        sx={{
          flexGrow: 1, 
          bgcolor: '#303030',
          marginTop: `${appBarHeight}px`,
          padding: "1rem",
          height: `calc(${windowHeight}px - ${appBarHeight}px)`,
          overflowY: "auto"}}
      >
        <Grid2 
        container>
          {images.length > 1
          && images.map((item) => {
            return (
              <ImageGridItem>
                <img src={item._links.image.href} height={"100%"}></img>
              </ImageGridItem>
            )
          })}
        </Grid2>
      </Box>
    </Box>
  );
}