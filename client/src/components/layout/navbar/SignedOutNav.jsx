import React from 'react';
import Button from '@material-ui/core/Button'
import { Link, NavLink } from 'react-router-dom'
const SignedOutNav = () => {
    return (
        <nav style={{ position: 'fixed' }}>
            <div className="nav-wrapper  indigo darken-4">
                <div className="container ">
                    <Link className="brand-logo center" to="/">CrispChat<span className="large material-icons ">whatshot</span></Link>
                </div>
                <ul className="right ">
                    <li><Link to="/signup" className="btn orange darken-4">Create Profile</Link></li>
                </ul>
            </div>
        </nav>
    )

}
export default SignedOutNav;