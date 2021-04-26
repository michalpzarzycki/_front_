import Link from 'next/link'
import Layout from '../components/Layout'
import { withRouter } from 'next/router'
import SignInComponent from '../components/auth/SigninComponent'


function SignIn({ router }) {
    const showRedirectMessage = () => {
        if (router.query.message) {
            return (
                <div className="alert alert-danger">{router.query.message}</div>
            )
        } else {
            return;
        }
    }
    return (
        <Layout>
            <h2 className="text-center">Log In</h2>
            <div className="row">
                <div className="col-md-6 offset-md-3">{showRedirectMessage()}</div>
            </div>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <SignInComponent />
                </div>
            </div>
        </Layout>
    )
}

export default withRouter(SignIn)
