import axios from 'axios';
import Cookie from 'js-cookie'
//load conversation
//load sendMessage
const header = {
    'x-auth-token': Cookie.get("x-auth-token")
}
export function loadConversation(conversationId) {
    //load conversation by conversation, just simply return the conversation
    //the UI will take care of everything

    return (dispatch) => {

        axios.get(`http://localhost:4000/api/conversation/${conversationId}`, { headers: { "x-auth-token": Cookie.get("x-auth-token") } }).then(res => {
            console.log(res.data)
            dispatch({
                type: "LOADED_MESSAGES",
                payload: res.data
            })
        }).catch(e => {
            console.log("CHAT ERROR")
            console.log(e)
            dispatch({
                type: "ERROR_LOADING_MESSAGES",
                payload: e
            })
        })
    }
}
export function sendMessage(conversationId, messageBody) {
    return (dispatch) => {
        console.log(messageBody)
        //first we have form data , raw file so we have to make sure that we convert it into url after uploading to images collection

        if (messageBody.dataType !== "text") {
            let data = new FormData();

            data.append("file", messageBody.image)
            axios.post(`http://localhost:4000/api/files/`, data).then(responseUrl => {
                console.log(responseUrl.data.file.filename)
                messageBody.payload = responseUrl.data.file.filename;
                console.log(messageBody)
                axios({
                    method: "post",
                    url: `http://localhost:4000/api/conversation/${conversationId}`,
                    data: messageBody,
                    headers: {
                        "x-auth-token": Cookie.get("x-auth-token")
                    }
                }).then(res => {

                    dispatch({
                        type: "MESSAGE_SENT",
                        payload: res.data,
                        image: responseUrl.data.file.filename
                    })
                }).catch(e => {
                    dispatch({
                        type: "MESSAGE_NOT_SENT",
                        payload: e
                    })
                })
            }).catch(e => {
                console.log(e)
                dispatch({
                    type: "MESSAGE_NOT_SENT",
                    payload: e
                })
            })
        } else {
            axios({
                method: "post",
                url: `http://localhost:4000/api/conversation/${conversationId}`,
                data: messageBody,
                headers: {
                    "x-auth-token": Cookie.get("x-auth-token")
                }
            }).then(res => {
                dispatch({
                    type: "MESSAGE_SENT",
                    payload: res.data
                })
            }).catch(e => {
                dispatch({
                    type: "MESSAGE_NOT_SENT",
                    payload: e
                })
            })
        }
    }
}


    // export function