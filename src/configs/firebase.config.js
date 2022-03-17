import firebase from "firebase/compat/app"
import 'firebase/compat/auth'


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDvVfsG-P27aWbO-kwPsPTkNv3Eg25oxSo",
    authDomain: "st-ravens-project.firebaseapp.com",
    projectId: "st-ravens-project",
    storageBucket: "st-ravens-project.appspot.com",
    messagingSenderId: "442311940866",
    appId: "1:442311940866:web:37f2115d49418baad2001b",
    measurementId: "G-5XMR8C48YZ"
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()


const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })

export const signInWithGoogle = () => auth.signInWithPopup(provider)
export default firebase