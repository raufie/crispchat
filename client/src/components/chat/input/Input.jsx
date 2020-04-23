import React, { Component, useEffect, useState } from 'react';
import { emojify } from 'react-emoji';
import { connect } from 'react-redux';
import { sendMessage } from '../../../actions/chatActions/chatActions';
import io from 'socket.io-client';
const socket = io("http://localhost:4000");

const Input = (props) => {

    const [payload, setPayload] = useState("");
    const [typing, setTyping] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        let date = new Date();
        const dateString = date.toGMTString();
        const messageBody = {
            payload: emojify(payload)[0],
            dataType: "text",
            createdAt: dateString,
            sender: props.profileData._id,
            isReadBy: [props.profileData._id],
        }
        socket.emit('send_message', { conversationId: props.conversationId, ...messageBody })
        props.sendMessage(props.conversationId, messageBody);
        setPayload(" ")

    }
    const handleChange = (e) => {
        setPayload(e.target.value)

    }
    const handleFile = (e) => {
        let date = new Date();
        const dateString = date.toGMTString();
        const messageBody = {
            image: e.target.files[0],
            dataType: "image",
            createdAt: dateString,
            sender: props.profileData._id,
            isReadBy: [props.profileData._id]
        }
        props.sendMessage(props.conversationId, messageBody)

        messageBody.image = props.sentImage;
        socket.emit('send_message', { conversationId: props.conversationId, ...messageBody })
    }


    return (
        <form className="row" onSubmit={handleSubmit}>
            <div className="col s2">
                <label for="file-input">
                    <span className="material-icons black-text" style={{ fontSize: "2vw" }}>image</span>
                </label>

                <input onChange={handleFile} id="file-input" type="file" style={{ display: "none" }} />
            </div>
            <input className="col s8" name="input" onChange={handleChange} value={payload} required />
            <button className="btn blue darken-4" type="submit">Send<span className="material-icons">send</span></button>
        </form>

    )

}
const mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (conversationId, messageBody) => {
            dispatch(sendMessage(conversationId, messageBody))
        }
    }
}
const mapStateToProps = (state) => {
    console.log(state)
    return {
        profileData: state.authReducer.profileData,
        sentImage: state.chatReducer.sentImage
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Input);