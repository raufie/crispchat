//https://media.istockphoto.com/photos/backgrounds-photos-picture-id898660948?k=6&m=898660948&s=612x612&w=0&h=lriXtoQk9OnGhLKz-GG4OjQKrlixAbq4IBWdyegYqEw=
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn } from '../../actions/authActions/authActions';
import { Link } from "react-router-dom"
import './landing.css'
class Landing extends Component {
    constructor(props) {
        super(props);
    }
    state = {}
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signInUser(this.state);

    }
    render() {
        return (
            <div className="">
                <div className="browser-default center landing-front">
                    <div className="landing-front-content white container"  >
                        <h2>Hello There</h2>
                        <h3>You just chat, we make it crisp</h3>
                    </div>
                    <a className=" btn orange darken-4" href="#signup_form" style={{ marginTop: "5vh" }}>Sign In</a>
                </div>
                <div id="signup_form" className="row landing-front-2 white-text" style={{ paddingTop: ".1px", paddingLeft: "25vw", paddingRight: "25vw" }}>
                    <div style={{ marginTop: "25vh" }}>
                        <h2 className="center">Sign in</h2>
                    </div>
                    <form className="browser-default container center white-text white landing-front-2-content row" onSubmit={this.handleSubmit} >
                        <div className="row">
                            <label>UserName</label>
                            <input type="text" name="username" onChange={this.handleChange} required />
                        </div>
                        <div className="row">
                            <label>Password</label>
                            <input type="password" name="password" onChange={this.handleChange} required />
                        </div>
                        <Link to="/forgotpassword" className="left">Forgot Password?</Link>
                        <button className="btn orange darken-4 right" type="submit">Sign In</button><br />
                        <div className="red-text">{this.props.state.authReducer.error || null}</div>
                    </form>
                </div>
            </div>
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        signInUser: (credentials) => {
            dispatch(signIn(credentials))
        }
    }
}
const mapStateToProps = (state) => {
    return {
        state
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Landing);