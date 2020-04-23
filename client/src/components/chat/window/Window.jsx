import React, { Component } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import Scroll from "react-scroll";
import { connect } from 'react-redux';
import { loadConversation } from '../../../actions/chatActions/chatActions'
import './window.css';
import io from 'socket.io-client';
const socket = io("http://localhost:4000");
class Window extends Component {
    constructor(props) {
        super(props)
    }

    state = {

        newMessages: [],
        endRef: React.createRef(),
        messagesEnd: React.createRef()
    }
    scrollToBottom = () => {
        this.state.messagesEnd.current.scrollIntoView({ behavior: "smooth" });
    }

    componentDidMount() {
        this.scrollToBottom()
    }
    componentDidUpdate() {
        this.scrollToBottom()
        socket.once('new_message', (data) => {

            if (this.props.id === data.conversationId) {
                this.setState({
                    newMessages: [...this.state.newMessages, data]
                })
            }
        });

        socket.on('typing', data => {
            if (data.data === this.props.id && this.props.profileData.username !== data.sender) {
                this.setState({
                    typing: "THE USER IS TYPING..."
                })
                setTimeout(
                    () => {
                        this.setState({
                            typing: ""
                        })
                    }, 5000
                )
            }


        })

    }

    render() {
        // console.log(this.props.currentUserId)
        return (
            <div id="window-container" className="white" style={{
                padding: " 5% 0",
                overflow: "auto",
                display: "flex",
                flexDirection: "column",
                flex: "auto",
                scrollbarColor: "#0d47a1"
            }}>

                <div style={{ flexFlow: "flex-end" }}>
                    {
                        this.props.messages && this.props.messages.map((message, index) => {

                            if (message.sender !== this.props.currentUserId) {

                                return (
                                    <div className="container row " key={index} style={{ width: "100%" }}>
                                        {message.dataType === "text" ? <p className=" col s12" style={{ padding: "1%", backgroundColor: "#0d47a1", color: "white", width: "50%" }}>{message.payload}</p> :
                                            <img className="col s12" style={{ backgroundColor: "#0d47a1", color: "white", width: "50%" }} src={message.imageUrl} />}
                                    </div>
                                )
                            } else {
                                return (
                                    <div className="container row" style={{ width: "100%" }}>
                                        {message.dataType === "text" ?
                                            <p className="right col s12" style={{ padding: "1%", backgroundColor: "#f5f5f5", color: "black", width: "50%" }}>{message.payload}</p> :
                                            <img className="col s12" style={{ backgroundColor: "#f5f5f5", color: "black", width: "50%" }} src={message.imageUrl} />
                                        }
                                    </div>
                                )
                            }
                        })

                    }

                </div>
                <div style={{ float: "left", clear: "both" }}
                    ref={this.state.messagesEnd}>
                </div>
                <div>
                    {this.state.newMessages && this.state.newMessages.map((message, index) => {

                        if (message.sender !== this.props.currentUserId) {

                            return (
                                <div className="container row " key={index} style={{ width: "100%" }}>
                                    {message.dataType === "text" ? <p className=" col s12" style={{ padding: "1%", backgroundColor: "#0d47a1", color: "pink", width: "50%" }}>{message.payload}</p> :
                                        <img className="col s12" style={{ backgroundColor: "#0d47a1", color: "white", width: "50%" }} src={message.payload} />}
                                </div>
                            )
                        } else {
                            return (
                                <div className="container row" style={{ width: "100%" }}>
                                    {message.dataType === "text" ?
                                        <p className="right col s12" style={{ padding: "1%", backgroundColor: "#f5f5f5", color: "black", width: "50%" }}>{message.payload}</p> :
                                        <img className="col s12" style={{ backgroundColor: "#f5f5f5", color: "black", width: "50%" }} src={message.payload} />
                                    }
                                </div>
                            )
                        }
                    })
                    }
                </div>
                {/* juggar for scrolling to bottom */}
                <div className="left green-text">{this.state.typing}</div>

            </div>



        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        loadConversation: (conversationId) => {
            dispatch(loadConversation(conversationId))
        }
    }
}
const mapStateToProps = (state) => {

    return {

        messages: state.chatReducer.loadedMessages,
        currentUserId: state.authReducer.profileData._id,
        profileData: state.authReducer.profileData
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Window);