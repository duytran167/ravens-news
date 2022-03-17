// ** React Imports
import { useState, useEffect, Fragment } from 'react'
import * as Icons from 'react-feather'
import { toast } from 'react-toastify'

// ** Third Party Components
import axios from 'axios'
import Select from 'react-select'
import htmlToDraft from 'html-to-draftjs'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState, ContentState, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import { Redirect, useHistory } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'
import Breadcrumbs from '@components/breadcrumbs'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Reactstrap Imports
import { Row, Col, Card, CardBody, CardText, Form, Label, Input, Button, Toast, ToastBody, ToastHeader } from 'reactstrap'
import transparentBg from '@src/assets/images/svg/transparent.svg'
// ** Styles
import '@styles/react/libs/editor/editor.scss'
import '@styles/base/plugins/forms/form-quill-editor.scss'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/base/pages/page-blog.scss'
import { set } from 'react-hook-form'

const BlogCreate = () => {
    // toast
    const close = <button type='button' className='ms-1 btn-close'></button>
    //const html
    const initialContent = ``
    //useHistory
    const history = useHistory()
    const contentBlock = htmlToDraft(initialContent)
    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
    const editorState = EditorState.createWithContent(contentState)

    // ** States
    const [data, setData] = useState(
        {
            title: "",
            img: "",
            userFullName: "",
            content: "",
            blogPosted: "",
            excerpt: "",
            createSuccess: "",
            userId: localStorage.getItem('email')
        }
    ),
        [content, setContent] = useState(editorState)
    console.log(localStorage.getItem('email'))
    const handleCreate = (event) => {
        event.preventDefault()
        const contentHtml = draftToHtml(convertToRaw(content.getCurrentContent()))
        // console.log(content)
        // const contentBox = EditorState.createWithContent(content)
        fetch('https://low-root-mangosteen.glitch.me/blog', {
            method: "Post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...data, content: contentHtml })
        }).then((result) => {
            result.json().then((resp) => {
                // alert("Blog has been create")
                toast.success(
                    <Col md='6' sm='12'>
                        <Toast>
                            <ToastHeader close={close} icon='success'>
                                Ravens Team
                            </ToastHeader>
                            <ToastBody>Created Successfully 🗸</ToastBody>
                        </Toast>
                    </Col>
                )

            })

        })
        setData({
            createSuccess: true
        })
        history.push("/home")
    }

    return (
        <div className='blog-edit-wrapper'>
            <Breadcrumbs
                breadCrumbTitle='Create Blog'
                breadCrumbParent='Create' />
            <Row>
                <Col sm='12'>
                    <Card>
                        <CardBody>
                            <div className='d-flex'>
                            </div>
                            <Form className='mt-2'>
                                <Row>
                                    <Col md='6' className='mb-2'>
                                        <Label className='form-label' for='blog-edit-title'>
                                            Title
                                        </Label>
                                        <Input id='blog-edit-title'
                                            onChange={(event) => { setData({ ...data, title: event.target.value }) }}
                                        />
                                    </Col>

                                    <Col md='6' className='mb-2'>
                                        <Label className='form-label' for='blog-edit-slug'>
                                            Author
                                        </Label>
                                        <Input id='blog-edit-slug'
                                            onChange={(event) => { setData({ ...data, userFullName: event.target.value }) }}
                                        />
                                    </Col>
                                    <Col md='6' className='mb-2'>
                                        <Label className='form-label' for='blog-edit-slug'>
                                            Publish Date
                                        </Label>
                                        <Input type="date" id='blog-edit-slug'
                                            onChange={(event) => { setData({ ...data, blogPosted: event.target.value }) }}
                                        />
                                    </Col>
                                    <Col className='mb-2' sm='12'>
                                        <Label className='form-label' for='blog-edit-status'>
                                            Description
                                        </Label>
                                        <Input id='blog-edit-slug'
                                            onChange={(event) => { setData({ ...data, excerpt: event.target.value }) }}
                                        />
                                    </Col>
                                    <Col sm='12' className='mb-2'>
                                        <Label className='form-label'>Content</Label>
                                        <Editor toolbar={{
                                            image: {
                                                defaultSize: {
                                                    height: 'auto',
                                                    width: '100%'
                                                }
                                            }
                                        }} editorState={content} onEditorStateChange={data => setContent(data)} />
                                    </Col>
                                    <Col className='mb-2' sm='12'>
                                        <div className='border rounded p-2'>
                                            <h4 className='mb-1'>Featured Image Url</h4>
                                            <div className='d-flex flex-column flex-md-row'>

                                                <div>
                                                    <small className='text-muted'>Required image resolution 800x400, image size 10mb.</small>

                                                    <br />
                                                    <div className='d-inline-block '>
                                                        <div className='mb-6' sm='6'>
                                                            <Input
                                                                type='text'
                                                                onChange={(event) => { setData({ ...data, img: event.target.value }) }}


                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col className='mt-50'>
                                        <Button color='primary' className='me-1' onClick={handleCreate}>
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

        </div>
    )

}
export default BlogCreate
