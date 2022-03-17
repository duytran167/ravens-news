import { useSkin } from '@hooks/useSkin'
import { Link, useHistory } from 'react-router-dom'
import { Facebook, Twitter, Mail, GitHub } from 'react-feather'
import InputPasswordToggle from '@components/input-password-toggle'
import { Row, Col, CardTitle, CardText, Form, Label, Input, Button } from 'reactstrap'
import { googleProvider } from '../configs/authMethods'
import socialMediaAuth from '../service/auth'
import { signInWithGoogle } from '../configs/firebase.config'
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import firebase from 'firebase/compat/app'
import { setUser, deleteUser } from '../redux/user/user.actions'

import coverLogin from '@src/assets/images/banner/coverRavens.png'
import '@styles/react/pages/page-authentication.scss'

const LoginCover = (props) => {
  const [isuserSignIn, setIsUserSignedIn] = useState(false)
  const history = useHistory()
  useEffect(() => {
    if (isuserSignIn) {
      history.push("/home")
    }
  }, [isuserSignIn])
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      props.setUser(user.email, user.photoURL, user.displayName)
      localStorage.setItem('isUserLogin', true)
      localStorage.setItem('email', user.email)
      localStorage.setItem('photoURL', user.photoURL)
      localStorage.setItem('displayName', user.displayName)
      return setIsUserSignedIn(true)
    } else {
      localStorage.setItem('isUserLogin', '')
      localStorage.setItem('email', '')
      localStorage.setItem('photoURL', '')
      localStorage.setItem('displayName', '')
      setIsUserSignedIn(false)
    }
  })

  const { skin } = useSkin()
  const illustration = skin === 'dark' ? 'login-v2-dark.svg' : 'login-v2.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default

  return (
    <div className='auth-wrapper auth-cover'>
      <Row className='auth-inner m-0'>
        <Link className='brand-logo' to='/home'>
          <h2 className='brand-text text-primary ms-1'>Ravens Blog</h2>
        </Link>
        <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
            <img className='img-fluid' src={coverLogin} width="70%" alt='Login Cover' />
          </div>
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <CardTitle tag='h2' className='fw-bold mb-1'>
              Welcome to Ravens Blog! 👋
            </CardTitle>
            <CardText className='mb-2'>Please sign-in to your account and start the adventure</CardText>

            <Button color='primary' onClick={signInWithGoogle} block>
              Sign in with Google
            </Button>
            <p className='text-center mt-2'>
              <span className='me-25'>Contact Us?</span>
              {/* <Link to='/pages/register-cover'>
                <span>Create an account</span>
              </Link> */}
            </p>
            <div className='divider my-2'>
              <div className='divider-text'>with</div>
            </div>
            <div className='auth-footer-btn d-flex justify-content-center'>
              <Button color='facebook'>
                <Facebook size={14} />
              </Button>
              <Button color='twitter'>
                <Twitter size={14} />
              </Button>
              <Button color='google'>
                <Mail size={14} />
              </Button>
              <Button className='me-0' color='github'>
                <GitHub size={14} />
              </Button>
            </div>
          </Col>
        </Col>
      </Row>
    </div>
  )
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginCover)
