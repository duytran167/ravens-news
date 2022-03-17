// ** React Imports
import { useState } from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase/compat/app'

// ** Icons Imports
import { AlignJustify, Rss, Info, Image, Users, Edit } from 'react-feather'

import '@styles/react/pages/page-profile.scss'

// ** Reactstrap Imports
import { Card, CardImg, Collapse, Navbar, Nav, NavItem, NavLink, Button } from 'reactstrap'
import anhngu from '@src/assets/images/profile/vanloc.jpg'
import MyBlog from './MyBlog'
const ProfileHeader = (props) => {
    // ** States
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => setIsOpen(!isOpen)

    return (
        <div id='user-profile'>
            <Card className='profile-header mb-2'>
                <CardImg src='https://c.wallhere.com/photos/f9/76/2560x1440_px_Fall_nature_river_Trees-1091276.jpg!d' style={{height: '400px', objectFit:'cover'}} alt='User Profile Image' top />
                <div className='position-relative'>
                    <div className='profile-img-container d-flex align-items-center'>
                        <div className='profile-img'>
                            <img className='rounded img-fluid' src={props.userImage} width="100%" alt='Card image' />
                        </div>
                        <div className='profile-title ms-3'>
                            <h2 className='text-white'>{props.userDisplayName}</h2>
                            <p className='text-white'>{props.userName}</p>
                        </div>
                    </div>
                </div>


                <div className='profile-header-nav'>
                    <Navbar container={false} className='justify-content-end justify-content-md-between w-100' expand='md' light>
                        <Button color='' className='btn-icon navbar-toggler' onClick={toggle}>
                            <AlignJustify size={21} />
                        </Button>
                        <Collapse isOpen={isOpen} navbar>
                            <div className='profile-tabs d-flex justify-content-between flex-wrap mt-1 mt-md-0'>
                                <Nav className='mb-0' pills>
                                    <NavItem>
                                        <NavLink className='fw-bold' active>
                                            <span className='d-none d-md-block'>My Blog</span>
                                            <Rss className='d-block d-md-none' size={14} />
                                        </NavLink>
                                    </NavItem>
                                    </Nav>
                                    
                            </div>
                        </Collapse>
                    </Navbar>
                </div>
            </Card>
            <MyBlog />
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
export default connect(mapStateToProps)(ProfileHeader)
