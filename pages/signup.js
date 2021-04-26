import Link from 'next/link'
import Layout from '../components/Layout'
import SignUpComponent from '../components/auth/SignupComponent'

function SignUp() {
    return (
        <Layout>
         <h2 className="text-center">REGISTER</h2>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                <SignUpComponent />
                </div>
            </div>
        </Layout>
    )
}

export default SignUp
