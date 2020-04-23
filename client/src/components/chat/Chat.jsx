import React, { Component } from 'react';
import io from 'socket.io-client';
import Info from './info/Info';
import Window from './window/Window';
import Input from './input/Input';
import { loadConversation, sendMessage } from '../../actions/chatActions/chatActions.js';
import { connect } from 'react-redux';
import ScrollToBottom from 'react-scroll-to-bottom'
const socket = io("http://localhost:4000");

class Chat extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        messages: []
    }

    handleDummyMessage = (e) => {
        this.setState({
            messages: [...this.state.messages, e]
        })
    }
    componentDidMount() {
        this.props.loadConversation(this.props.match.params.id);
        console.log(this.props)
        this.setState({
            messages: this.props.messages
        })
        socket.on("chat", function (data) {
            console.log(data)
        })

    }
    componentDidUpdate() {
        const params = this.props.match.params.id

        socket.on("new_message", (data) => {
            //when we receieve a message we also ought to speread and agfter that we must also
            //receive the sender id in the message


        })
    }
    render() {
        return (
            <div className="container row" style={{ height: "100vh" }}>

                <h3 className="brand-logo center white-text" style={{ paddingTop: "2vh", paddingBottom: "2vh", textShadow: "0 0 1vw #e0f7fa, 0 0 5px #0000FF" }}>
                    <img src={`http://localhost:4000/api/files/${this.props.location.state.contact.user.image}`} style={{ width: "100px", borderRadius: "50vw" }} />
                    {this.props.location.state.contact.user.username}
                </h3>
                <div className="right">
                    <Info className="right" />
                </div>
                <div className="white">

                    <div className="white center container" style={{ height: "65vh", width: "100%", overflow: "scroll", overflowX: "hidden", }} >

                        <Window id={this.props.match.params.id} />

                    </div>

                    <Input conversationId={this.props.match.params.id} addDummyMessage={this.handleDummyMessage} />
                </div>

            </div>

        )
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        chatReducer: state.chatReducer,
        messages: state.chatReducer.loadedMessages,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        loadConversation: (conversationId) => {
            dispatch(loadConversation(conversationId))
        },
        sendMessage: (messageBody) => {
            dispatch(sendMessage(messageBody))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);