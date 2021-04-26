import Head from 'next/head'
import Link from 'next/link'
import {withRouter} from 'next/router'
import Layout from '../../components/Layout'
import { singleCategory} from '../../actions/category'
import {API, DOMAIN, APP_NAME } from '../../config'
import { Card } from 'reactstrap'
import renderHTML from 'react-render-html'

const Category = ({ category, blogs }) => {
    return(
        <>
            <Layout>
                <main>
                    <div className="container-fluid text-center">
                        <header>
                            <div className="col-md-12 pt-3">
                                <h1 className="display-4 font-weight-bold">category name</h1>
                                {JSON.stringify(blogs)}
                            </div>
                        </header>
                    </div>
                </main>
            </Layout>
        </>
    )
}

Category.getInitialProps = ({ query }) => {
    return singleCategory(query.slug).then(data => {
        console.log("singleCate", data)
        if(data.error) {
            console.log(data.error)
        } else {
            return { category: data.category, blogs: data.blogs}
        }
    })
}

export default Category