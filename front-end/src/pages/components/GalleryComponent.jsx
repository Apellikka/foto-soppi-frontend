import { Grid2 } from '@mui/material';
import Box from '@mui/material/Box';
import { ImageCard } from './ImageCardComponent';

export const GalleryComponent = ({boxRef, appBarHeight, windowHeight, images}) => {
    return (
        <Box
        component="main"
        ref={boxRef}
        sx={{
          flexGrow: 1,
          bgcolor: '#303030',
          marginTop: `${appBarHeight}px`,
          padding: "1rem",
          height: `calc(${windowHeight}px - ${appBarHeight}px)`,
          overflowY: "auto"
        }}>

        <Grid2 container>
          {
            images.length > 0 &&
            images.map((item) => {
              return (<ImageCard src={item._links.image.href} />)
            })
          }
        </Grid2>

      </Box>
    );
}