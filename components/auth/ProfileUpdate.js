import Link from 'next/link'
import { useState, useEffect } from 'react'
import Router from 'next/router'
import {getCookie, isAuth, updateUser} from '../../actions/auth'
import {getProfile, update} from '../../actions/user'

const ProfileUpdate = () => {
    const [values, setValues] = useState({
        username: '',
        name: '',
        email:'',
        password: '',
        error: false,
        success: false,
        loading: false,
        photo: '',
        userData: '',
        about:''
    })
    const token = getCookie('token');
    const { username, name, email, password, error, success, loading, photo, userData, about} = values

    const init = () => {
        getProfile(token).then(data => {
            console.log("UD",data)
            if(data?.error) {
                setValues({...values, error: data.error})
            } else {
                setValues({
                    ...values, 
                    username: data.username, 
                    name: data.name, 
                    email: data.email, 
                    about: data.about
                })
            }
        })
    }
    useEffect(() =>{
        init()
    }, [])
    const handleChange = name => event => {
            const value = name === 'photo' ? event.target.files[0] : event.target.value;
            let userFormData = new FormData()
            userFormData.set(name, value)
            setValues({...values, [name]: value, userData: userFormData, error:false, success: false})
    }
    const handleSubmit = event => {
        event.preventDefault()
        console.log("DTdsadas")

        setValues({...values, loading: true})
        update(token, userData).then(data => {
            console.log("DT", data)
            if(data?.error) {
                setValues({...values, error: data.error, success: false, loading: false})
            } else {
                updateUser(data, () => {
                    setValues({
                        ...values,
                        username: data.username,
                        name: data.name,
                        email: data.email,
                        about: data.about,
                        success: true,
                        loading: false
                    }) 
                })
            }
        })
    }
    const profileUpdateFrom = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="btn btn-outline-info">Profile photo
                <input onChange={handleChange('photo')} type="file" accept="image/*" className="form-control" hidden/>
                </label>
            </div>
            <div className="form-group">
                <label className="text-muted">Username</label>
                <input onChange={handleChange('username')} type="text" value={username} accept="image/*" className="form-control" />
            </div>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} type="text" value={name} accept="image/*" className="form-control" />
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} type="email" value={email} accept="image/*" className="form-control" />
            </div>
            <div className="form-group">
                <label className="text-muted">About</label>
                <input onChange={handleChange('about')} type="text" value={about} accept="image/*" className="form-control" />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} type="password" value={password} accept="image/*" className="form-control" />
            </div>
            <div>
                <button type="submit" className="btn btn-primary">SUBMIT</button>
            </div>
        </form>
    )

    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : "none"}}>All fields required</div>
    )
    const showSuccess = () => (
        <div className="alert alert-success" style={{display: success ? '' : "none"}}>Profile updated!</div>
    )
    const showLoading = () => (
        <div className="alert alert-info" style={{display: loading ? '' : "none"}}>Loading...</div>
    )
    return (
        <>
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    image
                </div>
                <div className="col-md-8">
                    {showError()}
                    {showSuccess()}
                    {showLoading()}
                   {profileUpdateFrom()}
                </div>
            </div>
        </div>
        </>
    )
}

export default ProfileUpdate