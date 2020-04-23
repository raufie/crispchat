import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../../actions/authActions/authActions';
import { Redirect } from 'react-router-dom'
class ForgotPassword extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        errorMessage: "No User Found",
        redirect: ""
    }
    handleSubmit = (e) => {
        e.preventDefault();

        this.props.getRequestedUser(this.state.username)
    }
    handleChange = (e) => {

        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSecuritySubmit = (e) => {
        e.preventDefault();
        if (this.state.answer === this.props.requestedUser.answer) {
            this.setState({
                redirect: true
            })
        } else {
            console.log(":(:(:(:(")
        }
    }
    render() {
        let results = this.props.requestedUser ?
            <form onSubmit={this.handleSecuritySubmit}>
                <div className="center">
                    <h4><b>UserFound:</b>{this.state.username}</h4>
                </div>
                <h5><b>Security Question: </b>{this.props.requestedUser.securityQuestion}</h5>
                <div className="row">
                    <h5><b>Answer:</b></h5>
                    <input name="answer" type="text" onChange={this.handleChange} required />
                </div>
                <button className="btn orange darken-4" type="submit">Submit</button>
            </form> :
            <div>{this.state.errorMessage}</div>
        if (!this.state.redirect) {
            return (
                <div className="container" style={{ paddingTop: "7vh", minHeight: "90vh" }}>
                    <h3 className="brand-logo center white-text" style={{ paddingTop: "4vh", paddingBottom: "4vh", textShadow: "0 0 1vw #e0f7fa, 0 0 5px #0000FF" }}>Forgot Password? No Worries</h3>
                    <div className="white" style={{ paddingBottom: "3vh", paddingTop: ".1px", paddingLeft: "5vw", paddingRight: "5vw", borderRadius: "2vw" }}>
                        <h3>Find by username</h3>
                        <form onSubmit={this.handleSubmit}>
                            <div>
                                <label>username</label>
                                <input name="username" onChange={this.handleChange} type="text" required />
                            </div>
                            <button className="btn orange darken-4" type="submit">Find</button>

                        </form>
                        {results}
                    </div>

                </div >

            )
        } else {
            return (
                <Redirect to={{
                    pathname: `/changepassword/${this.props.requestedUser.username}`,
                    state: this.props.requestedUser.username


                }} />

            )
        }
    }
}
const mapStateToProps = (state) => {
    console.log(state)
    return {
        requestedUser: state.authReducer.requestedUser
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getRequestedUser: (username) => {
            dispatch(getUser(username))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);