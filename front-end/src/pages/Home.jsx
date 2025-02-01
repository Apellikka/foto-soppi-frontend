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
import SearchComponent from './components/SearchComponent';
import {getImages, setLoadingIfScrollAtBottom, debounce} from '../AppUtils'
import { GalleryComponent } from './components/GalleryComponent';

const drawerWidth = 240;
const appBarHeight = 64;

export default function Home() {
    const [page, setPage] = useState(0);
    const [images, updateImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    const boxRef = useRef(0);

    useEffect(() => {
        getImages(page, setLoading, updateImages);
    }, [page])

    useEffect(() => {
        const box = boxRef.current;
        const debouncedScrollHandler = debounce(() => setLoadingIfScrollAtBottom(boxRef, loading, setLoading), 500);

        if (box) {
            box.scrollTop = 0; // Resets scroll to top on page reload
            box.addEventListener('scroll', debouncedScrollHandler);
        }

        return () => {
            if (box) {
                box.removeEventListener('scroll', debouncedScrollHandler);
            }
        };
    }, []);

    useEffect(() => {
        if (loading) {
            setPage((prevPage) => prevPage + 1);
        }
    }, [loading]);

    useEffect(() => {
        const handleResize = () => {
            setWindowHeight(window.innerHeight);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return(
        <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: `calc(100% - ${drawerWidth}px)`,
            ml: `${drawerWidth}px`,
            bgcolor: "#303030",
          }}>
  
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
            }}>
            <SearchComponent />
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
          anchor="left">
  
          <Toolbar sx={{ color: "#E0E0E0", typography: "h1", fontSize: "2em" }}>Foto-Soppi</Toolbar>
  
          <Divider sx={{ bgcolor: "white" }} />
  
          <List sx={{ color: "#E0E0E0" }}>
            {['All', 'Folders', 'Favorites'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton sx={{ ":hover": { bgcolor: "#303030" }}} disabled={true}>
                  <ListItemIcon sx={{ color: "#E0E0E0" }}>
                    {index === 0 ? <PhotoAlbumIcon /> : index === 1 ? <FolderIcon /> : <FavoriteIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
  
        </Drawer>
        <GalleryComponent 
          boxRef={ boxRef }
          appBarHeight={ appBarHeight } 
          windowHeight={ windowHeight } 
          images={ images }>
        </GalleryComponent>  
      </Box>
    )
}