import React from 'react';
import { FaWpforms } from 'react-icons/fa';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { SlLogout } from 'react-icons/sl';
import { RxDashboard } from 'react-icons/rx';

export interface ItemProps {
  title: string | 'Logout';
  path?: string;
  icon: JSX.Element;
}

const sidebarData: (ItemProps)[][] = [
  [
    { title: 'Dashboard', path: '/dashboard', icon: <RxDashboard /> },
    { title: 'Grupos', path: '/grupos', icon: <HiOutlineUserGroup /> },
    { title: 'Formulários', path: '/formularios', icon: <FaWpforms /> },
  ],
  [
    { title: 'Logout', icon: <SlLogout /> },
  ],
];

export default sidebarData;
