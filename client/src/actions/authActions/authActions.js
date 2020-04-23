import axios from 'axios'
import Cookie from 'js-cookie'
export function signUp(credentials) {
    return (dispatch) => {
        //SIGN_UP_SUCCESS, SIGN_UP_FAILURE should be the signals
        // console.log(credentials)
        var data = new FormData();
        data.append('file', credentials.image);
        axios.post("http://localhost:4000/api/files", data).then((res1) => {
            credentials.image = res1.data.file.filename;

            axios.post("http://localhost:4000/api/users", credentials).then(res => {
                // console.log(res.data);
                dispatch({
                    type: "SIGN_UP_SUCCESS",
                    profile: res.data,
                })
            }).catch(e => {
                // console.log(e)
                dispatch({
                    type: "SIGN_UP_FAILURE",
                    error: e
                })
            })
        }).catch(e => {
            console.log(e)
            dispatch({
                type: "SIGN_UP_FAILURE",
                error: e
            })
        })
    }
}
export function signIn(credentials) {
    console.log(credentials)
    return (dispatch) => {
        const data = {
            username: credentials.username,
            password: credentials.password
        }
        axios.post("http://localhost:4000/api/signin", data).then(res => {
            console.log("x-auth-token", res.data)
            //set cookie
            var date = new Date();
            date.setTime(date.getTime() + (10 * 24 * 60 * 60 * 1000));
            document.cookie = `x-auth-token=${res.data};path=/;expires=${date.toGMTString()};`;
            window.location.reload();
            dispatch({
                type: "SIGN_IN_SUCCESS",
                jwtKey: res.data
            })
        }).catch(e => {
            console.log(e)
            dispatch({
                type: "SIGN_IN_FAILURE",
                error: e.response.data
            })
        })
    }
}
export function checkAuthStatus() {
    return (dispatch) => {
        const token = Cookie.get('x-auth-token')
        axios({
            method: "get",
            url: "http://localhost:4000/api/currentUser",
            headers: {
                "x-auth-token": token
            }
        }).then(res => {
            //response is the authenticated user

            dispatch({
                type: "SIGNED_IN",
                profileData: res.data
            })
        }).catch(e => {
            console.log(e)
            dispatch({
                type: "SIGNED_OUT"
            })
        })
    }
}
export function signOut() {
    return (dispatch) => {
        document.cookie = "x-auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
        dispatch({
            type: "SIGN_OUT"
        })
    }
}
export function getUser(username) {
    console.log(username)
    return (dispatch) => {
        let data;
        axios.get(`http://localhost:4000/api/users/?username=${username}`).then(res => {
            if (res.data) {
                dispatch({
                    type: "GET_USER_SUCCESSFULL",
                    requestedUser: res.data
                })
            } else {
                dispatch({
                    type: "GET_USER_UNSUCCESSFULL"
                })
            }
        }).catch(e => {

            dispatch({
                type: "GET_USER_UNSUCCESSFULL"
            })
        })
    }
}