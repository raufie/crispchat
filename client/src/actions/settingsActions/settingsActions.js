import axios from 'axios';
export const changePassword = (username, oldpassword, newpassword) => {
    return (dispatch) => {
        axios({
            method: "put",
            url: `http://localhost:4000/api/users/changepassword/${username}`,
            data: {
                oldpassword,
                newpassword
            }
        }).then(res => {
            //successfull
            dispatch({
                type: "PASSWORD_CHANGED"
            })
        }).catch(e => {
            console.log(e)
            dispatch({
                type: "INVALID_PASSWORD"
            })
        })
    }

}

export const newPassword = (username, newpassword) => {
    return (dispatch) => {
        axios({
            method: "PUT",
            url: `http://localhost:4000/api/users/newpassword/${username}`,
            data: {
                newpassword
            }
        }).then(res => {
            dispatch({
                type: "PASSWORD_CHANGED"
            })
        }).catch(e => {
            console.log(e)
            dispatch({
                type: "ERROR CHANGING PASSWORD"
            })
        })
    }
}
export const changeSecurityQuestion = (id, securityQuestion, answer) => {
    return (dispatch) => {
        axios({
            method: "put",
            url: `http://localhost:4000/api/users/${id}`,
            data: {
                securityQuestion,
                answer
            }
        }).then(res => {
            console.log(res)
            dispatch({
                type: "SECURITY_CHANGED"
            })
        }).catch(e => {
            console.log(e)
            dispatch({
                type: "SECURITY_NOT_CHANGED"
            })
        })
    }
}