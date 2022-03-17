import { SET_USER, DELETE_USER } from "./user.types"

const INITIAL_STATE = {
    userName: localStorage.getItem('email') || null,
    userImage: localStorage.getItem('photoURL') || null,
    userDisplayName: localStorage.getItem('displayName') || null
}

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state, userName: action.payload.userName, userImage: action.payload.userImage, userDisplayName: action.payload.userDisplayName
            }
            
        case DELETE_USER:
            return {
                ...state, userName: null, userImage: null, userDisplayName: null
            }
        default: return state
    }
}

export default reducer