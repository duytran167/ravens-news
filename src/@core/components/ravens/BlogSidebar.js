import { Link, useHistory } from 'react-router-dom'
import { useEffect, useState, Fragment } from 'react'

// ** Third Party Components
import axios from 'axios'
import classnames from 'classnames'
import * as Icon from 'react-feather'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import { InputGroup, Input, InputGroupText } from 'reactstrap'

const BlogSidebar = ({blogData}) => {
  //serach box
  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useState([])
  const [searchTitle, setSearchTitle] = useState("")
  // ** States
  const [data, setData] = useState([])
  const history = useHistory()
  useEffect(() => {
    const loadPosts = () => {
      setLoading(true)
      const response = axios.get('https://low-root-mangosteen.glitch.me/blog')
      .then(res => {
        const sortData = res.data.sort((a, b) => new Date(b.blogPosted) - new Date(a.blogPosted))
        // const limitData = sortData.filter((item, idx) => idx < 2)
        setPosts(sortData)
        setLoading(false)
        setData(res.data)        
      })
    }
    
    loadPosts()
   
  }, [blogData])

  const renderRecentPosts = () => {

    return (
      <div >
        {loading ? (
          <h4>Loading ...</h4>
        ) : (
          posts
            .filter((value) => {
              if (searchTitle === "") {
                return value
              } else if (
                value.title.toLowerCase().includes(searchTitle.toLowerCase())
              ) {
                return value
              }
            })
            .map((index) => <div
              key={index.id}
              style={{ marginTop: "15px" }}
              className={classnames('d-flex justify-content-start align-items-center', {
                'mb-75'
                  : index !== data.length - 1
              })}
            >
              <Link to={`/detail/${index.id}`}>
                <img className='rounded ' style={{ marginTop: "-15px", marginRight: "5px" }} src={index.img} alt={index.title} width='100' height='70' />
              </Link>
              <div>
                <h6 style={{ fontSize: "12px" }} className='blog-recent-post-title'>
                  <Link className='text-body-heading' to={`/detail/${index.id}`}>
                    {index.title}
                  </Link>
                </h6>
                <div style={{ marginTop: "-10px" }} className='text-muted mb-0'>{index.blogPosted}</div>
              </div>
            </div>
            )
        )}
      </div>
      // 
    )

  }
  
  return (    
    <div className='sidebar-detached sidebar-right'>
      <div className='sidebar'>
        <div className='blog-sidebar right-sidebar my-2 my-lg-0'>
          <div className='right-sidebar-content'>
            <div className='blog-search'>
              <InputGroup className='input-group-merge'>
                <Input placeholder='Search here' type='text' onChange={(e) => setSearchTitle(e.target.value)} />
                <InputGroupText>
                  <Icon.Search size={14} />
                </InputGroupText>
              </InputGroup>
            </div>
            {data !== null ? (
              <Fragment>
                <div className='blog-recent-posts mt-3' >
                  <h6 className='section-label'>Recent Posts</h6>
                  <div className='mt-75' maxLength={1} >{renderRecentPosts()}</div>
                </div>
              </Fragment>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogSidebar
