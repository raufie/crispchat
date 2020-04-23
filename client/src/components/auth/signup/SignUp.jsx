import React, { Component } from 'react';
import { signUp } from '../../../actions/authActions/authActions';
import { getUser } from '../../../actions/authActions/authActions';
import { signIn } from '../../../actions/authActions/authActions';
import { connect } from 'react-redux'
import axios from 'axios';
class SignUp extends Component {

    constructor(props) {
        super(props)
    }
    state = {
        bio: "",
        password: "",
        usernameStatus: "",
        username: ""
    }
    handleChange = (e) => {
        console.log(this.state)
        this.setState({
            [e.target.name]: e.target.value
        })
        if (e.target.name === "username") {
            this.setState({
                usernameStatus: "loading"
            })
            this.props.validateUsername(e.target.value);
            if (this.props.authReducer.userAlreadyExists) {
                this.setState({
                    usernameStatusClass: "red-text",
                    usernameStatus: "cancel"
                })
            } else {
                this.setState({
                    usernameStatusClass: "green-text",
                    usernameStatus: "done"
                })
            }
        }
    }
    handleFileChange = (e) => {
        this.setState({
            [e.target.name]: e.target.files[0]
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        //////////////////////THIS IS TO BE SHIFTED TO REDUX
        // let data = new FormData();
        // data.append("file", this.state.image);

        this.props.createProfile(this.state);
        /////////////////////ABOVE CODE IS ONLY FOR EXPERIMENTATION

    }
    render() {
        let errorMessage = "";
        let passErrorMessage = "";
        let userNameStatus = "";
        //giviuing appropruate username status



        //giving approppriate error nessage
        if (this.props.authReducer.signUpError) {
            errorMessage = "UserName Already Taken"
        }
        if (!this.state.password) {
            passErrorMessage = "Password Less than 5"
        }
        if (this.state.password && this.state.password.length < 5) {
            passErrorMessage = "Password Length is Less than 5"
        }
        if (this.props.authReducer.profileData) {
            this.props.signInUser({
                username: this.state.username,
                password: this.state.password
            });
            window.location.reload();
        }
        return (
            <div className="container" style={{ paddingTop: "7vh", }}>
                <h3 className="brand-logo center white-text" style={{ paddingTop: "4vh", paddingBottom: "4vh", textShadow: "0 0 1vw #e0f7fa, 0 0 5px #0000FF" }}>Welcome! You're New  Here</h3>
                <div >
                    <form onSubmit={this.handleSubmit} className="white container row" style={{ paddingBottom: "2vh", paddingTop: ".1px", paddingLeft: "5vw", paddingRight: "5vw", borderRadius: "2vw" }}>
                        <h4 className="center">Create Profile</h4>
                        <div className=" row">
                            <label className=" col s2 black-text">Username</label>

                            <input className="col s8" name="username" onChange={this.handleChange} type="text" required />
                            <p className="col s2">
                                {
                                    this.props.authReducer.userAlreadyExists && this.props.authReducer.userAlreadyExists !== undefined ? <span className="material-icons red-text">cancel</span> : <span className="material-icons green-text darken-4">{
                                        this.state.username.length < 4 ? "cancel" : "done"
                                    }</span>

                                }

                            </p>
                        </div>
                        <div className=" row" >
                            <label className=" col s2 black-text">Password</label>
                            <input className="col s8" name="password" onChange={this.handleChange} type="password" required />
                            <p className="col s2 red-text">{passErrorMessage}</p>
                        </div>
                        <div>
                            <label className="black-text">Picture</label>
                            <input name="image" onChange={this.handleFileChange} type="file" required />
                        </div>
                        <div>
                            <label className="black-text">Bio</label>
                            <textarea name="bio" onChange={this.handleChange} type="text" required />
                        </div>
                        <div>
                            <label className="black-text">Security Question</label>
                            <input name="securityQuestion" onChange={this.handleChange} type="text" required />
                        </div>
                        <div>
                            <label className="black-text">Answer</label>
                            <input name="answer" onChange={this.handleChange} type="text" required />
                        </div>
                        <button className="btn orange darken-4 right" type="submit">Create Profile</button><br />
                        <div>{this.props.authReducer.userAlreadyExists ? "User already Exists" : null}</div>
                    </form>

                </div>
                <h3 className="center white-text" style={{ paddingTop: "8vh", paddingBottom: "8vh", textShadow: "0 0 1vw #e0f7fa, 0 0 5px #0000FF" }}>"You just chat, we make it crispt"</h3>
            </div>


        )
    }


}
const mapDispatchToProps = (dispatch) => {
    return {
        createProfile: (credentials) => {
            dispatch(signUp(credentials))
        },
        validateUsername: (username) => {
            dispatch(getUser(username))
        },
        signInUser: (credentials) => {
            dispatch(signIn(credentials))
        }
    }
}
const mapStateToProps = (state) => {
    console.log(state.authReducer)
    return state;
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);