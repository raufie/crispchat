import React, { Component } from 'react';
import Menu from '@material-ui/core/Menu'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../../actions/authActions/authActions';
const ProfileDropDown = (props) => {


    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogOut = () => {
        props.initiateDispatch();
        window.location.reload();

    }
    return (
        <div>
            {props.data.name}
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} >
                <img src={`http://localhost:4000/api/files/${props.userData.image}`} style={{ height: "6vh", borderRadius: "5vw" }} />
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}><Link to="/settings">Settings</Link></MenuItem>
                <MenuItem onClick={handleClose}><Link to="#" onClick={handleLogOut}>Logout</Link></MenuItem>
            </Menu>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        userData: state.authReducer.profileData
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        initiateDispatch: () => {
            dispatch(signOut())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileDropDown);