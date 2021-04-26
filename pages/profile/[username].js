import Head from 'next/head'
import Link from 'next/link'
import {withRouter} from 'next/router'
import Layout from '../../components/Layout'
import { userPublicProfile } from '../../actions/user'
import getConfig from 'next/config'


const UserProfile = ({user, blogs}) => {
    const {publicRuntimeConfig } = getConfig()

    const head = () => (
        <Head>
            <title>OlyDudes | {publicRuntimeConfig.APP_NAME}</title>
            <meta name="description" content="OlyDudes blog, weightlifting, crossfit, running"/>
            <link rel="cannonical" href=""/>
            <meta property="og:title" content={`Latest blogs | ${publicRuntimeConfig.APP_NAME}`}/>
            <meta property="og:description" content="OlyDudes blog, weightlifting, crossfit, running"/>
            <meta property="og:type" content="website"/>
            <meta property="og:url" content=""/>
            <meta property="og:site_name" content={`${publicRuntimeConfig.APP_NAME}`}/>

            <meta property="og:image" content="/static/images/seoblog.js"/>
            <meta property="og:image:secure_url" content="/static/images/seoblog.js"/>
            <meta property="og:site_name:type" content="image/jpg"/>
    

        </Head>
    )
    return(
        <>
        {head()}
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-8">
                                        <h5>{user.name}</h5>
                                        <p className="text-muted">Joined {user.name}</p>
                                    </div>
                                    <div className="col-md-4">
                                        <img 
                                            src={`${API}/api/user/photo/${user.username}`}
                                            className="img img-fluid img-thumbnail mb-3"    
                                            style={{ maxHeight: 'auto', maxWidth: '100%' }}
                                            alt="user profile"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <div className="container pb-5">
                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title bg-primary pt-4 pb-4 pl-4 pr-4">Recent blogs by {user.name}</h5>
                                <br />
                                 <p>show user blogs</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h5 className="card-title bg-primary pt-4 pb-4 pl-4 pr-4">Message {user.name}</h5>
                        <br />
                        <p>contact form</p>
                    </div>
                </div>
            </div>
        </Layout>
        </>
    )
}

UserProfile.getInitialProps = ({ query }) => {
    return userPublicProfile(query.username).then(data => {
      if(data.error) {
           console.log(data.error)
        } else {
            return {user: data.user, blogs: data.blogs}
        }
    })
}
export default UserProfile;