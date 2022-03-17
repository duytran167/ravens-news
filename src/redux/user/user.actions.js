import { SET_USER, DELETE_USER } from "./user.types"

export const setUser = (userName, userImage, userDisplayName) => {
    return {
        type: SET_USER, 
        payload: {
            userName,
            userImage,
            userDisplayName
        }
    }

}

export const deleteUser = () => {
    return {
        type: DELETE_USER
    }
}

