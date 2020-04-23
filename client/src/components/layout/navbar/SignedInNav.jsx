import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import ProfileDropDown from './ProfileDropDown';
const SignedInNav = (props) => {


    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div>
            <nav>
                <div className="nav-wrapper indigo darken-4">
                    <Link to="/" className="brand-logo center">CrispChat<span className="material-icons ">whatshot</span></Link>
                    <ul className="right ">
                        <li><ProfileDropDown data={{ name: props.userData.username }} /></li>

                    </ul>
                </div>
            </nav>
        </div>
    )
}
const mapStateToProps = (state) => {
    // console.log(state.authReducer.profileData.username)
    return {
        userData: state.authReducer.profileData
    }

}
export default connect(mapStateToProps)(SignedInNav);