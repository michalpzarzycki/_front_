import { useState, useEffect } from 'react';
import Link from 'next/link'
import Router from 'next/router'
import { isAuth, getCookie } from '../../actions/auth'
import { create, getTags, removeTag } from '../../actions/tag'

const Tag = () => {
    const [values, setValues] = useState({
        name: '',
        error: false,
        success: false,
        tags: [],
        removed: false,
        reload: false
    })
    useEffect(() => {
        loadTags()
    }, [values.reload])

    const loadTags = () => {
        getTags().then(data => {
            if (data.error) {
                console.log(data.err)
            } else {
                setValues({ ...values, tags: data })
            }

        })
    }
    const { name, error, success, tags, removed, reload } = values;
    const token = getCookie('token');
    const handleSubmit = (event) => {
        event.preventDefault()
        create({ name }, token).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false })
            } else {
                setValues({ ...values, error: '', success: true, reload: !reload })
            }
        })
    }
    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value, error: false, success: false, removed: '' })

    }
    const newTagForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="text-muted">Tag Name</label>
                <input type='text' className="form-control" onChange={handleChange} value={name} required name="name" />
                <button type="submit" className="btn btn-primary">Create</button>
            </div>
        </form>
    )
    const showTags = () => {
        return tags.map((tag, index) => {
            return (
                <button onClick={() => deleteConfirm(tag.slug)} title="Double click to delete" className="btn btn-outline-primary mr-1 ml-1 mt-3">{tag.name}</button>
            )
        })
    }
const deleteConfirm = slug => {
    let answer = window.confirm('Are you sure you want to delete this category')
    if(answer) {
        deleteTag(slug)
    }
}
const deleteTag = (slug) => {
    console.log("DEETE SLUG")
    removeTag(slug, token).then(data => {
        if(data.error) {
            console.log(data.error)
        } else {
            setValues({...values, error: false, success: false, name:"", removed: !removed, reload: !reload})
            console.log("REMOVED")
        }
    })
}
const showSuccess = () => {
    if(success) {
        return <p className="text-success">Created a tag!</p>
    }
}
const showError = () => {
    if(error) {
        return <p className="text-danger">Tag already exists</p>
    }
}
const showRemoved = () => {
    if(removed) {
        return <p className="text-success">Removed a tag</p>
    }
}
    return (<>
        {newTagForm()}
        {showSuccess()}
        {showError()}
        {showRemoved()}
        <div>
            {showTags()}
        </div></>)
}

export default Tag;



