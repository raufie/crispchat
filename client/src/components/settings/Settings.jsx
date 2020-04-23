import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changePassword, changeSecurityQuestion } from '../../actions/settingsActions/settingsActions';
class Settings extends Component {
    constructor(props) {
        super(props)
    }
    state = {}
    handleChangePasswordSubmit = (e) => {
        e.preventDefault();
        if (this.state.newpassword === this.state.retypedpassword) {
            this.props.changePassword(this.props.authReducer.profileData.username, this.state.oldpassword, this.state.newpassword)
        } else {
            alert("Newpassword and Retyped passwords are not same")
        }
    }
    handleQuestionSubmit = (e) => {
        e.preventDefault();
        this.props.changeSecurityQuestion(this.props.authReducer.profileData._id, this.state.newquestion, this.state.answer);

    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        return (
            <div>
                <h3 className="brand-logo center white-text" style={{ paddingTop: "2vh", paddingBottom: "2vh", textShadow: "0 0 1vw #e0f7fa, 0 0 5px #0000FF" }}>
                    Settings<span className="material-icons" style={{ fontSize: "2vw" }}>settings</span></h3>
                <div className="container row white" style={{ padding: "1vh " }}>
                    <h4 className="brand-logo center black-text" style={{ paddingTop: "2vh", paddingBottom: "2vh", textShadow: "0 0 1vw #e0f7fa, 0 0 5px #0000FF" }}>
                        Change Password</h4>
                    <form onSubmit={this.handleChangePasswordSubmit} style={{ margin: "1vh 5vw" }}>
                        <div>
                            <label>Old Password</label>
                            <input type="password" name="oldpassword" onChange={this.handleChange} required></input>
                        </div>
                        <div>
                            <label>New Password</label>
                            <input type="password" name="newpassword" onChange={this.handleChange} required></input>
                        </div>
                        <div>
                            <label>Retype Password</label>
                            <input type="password" name="retypedpassword" onChange={this.handleChange} required></input>
                        </div>
                        <button className="btn right blue darken-4" type="submit">Change Password</button>
                        {this.props.settingsReducer.passwordChanged ? <div>Password Successfully changed</div> : null}
                    </form>
                    <h4 className="brand-logo center black-text" style={{ paddingTop: "2vh", paddingBottom: "2vh", textShadow: "0 0 1vw #e0f7fa, 0 0 5px #0000FF" }}>
                        Change Security Question</h4>
                    <form onSubmit={this.handleQuestionSubmit} style={{ margin: "1vh 5vw" }}>
                        <div>
                            <label>New Question</label>
                            <input type="text" name="newquestion" onChange={this.handleChange} required></input>
                        </div>
                        <div>
                            <label>answer</label>
                            <input type="text" name="answer" onChange={this.handleChange} required></input>
                        </div>
                        <button className="btn right blue darken-4" type="submit">Change Security Question</button>
                    </form>
                    {this.props.settingsReducer.securityChanged !== undefined && this.props.settingsReducer.securityChanged ? <div>Password Succesfully Changed</div> : null}
                </div>
            </div>


        )
    }
}
const mapStateToProps = (state) => {
    console.log(state)
    return state;
}
const mapDispatchToProps = (dispatch) => {
    return {
        changePassword: (username, oldpassword, newpassword) => {
            dispatch(changePassword(username, oldpassword, newpassword))
        },
        changeSecurityQuestion: (id, securityQuestion, answer) => {
            dispatch(changeSecurityQuestion(id, securityQuestion, answer))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Settings);