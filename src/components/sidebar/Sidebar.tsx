import React, { useState } from 'react';
import {
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    IconButton,
    Tooltip,
    Box,
} from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { NavLink } from 'react-router-dom';

type MenuList = {
    item: string;
    icon: React.ReactNode;
    path: string;
};

interface SidebarProps {
    setCheckOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MenuLists: MenuList[] = [
    { item: "User", icon: <PersonOutlineIcon />, path: "" },
    { item: "Camera", icon: <PhotoCameraIcon />, path: "camera" },
    { item: "Configuration", icon: <SettingsIcon />, path: "configuration" },
];

const Sidebar: React.FC<SidebarProps> = ({ setCheckOpen }) => {
    const [open, setOpen] = useState<boolean>(true);

    const handleToggleSidebar = () => {
        setOpen(!open);
        setCheckOpen(!open);
    };

    return (
        <Drawer
            variant="permanent"
            open={open}
            sx={{
                width: open ? 240 : 60,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: open ? 240 : 60,
                    transition: 'width 0.3s ease-in-out',
                    backgroundColor: '#001e3c',
                    color: 'white',
                    overflow: "hidden",
                },
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: open ? 'space-between' : 'center',
                    padding: open ? '0 16px' : '0',
                    marginTop: '10px',
                    transition: 'all 0.3s ease',
                }}
            >
                {open ? (
                    <Tooltip title="Collapse" placement="right">
                        <IconButton
                            onClick={handleToggleSidebar}
                            sx={{
                                color: 'white',
                                position: 'absolute',
                                top: "10%",
                                right: '2%',
                                zIndex: 1300,
                            }}
                        >
                            <ArrowBackIcon />
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Tooltip title="Expand" placement="right">
                        <IconButton
                            onClick={handleToggleSidebar}
                            sx={{
                                color: 'white',
                                position: 'absolute',
                                top: '10%',
                                left: -3,
                                zIndex: 1300,
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Tooltip>
                )}
            </Box>

            <List sx={{ marginTop: '85px' }}>
                {MenuLists.map((list) => (
                    open ? (
                        <NavLink to={list?.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <ListItemButton key={list?.item} sx={{ '&:hover': { backgroundColor: '#0d47a1' } }}>
                            <ListItemIcon sx={{ color: 'white' }}>{list?.icon}</ListItemIcon>
                                <ListItemText primary={list?.item} />
                        </ListItemButton>
                        </NavLink>

                    ) : (
                        <NavLink to={list?.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Tooltip key={list?.item} title={list?.item} placement="right">
                            <ListItemButton sx={{ '&:hover': { backgroundColor: '#0d47a1' } }}>
                                    <ListItemIcon sx={{ color: 'white' }}>{list?.icon}</ListItemIcon>
                            </ListItemButton>
                        </Tooltip>
                        </NavLink>

                    )
                ))}
            </List>
        </Drawer>
    );
};

export default Sidebar;
