// ** React Imports
import { useState, useEffect, Fragment } from 'react'
import { useParams, Link, Redirect } from 'react-router-dom'
import { toast } from 'react-toastify'

// ** Third Party Components
import axios from 'axios'
import Select from 'react-select'
import htmlToDraft from 'html-to-draftjs'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState, ContentState, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'

// ** Custom Components
import Avatar from '@components/avatar'
import Breadcrumbs from '@components/breadcrumbs'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Reactstrap Imports
import { Row, Col, Card, CardBody, CardText, Form, Label, Input, Button, Toast, ToastBody, ToastHeader, Spinner} from 'reactstrap'

// ** Styles
import '@styles/react/libs/editor/editor.scss'
import '@styles/base/plugins/forms/form-quill-editor.scss'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/base/pages/page-blog.scss'

const BlogEdit = () => {
    const close = <button type='button' className='ms-1 btn-close'></button>
    const paramsURL = useParams()


    // ** States
    const [data, setData] = useState(
        {
            title: "",
            img: "",
            userFullName: "",
            content: "",
            blogPosted: "",
            excerpt: "",
            createSuccess:""
        }
    ),
        [content, setContent] = useState("")

    useEffect(() => {
        axios.get(`https://low-root-mangosteen.glitch.me/blog/${paramsURL.id}`).then(res => {
            const contentBlock = htmlToDraft(res.data.content)
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
            const editorState = EditorState.createWithContent(contentState)
            setContent(editorState)
            setData(res.data)
        })

    }, [])
    const update = (event) => {
        event.preventDefault()
        const contentHtml = draftToHtml(convertToRaw(content.getCurrentContent()))
        fetch(`https://low-root-mangosteen.glitch.me/blog/${paramsURL.id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...data, content: contentHtml })
        }).then((result) => {
            result.json().then((resp) => {
                toast.success(
                    <Col md='6' sm='12'>
                        <Toast>
                        <ToastHeader close={close} icon={<Spinner size='sm' color='primary' />}>
                               Ravens Team
                            </ToastHeader>
                            <ToastBody>Updated Successfully 🗸</ToastBody>
                        </Toast>
                    </Col>
                    
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

    return (
        <div className='blog-edit-wrapper'>
            <Breadcrumbs
                breadCrumbTitle='Blog Edit'
                breadCrumbParent='Blog'
                breadCrumbParent2='Edit'                
            />
            {data !== null ? (
                <Row>
                    <Col sm='12'>
                        <Card>
                            <CardBody>
                                <Form className='mt-2'>
                                    <Row>
                                        <Col md='6' className='mb-2'>
                                            <Label className='form-label' for='blog-edit-title'>
                                                Title
                                            </Label>
                                            <Input id='blog-edit-title' value={data.title}
                                                onChange={(event) => { setData({ ...data, title: event.target.value }) }}
                                            />
                                        </Col>

                                        <Col md='6' className='mb-2'>
                                            <Label className='form-label'

                                                for='blog-edit-slug'>
                                                Author
                                            </Label>
                                            <Input id='blog-edit-slug' value={data.userFullName} onChange={(event) => { setData({ ...data, userFullName: event.target.value }) }} />
                                        </Col>
                                        <Col md='6' className='mb-2'>
                                            <Label className='form-label' for='blog-edit-slug'>
                                                Publish Date
                                            </Label>
                                            <Input type="date" id='blog-edit-slug' value={data.blogPosted}
                                                onChange={(event) => { setData({ ...data, blogPosted: event.target.value }) }}
                                            />
                                        </Col>
                                        <Col className='mb-2' sm='12'>
                                            <Label className='form-label' for='blog-edit-status' >
                                                Description
                                            </Label>
                                            <Input id='blog-edit-slug' value={data.excerpt}
                                                onChange={(event) => { setData({ ...data, excerpt: event.target.value }) }}
                                            />
                                        </Col>
                                        <Col sm='12' className='mb-2'>
                                            <Label className='form-label'>Content</Label>
                                            <Editor
                                                editorState={content} onEditorStateChange={data => setContent(data)} value={data.content} />
                                        </Col>
                                        <Col className='mb-2' sm='12'>
                                            <div className='border rounded p-2'>
                                                <h4 className='mb-1'>Featured Image</h4>
                                                <div>
                                                    <small className='text-muted'>Required image resolution 800x400, image size 10mb.</small>

                                                    <br />
                                                    <div className='d-inline-block '>
                                                        <div className='mb-6' sm='6'>
                                                            <Input
                                                                value={data.img}
                                                                type='text'
                                                                onChange={(event) => { setData({ ...data, img: event.target.value }) }}


                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col className='mt-50'>
                                            <Button color='primary' className='me-1'
                                                onClick={update}>
                                                Save Changes
                                            </Button>
                                            <Button color='secondary' outline>
                                                Cancel
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            ) : null}
        </div>
    )
}

export default BlogEdit
