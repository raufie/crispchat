import React, { Component } from 'react';
import { connect } from 'react-redux';
import { newPassword } from '../../../actions/settingsActions/settingsActions'
// /???///MUST USE PROPS DATA PASSED FROM PREVIOUS COMP, OTHERWISE ANYONE CAN EDIT ANYONE"S DATA< WE ONLY WANT THAT PERSON WHO HAS ANSWERERED
///THE QUESTION CORRECTLY
class ChangePassword extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        errorMessage: ""
    }
    handleSubmit = (e) => {
        console.log(this.props)
        e.preventDefault();
        if (this.state.newpassword === this.state.retypedpassword) {
            //good
            this.props.newPassword(this.props.location.state, this.state.newpassword);
            this.setState({
                errorMessage: "Password Changed "
            })
        } else {
            this.setState({
                errorMessage: "New password must match with the Retyped Password"
            })
        }

    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        let jsx = <div>{this.state.errorMessage}</div>;
        if (this.props.settingsReducer.passwordChanged) {
            jsx = <div>{"Password Changed "}</div>
        } else {
            jsx = <div>"Password not changed</div>
        }
        if (this.props.location.state && this.props.location.state === this.props.match.params.id)
            return (
                <div style={{ height: "80vh", marginTop: "4%" }}>
                    <h4 className="brand-logo center black-text" style={{ paddingTop: "2vh", paddingBottom: "2vh", textShadow: "0 0 1vw #e0f7fa, 0 0 5px #0000FF" }}>
                        Change Password</h4>
                    <div className="white container" style={{ padding: "1%" }}>
                        for {this.props.match.params.id}
                        <form onSubmit={this.handleSubmit} style={{ margin: "5%", paddingBottom: "0.1px" }}>

                            <div>
                                <label>New Password</label>
                                <input type="password" name="newpassword" onChange={this.handleChange} required></input>
                            </div>
                            <div>
                                <label>Retype Password</label>
                                <input type="password" name="retypedpassword" onChange={this.handleChange} required></input>
                            </div>
                            <button className="btn right blue darken-4" type="submit" >Change Password</button>
                        </form>
                        {jsx}
                    </div>
                </div >
            )
        else {
            return (<div className="white" style={
                {
                    height: "90vh",
                    paddingTop: ".1",
                    backgroundImage: "url(https://c4.wallpaperflare.com/wallpaper/1016/946/462/half-life-2-minimalism-lambda-wallpaper-preview.jpg)",
                    backgroundSize: "100%"

                }}>

                <h1 style={{ paddingTop: "10vh", fontSize: "15vh" }}>404 not found</h1>
                <p style={{ width: "50vw", fontSize: "5vh" }}>The page you have requested doesn't exist or you are not authorized to access</p>
            </div>
            )
        }
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        newPassword: (username, newpassword) => {
            dispatch(newPassword(username, newpassword))
        }
    }
}
const mapStateToProps = (state) => {
    console.log(state)
    return state
}
export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);