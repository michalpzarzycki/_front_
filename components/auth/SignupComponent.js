import {useState, useEffect} from 'react'
import {signup, isAuth} from '../../actions/auth'
import Router from 'next/router'
const SignUpComponent = () => {
    const [values, setValues] = useState({
        name:'',
        email:'',
        password:'',
        error:'',
        loading: false,
        message: '',
        showForm: true
    }) 
    useEffect(() => {
        isAuth() && Router.push('/')
    }, [])
const signUpForm = () => (
    <form method="POST" onSubmit={handleSubmit}>
    <div className="form-group">
        <input value={name} name="name" type="text" onChange={handleChange} className="form-control" placeholder="Your name" autoComplete="off"/>
    </div>
    <div className="form-group">
        <input value={password} name="password" type="password" onChange={handleChange} className="form-control" placeholder="Password"/>
    </div>
    <div className="form-group">
        <input value={email} type="email" name="email" onChange={handleChange} className="form-control" placeholder="Email"/>
    </div>
    <div>
        <button className="btn btn-primary">SUBMIT</button>
    </div>
</form>
)
const showLoading = () => (loading ? <div className="alert alert-info">Loading...</div> : "" );
const showError = () => (error ? <div className="alert alert-danger">{error}</div> : "" );
const showMessage = () => (message ? <div className="alert alert-info">{message}.</div> : "" );
    const {name, email, password, error, loading, message, showForm} = values;

    const handleSubmit = (event) => {
        event.preventDefault()
        console.table({name, email, password, error, loading, message, showForm})
        setValues({...values, loading: true, error: false})
        const user = {name, email, password}
        signup(user)
        .then(data => {
            if(data.error) {
                setValues({...values, error: data.error, loading: false})
            } else {
                setValues({...values, name:'', email: '', password:'', loading: false, message: data.message, error:'', showForm: false})
            }
        })
        
    }
    const handleChange = (event) => {
        setValues({...values,error: false, [event.target.name]: event.target.value})
    }
    return(<>
    
            {showMessage()}
            {showLoading()}
            {showError()}
            {showForm && signUpForm()}
        </>
        )
}

export default SignUpComponent