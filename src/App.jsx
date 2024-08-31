import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';

export default function App() {
  return (
    <div>
      <Drawer variant="permanent">
        <Box>
          <List>
            <ListItemButton>
              Eka
            </ListItemButton>
            <ListItemButton>
              Toka
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
    </div>
  );
}