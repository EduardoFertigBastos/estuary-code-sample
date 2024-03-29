import React, { Dispatch, SetStateAction } from 'react';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MUIDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';

import List from './List';
import { DrawerHeader, drawerWidth } from './MUIstyle';

interface IProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}

const Drawer:React.FC<IProps> = ({ setOpen, open }) => {
  const theme = useTheme();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <MUIDrawer
      sx={{
        width: drawerWidth,
        position: 'absolute',
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </DrawerHeader>
      <List open={open} handleDrawerClose={handleDrawerClose} />
    </MUIDrawer>
  );
};

export default Drawer;
