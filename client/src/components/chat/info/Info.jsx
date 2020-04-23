import React, { Component } from 'react';
import Menu from '@material-ui/core/Menu'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem';
import { Link, Redirect } from 'react-router-dom'
const Info = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} >
                <span className="material-icons white-text right" style={{ cursor: "pointer" }}>info</span>

            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}><Link to="/report">Report User</Link></MenuItem>
            </Menu>
        </div>

    )


}
export default Info;