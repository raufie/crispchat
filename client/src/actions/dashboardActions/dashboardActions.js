import axios from 'axios';
export const searchUser = (username) => {
    return (dispatch) => {
        axios.get(`http://localhost:4000/api/users/?username=${username}`).then(res => {
            console.log(res.data);
            dispatch({
                type: "USER_FOUND",
                payload: res.data ? res.data : false
                //userdata
            })

        }).catch(e => {
            dispatch({
                type: "USER_FOUND",
                payload: null
            })
        })

    }

}
export const loadContacts = (username) => {

    //load all the contacts here
    return (dispatch) => {
        axios.get(`http://localhost:4000/api/contacts/loadcontacts/?username=${username}`).then(res => {
            console.log(res)
            dispatch({
                type: "LOADED_CONTACTS",
                payload: res.data
            })
        }).catch(e => {


            dispatch({
                type: "CONTACTS_NOT_LOADED",
                error: "COULDN'T LOAD CONTACTS"
            })
        })



    }
}

export const addAsContact = (userId, currentUserId) => {
    return (dispatch) => {
        axios({
            method: "post",
            url: "http://localhost:4000/api/contacts/new/",
            data: {
                userId,
                currentUserId
            }
        }).then(res => {
            dispatch({ type: "FRIEND_ADDED" })
        }).catch(e => {
            dispatch({ type: "FRIEND_NOT_ADDED" })
        })
    }
}
export const contactAlreadyExists = (loadedContacts, selecteduser) => {
    return (dispatch) => {
        let flag = 0;
        loadedContacts && loadedContacts.map(x => {
            console.log(x.user.id, selecteduser)
            if (x.user.id === selecteduser) {

                flag++;
                dispatch({
                    type: "CONTACT_EXISTS",
                    payload: false
                });
            }
        })
        if (flag === 0) {
            dispatch({
                type: "CONTACT_DOES_NOT_EXIST",
                payload: true
            })
        }

    }
}