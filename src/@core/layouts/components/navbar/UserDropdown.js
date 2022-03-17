// ** React Imports
import { Link, useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase/compat/app'


// ** Custom Components
import Avatar from '@components/avatar'

// ** Utils
// import { isUserLoggedIn } from '@utils'

// ** Third Party Components
import { User, Mail, CheckSquare, MessageSquare, Settings, CreditCard, HelpCircle, Power } from 'react-feather'

// ** Reactstrap Imports
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, Button } from 'reactstrap'

// ** Default Avatar Image
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg'

const UserDropdown = (props) => {
  // useEffect(() => {
  //   if (!props.userName) {
  //     props.userName = localStorage.getItem('email') || ''
  //   }
  //   if (!props.userImage) {
  //     props.userImage = localStorage.getItem('photoURL') || ''
  //   }
  //   if (!props.userDisplayName) {
  //     props.userDisplayName = localStorage.getItem('displayName') || ''
  //   }
  // }, [])
  const history = useHistory()
  const handleLogout = async() => {
    await firebase.auth().signOut()
    localStorage.setItem('isUserLogin', '')
    localStorage.setItem('email', '')
    localStorage.setItem('photoURL', '')
    localStorage.setItem('displayName', '')
    history.push("/login")
  }
  if (props.userName && props.userImage && props.userDisplayName) {
    return (
      <UncontrolledDropdown tag='li' className='dropdown-user nav-item'>
        <DropdownToggle href='/' tag='a' className='nav-link dropdown-user-link' onClick={e => e.preventDefault()}>
          <div className='user-nav d-sm-flex d-none'>
            <span className='user-name fw-bold'>{props.userDisplayName}</span>
            <span className='user-status'>{props.userName}</span>
          </div>
          <Avatar img={props.userImage} imgHeight='40' imgWidth='40' status='online' />
        </DropdownToggle>
        <DropdownMenu end>
          <DropdownItem tag={Link} to='/profile'>
            <User size={14} className='me-75' />
            <span className='align-middle'>Profile</span>
          </DropdownItem>
          <DropdownItem tag={Link} onClick={handleLogout}>
            <Power size={14} className='me-75' />
            <span className='align-middle'>Logout</span>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    )
  } else {
    return (
      <Button color="primary" tag={Link} to='/login'>
        Login
      </Button>
    )
  }
}


const mapStateToProps = state => {
  return {
    userName: state.user.userName,
    userImage: state.user.userImage,
    userDisplayName: state.user.userDisplayName
  }

}
export default connect(mapStateToProps)(UserDropdown)
