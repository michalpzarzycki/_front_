import Link from 'next/link'
import {useState, useEffect} from 'react'
import Router from 'next/router'
import dynamic from 'next/dynamic'
import {withRouter} from 'next/router'
import {getCookie, isAuth} from '../../actions/auth'
import {getCategories} from '../../actions/category'
import {getTags} from '../../actions/tag'
import {createBlog} from '../../actions/blog'
import {quillFormats, quillModules} from '../../helpers/quill'
const ReactQuill = dynamic(() => import('react-quill'), {ssr: false})
import '../../node_modules/react-quill/dist/quill.snow.css'

const CreateBlog = ({ router }) => {
    const [body, setBody] = useState(blogFromLS())
    const [values, setValues] = useState({
        error:'',
        sizeError:'',
        success: '',
        formData:'',
        title:'',
        hidePublishButton: false
    })

    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])

    const [checked, setChecked] = useState([])
    const [checkedTag, setCheckedTag] = useState([])
    const { error, sizeError, success, formData, title, hidePublishButton } = values;
    useEffect(() => {
        setValues({...values, formData: new FormData()})
        initCategories()
        initTags()
    }, [router])
    const token = getCookie('token')
    function initCategories() {
        getCategories().then(data => {
            console.log("CATS", categories)
            if(data.error) {
                setValues({...values, error: data.error})
            } else {
                setCategories(data)            }
        })
    }

    function initTags() {
        getTags().then(data => {
            if(data.error) {
                setValues({...values, error: data.error})
            } else {
                setTags(data)
            }
        })
    }

    function blogFromLS()  {
        if(typeof window === 'undefined') {
            return false
        } 

        if(localStorage.getItem('blog')) {
            return JSON.parse(localStorage.getItem('blog'))
        } else {
            return false
        }
    }
    const handleSubmit = (event) => {
        event.preventDefault()
console.log("CLICKEF")
        createBlog(formData, token).then(data => {
            console.log("DAAT")
            console.log(data)
            if(data.error) {
                console.log("ERROR")
                console.log(data.error)
                setValues({...values, error: data.error})
            } else {
                console.log("BBB")
                setValues({...values, title:'', error:'', success:`Created a new blog titled "${data.title}" `})
                setBody('')
                setCategories([])
                setTags([])
            }
        })
    }
    const handleChange = (name) => (event) => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value
        formData.set(name, value)
        setValues({...values, [name]: value, formData, error: ''})
    }
    const handleBodyChange = (event) => {
        console.log(event)
        setBody(event)
        formData.set('body', event)
        if(typeof window !== 'undefined') {
            localStorage.setItem('blog', JSON.stringify(event))
        }
        console.log("FORM DATA", formData)
    }
    const handleToggle = (tag) => () => {
        setValues({...values, error: ''})
        const clickTag = checked.indexOf(tag)
        const all = [...checkedTag]
        if(clickTag === -1) {
            all.push(tag)
        } else {
            all.splice(clickTag, 1)
        }

        console.log(all)
        setCheckedTag(all)
        formData.set('tags', all)
    }
    const handleTagsToggle = (category) => () => {
        setValues({...values, error: ''})
        const clickCategory = checked.indexOf(category)
        const all = [...checked]
        if(clickCategory === -1) {
            all.push(category)
        } else {
            all.splice(clickCategory, 1)
        }

        console.log(all)
        setChecked(all)
        formData.set('categories', all)
    }
    const createBlogForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="text-muted">Title</label>
                    <input type="text" className="form-control" value={title} onChange={handleChange('title')}/>
                </div>

                <div className="form-group">
                    <ReactQuill modules={quillModules} formats={quillFormats} value={body} placeholder="Write sth amazing!" onChange={handleBodyChange}/>
                </div>

                <div >
                    <button type="submit" className="btn btn-primary">
                        Add Blog 
                    </button>
                </div>
            </form>
        )
    }
    const showTags = () => {
        return(
            tags && tags.map((tag, index) => (
                <li key={index} className="list-unstyled">
                    <input onChange={handleTagsToggle(tag._id)} type="checkbox" className="mr-2"/>
                    <label className="form-check-label">{tag.name}</label>
                </li>
            ))
        )
    }
    const showCategories = () => {
        return(
            categories && categories.map((category, index) => (
                <li key={index} className="list-unstyled">
                    <input onChange={handleToggle(category._id)} type="checkbox" className="mr-2"/>
                    <label className="form-check-label">{category.name}</label>
                </li>
            ))
        )
    }
    return (
        <>
            <div className="col">
            {createBlogForm()}
            </div>
            <div className="col">
                <div>
                    <div className="form-group">
                        <h5>FEATURE IMAGE</h5>
                        <hr />

                        <small className="text-muted">Max size: 1mb</small>
                        <label className="btn btn-outline-info">Upload feature imagex
                        <input onChange={handleChange('photo')} type='file' accept="image/*" hidden={true}/>
                        </label>
                    </div>
                </div>
                <h5>CATEGORIES</h5>
                <ul style={{maxHeight:'200px', overflowY: 'scroll', minWidth:'150px'}}>{showCategories()}</ul>
                <h5>TAGS</h5>
                <ul>{showTags()}</ul>
            </div>
        </>
    )
}
export default withRouter(CreateBlog)