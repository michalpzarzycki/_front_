import Router from 'next/router'
import {useState, useEffect} from 'react'
import {signin, authenticate, isAuth} from '../../actions/auth'
const SignInComponent = () => {


    const [values, setValues] = useState({
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
    <form onSubmit={handleSubmit}>
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
    const { email, password, error, loading, message, showForm} = values;

    const handleSubmit = (event) => {
        event.preventDefault()
        setValues({...values, loading: true, error: false})
        const user = { email, password}
        signin(user)
        .then(data => {
            if(data.error) {
                setValues({...values, error: data.error, loading: false})
            } else {
                authenticate(data, () => {
                    if(isAuth() && isAuth().role === 1) {
                        Router.push('/admin')
                    } else {
                        Router.push('/user')
                    }
                })
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

export default SignInComponent