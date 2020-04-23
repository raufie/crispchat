import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios'
import { loadContacts } from '../../../actions/dashboardActions/dashboardActions';
class Recents extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        people: [{
            name: "Bill Gates",
            image: "https://victorygirlsblog.com/wp-content/uploads/2019/11/Bill_Gates_square.jpg",
            lastMessage: "I'm really interested in the work you're doing, let's talk terms",
            read: false
        },
        {
            name: "Elon Musk",
            image: "https://www.biography.com/.image/t_share/MTY2MzU3Nzk2OTM2MjMwNTkx/elon_musk_royal_society.jpg",
            lastMessage: "You guys are doing a great job at technocrats. Much appreciated",
            read: false
        },
        {
            name: "Jack Dorsey",
            image: "https://thumbor.forbes.com/thumbor/fit-in/416x416/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5d8aca3e6de3150009a505c1%2F0x0.jpg%3Fbackground%3D000000%26cropX1%3D114%26cropX2%3D2537%26cropY1%3D240%26cropY2%3D2662",
            lastMessage: "Cool stuff yo",
            read: true
        },
        {
            name: "Marissa Mayer",
            image: "https://conferences.law.stanford.edu/directorscollege2017/wp-content/uploads/sites/21/2016/09/Mayer_Marissa_Square.jpg",
            lastMessage: "This much effort into making the world open source is much appreciated, looking forward to working with you",
            read: true
        }

        ]
    }
    handleChatClick = () => {

    }
    componentDidMount() {

        this.props.profileData && this.props.loadContacts(this.props.profileData.username)
        console.log(this.props)

    }
    reload = () => {
        this.props.profileData && this.props.loadContacts(this.props.profileData.username)
    }
    render() {

        const peopleJsx = this.props.loadedContacts && this.props.profileData && this.props.loadedContacts.length === this.props.profileData.data.contacts.length && this.props.loadedContacts.map(contact => {


            return (
                <Link to={{
                    pathname: `/chat/${contact.conversation}`,
                    state: { contact }

                }} style={{ textDecoration: "none", color: "black" }}>
                    <div className="row white" style={{ margin: "0 2vw", borderRadius: "5vw", cursor: "pointer" }}
                        person={contact.user}
                        onClick={this.handleChatClick}>
                        <img className="col left" src={`http://localhost:4000/api/files/${contact.user.image}`} style={{ width: "5vw", borderRadius: "50%" }} />
                        <h6 >{contact.user.username}</h6>

                    </div>  </Link>
            )
        })
        return (
            <div className="grey lighten-3" style={{ height: "60vh" }}>
                <button className="btn" onClick={this.reload}>Reload</button>
                <div className="row center">
                    <div className="center col s2 offset-s4" style={{ fontSize: "1.5vw" }}>Recents</div>
                    <span className="material-icons large col s2 center" style={{ fontSize: "2vw" }}>people</span>
                </div>
                <div className="container" style={{ paddingBottom: "1vh", height: "50vh", overflow: "scroll" }}>
                    {peopleJsx}
                </div>

            </div>
        )
    }


}
const mapStateToProps = (state) => {
    //authreducer.pro.data
    // console.log(state)
    console.log(state.dashboardReducer)
    return {
        profileData: state.authReducer.profileData,
        loadedContacts: state.dashboardReducer.loadedContacts,
        dashboardReducer: state.dashboardReducer
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        loadContacts: (username) => {
            dispatch(loadContacts(username))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Recents);