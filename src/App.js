// ** Router Import
import Router from './router/Router'

import { useEffect, useState } from 'react'
import LoginCover from './views/Login'
import firebase from 'firebase/compat/app'
import { useHistory } from "react-router-dom"

import { connect } from 'react-redux'
import { setUser, deleteUser } from './redux/user/user.actions'

const App = (props) => {
    
    // if (!isuserSignIn) {
    //     console.log("123")
    //     return <LoginCover />
    // }

    return <Router />
}


const mapStateToProps = state => {
    return {
        userName: state.user.userName,
        userImage: state.user.userImage,
        userDisplayName: state.user.userDisplayName
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setUser: (userName, userImage, userDisplayName) => dispatch(setUser(userName, userImage, userDisplayName)),

        deleteUser: () => dispatch(deleteUser())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
