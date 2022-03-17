import firebase from "../configs/firebase.config"
const socialMediaAuth = (provider) => {
    return firebase
        .auth()
        .signWithPopup(provider)
        .then((res) => {
            return res.user
        })
        .catch((er) => {
            return (er)
        })
}
export default socialMediaAuth