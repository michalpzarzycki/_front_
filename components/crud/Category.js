import { useState, useEffect } from 'react';
import Link from 'next/link'
import Router from 'next/router'
import { isAuth, getCookie } from '../../actions/auth'
import { create, getCategories, removeCategory } from '../../actions/category'

const Category = () => {
    const [values, setValues] = useState({
        name: '',
        error: false,
        success: false,
        categories: [],
        removed: false,
        reload: false
    })
    useEffect(() => {
        loadCategories()
    }, [values.reload])

    const loadCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                console.log(data.err)
            } else {
                setValues({ ...values, categories: data })
            }

        })
    }
    const { name, error, success, categories, removed, reload } = values;
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
    const newCategoryForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type='text' className="form-control" onChange={handleChange} value={name} required name="name" />
                <button type="submit" className="btn btn-primary">Create</button>
            </div>
        </form>
    )
    const showCategories = () => {
        return categories.map((category, index) => {
            return (
                <button onClick={() => deleteConfirm(category.slug)} title="Double click to delete" className="btn btn-outline-primary mr-1 ml-1 mt-3">{category.name}</button>
            )
        })
    }
const deleteConfirm = slug => {
    let answer = window.confirm('Are you sure you want to delete this category')
    if(answer) {
        deleteCategory(slug)
    }
}
const deleteCategory = (slug) => {
    console.log("DEETE SLUG")
    removeCategory(slug, token).then(data => {
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
        return <p className="text-success">Created a category!</p>
    }
}
const showError = () => {
    if(error) {
        return <p className="text-danger">Created already exists</p>
    }
}
const showRemoved = () => {
    if(removed) {
        return <p className="text-success">Removed a category</p>
    }
}
    return (<>
        {newCategoryForm()}
        {showSuccess()}
        {showError()}
        {showRemoved()}
        <div>
            {showCategories()}
        </div></>)
}

export default Category;



