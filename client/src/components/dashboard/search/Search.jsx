import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchUser, addAsContact, loadContacts, contactAlreadyExists } from '../../../actions/dashboardActions/dashboardActions'
class Search extends Component {
    state = {
        usernameEntered: ""
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.searchUser(this.state.username);
        this.setState({
            usernameEntered: this.state.username
        })
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleAddAsContact = (e) => {


        this.props.loadedContacts && this.props.contactAlreadyExists(this.props.loadedContacts, e.target.name);


        if (e.target.name === this.props.profileData._id) {
            this.setState({
                errorMessage: "CAN NOT CHAT WITH YOURSELF"
            })
        }
        else if (this.props.contactsError) {
            console.log("************")
            this.props.addAsContact(e.target.name, this.props.profileData._id);
            this.props.loadContacts(this.props.profileData.username)
        } else {
            //error message
            this.setState({
                errorMessage: "CAN NOT ADD THE SAME USER TWICE"
            })
        }


    }
    render() {
        let searchResultsJsx = null;
        if (this.props.searchedUser) {
            searchResultsJsx = <div className="row white" style={{ margin: "0 2vw", borderRadius: "5vw", cursor: "pointer", }} >
                <div className=" col s11">
                    <img className="col left" src={`http://localhost:4000/api/files/${this.props.searchedUser.image}`} style={{ width: "5vw", borderRadius: "50%" }} />
                    <h6 >{this.props.searchedUser.username}</h6>
                    <p style={{ fontSize: ".7vw" }}>{this.props.searchedUser.bio}</p>
                </div>
                <div className=" rightcol s1">
                    <button className="btn blue darken-4 right " name={this.props.searchedUser._id} onClick={this.handleAddAsContact}>Add As Friend +</button>
                </div>
                {this.state.errorMessage}
            </div>
        } else {
            if (this.state.usernameEntered.length > 0) {
                searchResultsJsx = <div>No User Found with that username</div>
            }
        }

        return (
            <div className="grey lighten-3" style={{ height: "60vh" }}>

                <div className="row center">
                    <div className="center col s2 offset-s4" style={{ fontSize: "1.5vw" }}>Search</div>
                    <span className="material-icons large col s2 center" style={{ fontSize: "2vw" }}>search</span>
                </div>
                <form className="container" onSubmit={this.handleSubmit}>
                    <label>Search</label>
                    <input name="username" type="text" onChange={this.handleChange} />
                    <button className="btn orange darken-4">Search</button>
                </form>
                <div className="container">
                    Search Results
                    {searchResultsJsx}
                </div>
            </div>
        )
    }


}
const mapStateToProps = (state) => {

    console.log(state.dashboardReducer)
    return {
        //loadeduserdata
        searchedUser: state.dashboardReducer.searchedUser,
        profileData: state.authReducer.profileData,
        loadedContacts: state.dashboardReducer.loadedContacts,
        contactsError: state.dashboardReducer.contactsError,
        contactExists: state.dashboardReducer.contactExists
    }
}
const mapDispatchToProps = (dispatch) => {
    //search user
    return {
        searchUser: (username) => {
            dispatch(searchUser(username))
        },
        addAsContact: (userId, currentUserId) => {
            dispatch(addAsContact(userId, currentUserId))
        },
        loadContacts: (username) => {
            dispatch(loadContacts(username))
        },
        contactAlreadyExists: (loadedContacts, selecteduser) => {
            dispatch(contactAlreadyExists(loadedContacts, selecteduser))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Search);