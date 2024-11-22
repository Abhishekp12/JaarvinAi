import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SmartToyIcon from '@mui/icons-material/SmartToy'; 

export default function Header() {
    return (
        <Box sx={{ flexGrow: 1 , marginBottom:"1px",paddingBottom:"1px"}}>
            <AppBar  sx={{
               
                zIndex: '9999', backgroundColor: '#001e3c',
                height:"64px"
            }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <SmartToyIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Jaarvin AI
                    </Typography>
                    <Button color="inherit">Logout</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
