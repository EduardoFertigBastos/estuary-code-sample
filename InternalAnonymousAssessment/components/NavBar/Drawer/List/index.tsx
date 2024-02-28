import React, { Fragment, useCallback } from 'react';

import {
  Divider, ListItem, ListItemButton, ListItemIcon, ListItemText,
  List as ListMUI,
} from '@mui/material';

import sidebarData from 'components/layout/NavBar/sidebarData';

import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Link } from './styles';

interface IProps {
  open: boolean;
  handleDrawerClose: () => void;
}

const List: React.FC<IProps> = ({ open, handleDrawerClose }) => {
  const router = useRouter();

  const handlePressEnter = useCallback((e: any, item: any) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      handleDrawerClose();
      router.push(item.path as string);
      e.stopPropagation();
    }
  }, []);

  async function handleClick(item: any) {
    if (item.title === 'Logout') {
      signOut();
    }
  }

  function listItem(item: any) {
    return (
      <ListItemButton
        sx={{
          minHeight: 48,
          justifyContent: open ? 'initial' : 'center',
          px: 2.5,
        }}
        onClick={() => handleClick(item)}
      >
        <ListItemIcon sx={{
          minWidth: 0,
          mr: open ? 3 : 'auto',
          justifyContent: 'center',
        }}
        >
          {item.icon}
        </ListItemIcon>
        <ListItemText primary={item.title} sx={{ opacity: open ? 1 : 0 }} />
      </ListItemButton>
    );
  }
  return (
    <>
      {sidebarData.map((group, i) => (
        <Fragment key={i}>
          <Divider />
          <ListMUI>
            {group.map((item, index) => (
              <ListItem
                key={index}
                disablePadding
                sx={{ display: 'block' }}
                onClick={handleDrawerClose}
                onKeyDown={(e) => handlePressEnter(e, item)}
              >
                {item.title === 'Logout'
                  ? listItem(item)
                  : (
                    <Link href={item.path as string}>
                      {listItem(item)}
                    </Link>
                  )}
              </ListItem>
            ))}
          </ListMUI>
        </Fragment>
      ))}
    </>
  );
};

export default List;
