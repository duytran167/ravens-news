// ** React Imports
import { Link } from 'react-router-dom'
import { Fragment, useState, useEffect } from 'react'

// ** Third Party Components
import axios from 'axios'
import classnames from 'classnames'
import { MessageSquare } from 'react-feather'

// ** Custom Components
import Sidebar from '../@core/components/ravens/BlogSidebar'
import Avatar from '@components/avatar'
import Breadcrumbs from '@components/breadcrumbs'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  CardBody,
  CardText,
  CardTitle,
  CardImg,
  Badge,
  Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap'

// ** Styles
import '@styles/base/pages/page-blog.scss'

const BlogList = () => {

  // ** States

  const [data, setData] = useState([])

  useEffect(() => {
    axios.get('https://low-root-mangosteen.glitch.me/blog').then(res => {
      const sortData = res.data.sort((a, b) => new Date(b.blogPosted) - new Date(a.blogPosted))
      setData(sortData)
    })
  }
    , [])


  const renderRenderList = () => {
    return data.map(item => {

      return (
        <Col key={item.title} md='6' >
          <Card>
            <Link to={`/detail/${item.id}`}>
              <CardImg className='img-fluid' src={item.img} alt={item.title} top />
            </Link>
            <CardBody>
              <CardTitle tag='h4'>
                <Link className='blog-title-truncate text-body-heading' to={`/detail/${item.id}`}>
                  {item.title}
                </Link>
              </CardTitle>
              <div className='d-flex'>
                {/* <Avatar className='me-50' img={item.avatar} imgHeight='24' imgWidth='24' /> */}
                <div>
                  <small className='text-muted me-25'>by</small>
                  <small>
                    <a className='text-body' href='/' onClick={e => e.preventDefault()}>
                      {item.userFullName}
                    </a>
                  </small>
                  <span className='text-muted ms-50 me-25'>|</span>
                  <small className='text-muted'>{item.blogPosted}</small>
                </div>
              </div>
              {/* <div className='my-1 py-25'>{renderTags()}</div> */}
              <CardText className='blog-content-truncate'>{item.excerpt}</CardText>
              <hr />
              <div className='d-flex justify-content-between align-items-center'>

                <Link className='fw-bold' >
                  Ravens Team
                </Link>
              </div>
            </CardBody>
          </Card>
        </Col>
      )
    })
  }


  return (
    <Fragment>
      <div className='blog-wrapper'>
        <div className='content-detached content-left'>
          <div className='content-body'>
            {data !== null ? (
              <div className='blog-list-wrapper'>
                <Row>{renderRenderList()}</Row>
              </div>
            ) : null}
          </div>
        </div>
        <Sidebar blogData={data} />
      </div>
    </Fragment>
  )
}

export default BlogList
