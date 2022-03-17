import { useState, useEffect, Fragment } from 'react'
import { useParams, Link, Redirect } from 'react-router-dom'
import { toast } from 'react-toastify'
import { connect } from 'react-redux'

// ** Third Party Components
import axios from 'axios'
import classnames from 'classnames'
import {
  Share2,
  GitHub,
  Gitlab,
  Twitter,
  Bookmark,
  Facebook,
  Linkedin,
  CornerUpLeft,
  MessageSquare,
  Edit2,
  Trash
} from 'react-feather'

// ** Utils
import { kFormatter } from '@utils'

// ** Custom Components
import Sidebar from '../@core/components/ravens/BlogSidebar'
import Avatar from '@components/avatar'
import Breadcrumbs from '@components/breadcrumbs'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Form,
  Badge,
  Input,
  Label,
  Button,
  CardImg,
  CardBody,
  CardText,
  CardTitle,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  X, Check
} from 'reactstrap'

// ** Styles
import '@styles/base/pages/page-blog.scss'

// ** Images
import cmtImg from '@src/assets/images/portrait/small/avatar-s-6.jpg'

const BlogDetails = (props) => {
  const paramsURL = useParams()
  // ** States
  const [data, setData] = useState(
    { createSuccess: "" }
  )
  //
  const userRole = (id) => {
    if (id === localStorage.getItem('email')) return true
    return false
  }

  useEffect(() => {
    axios.get(`https://low-root-mangosteen.glitch.me/blog/${paramsURL.id}`).then(res => {
      setData(res.data)
    })

  }, [])

  const del = () => {
    fetch(`https://low-root-mangosteen.glitch.me/blog/${paramsURL.id}`, {
      method: "DELETE",
      body: JSON.stringify(data)
    }).then((result) => {
      result.json().then((resp) => {
        toast.success(
          <Fragment>
            <div className='toastify-header'>
              <div className='title-wrapper'>
                <h6 className='text-danger ms-50 mb-0'>Boom!</h6>
              </div>
              <small className='text-muted'>Present</small>
            </div>
            <div className='toastify-body'>
              <span>Deleted Successfully !</span>
            </div>
          </Fragment>,
          { icon: false, hideProgressBar: true }
        )


      })
    })
    setData({
      createSuccess: true
    })
  }
  if (data.createSuccess) {
    return <Redirect to={'/home'} />
  }

  if (props.userName && props.userImage && props.userDisplayName) {
    return (
      <Fragment>
        <Breadcrumbs
          breadCrumbTitle='Blog Details'
          breadCrumbParent='Detail'
        />
        <div className='blog-wrapper'>
          <div className='content-detached content-left'>
            <div className='content-body'>
              {data !== null ? (
                <Row>
                  <Col sm='12'>
                    <Card className='mb-3'>
                      <CardImg src={data.img} className='img-fluid' top />
                      <CardBody>

                        <CardTitle tag='h4'>{data.title} </CardTitle>
                        {userRole(data.userId) && <Link to={`/edit/${paramsURL.id}`}><Edit2 className='me-50' size={30} /></Link>}
                        {userRole(data.userId) && <span onClick={del} style={{ cursor: "pointer" }}><Trash className='me-50' size={30} /></span>}
                        <div className='d-flex'>
                          <div>
                            <small className='text-muted me-25'>by</small>
                            <small>
                              <a className='text-body' href='/' onClick={e => e.preventDefault()}>
                                {data.userFullName}
                              </a>
                            </small>
                            <span className='text-muted ms-50 me-25'>|</span>
                            <small className='text-muted'>{data.blogPosted}</small>
                          </div>
                        </div>
                        <div>
                          <span style={{ color: "#8174f2" }}>{data.excerpt}</span>
                        </div>
                        <hr className='my-2' />

                        <div
                          dangerouslySetInnerHTML={{
                            __html: data.content
                          }}
                        ></div>

                        <hr className='my-2' />
                        <div className='d-flex align-items-center justify-content-between'>

                          <UncontrolledDropdown className='dropdown-icon-wrapper'>
                            <DropdownToggle tag='span'>
                              <Share2 size={21} className='text-body cursor-pointer' />
                            </DropdownToggle>
                            <DropdownMenu end>
                              <DropdownItem className='py-50 px-1'>
                                <Facebook size={18} />
                              </DropdownItem>
                              <DropdownItem className='py-50 px-1'>
                                <Twitter size={18} />
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              ) : null}
            </div>
          </div>
          <Sidebar />
        </div>
      </Fragment>
    )
  } else {
    return (
      <Fragment>
        <Breadcrumbs
          breadCrumbTitle='Blog Details'
          breadCrumbParent='Detail'
        />
        <div className='blog-wrapper'>
          <div className='content-detached content-left'>
            <div className='content-body'>
              {data !== null ? (
                <Row>
                  <Col sm='12'>
                    <Card className='mb-3'>
                      <CardImg src={data.img} className='img-fluid' top />
                      <CardBody>

                        <CardTitle tag='h4'>{data.title} </CardTitle>
                        {/* <Link to={`/edit/${paramsURL.id}`}><Edit2 className='me-50' size={18} /></Link>
                        <span onClick={del} style={{ cursor: "pointer" }}><Trash className='me-50' size={17} /></span> */}
                        <div className='d-flex'>
                          {/* <Avatar className='me-50' img={data.blog.avatar} imgHeight='24' imgWidth='24' /> */}
                          <div>
                            <small className='text-muted me-25'>by</small>
                            <small>
                              <a className='text-body' href='/' onClick={e => e.preventDefault()}>
                                {data.userFullName}
                              </a>
                            </small>
                            <span className='text-muted ms-50 me-25'>|</span>
                            <small className='text-muted'>{data.blogPosted}</small>
                          </div>
                        </div>
                        <div>
                          <span style={{ color: "#8174f2" }}>{data.excerpt}</span>
                        </div>
                        <hr className='my-2' />

                        <div
                          dangerouslySetInnerHTML={{
                            __html: data.content
                          }}
                        ></div>

                        <hr className='my-2' />
                        <div className='d-flex align-items-center justify-content-between'>

                          <UncontrolledDropdown className='dropdown-icon-wrapper'>
                            <DropdownToggle tag='span'>
                              <Share2 size={21} className='text-body cursor-pointer' />
                            </DropdownToggle>
                            <DropdownMenu end>


                              <DropdownItem className='py-50 px-1'>
                                <Facebook size={18} />
                              </DropdownItem>
                              <DropdownItem className='py-50 px-1'>
                                <Twitter size={18} />
                              </DropdownItem>

                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>

                </Row>
              ) : null}
            </div>
          </div>
          <Sidebar />
        </div>
      </Fragment>
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
export default connect(mapStateToProps)(BlogDetails)
