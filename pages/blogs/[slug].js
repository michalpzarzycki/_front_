import Head from 'next/head'
import Link from 'next/link'
import {withRouter} from 'next/router'
import Layout from '../../components/Layout'
import {useEffect, useState} from 'react'
import {singleBlog, listRelated} from '../../actions/blog'
import getConfig from 'next/config'
import { Card } from 'reactstrap'
import renderHTML from 'react-render-html'
import DiscussThread from '../../components/DiscussThread'
import { publicRuntimeConfig } from '../../next.config'
const SingleBlog = ({blog, router}) => {
    const [related, setRelated] = useState([])
    useEffect(()=>{
        loadRelated()
    }, [])
   const{ publicRuntimeConfig } = getConfig()
   
    const loadRelated = () => {
        listRelated({blog}).then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                setRelated(data)
            }
        })
    }
    const showRelated = () => {
        return related.map((blog, i) => (
            <div className="card">
                <section>
                    <Link href={`/api/blogs/${blog.slug}`}>
                        <a>
                            <img
                                className=" img img-fluid"
                                style={{ maxHeight: 'auto', width: '100%'}}
                                src={`${API}/api/blog/photo/${blog.slug}`}    
                                alt={blog.title}
                            />
                        </a>
                    </Link>
                </section>
                <div className="card-body">
                    <section>
                        <Link href={`/api/blogs/${blog.slug}`}>
                            <h5 className="card-title">{blog.title}</h5>
                        </Link>
                        <p className="card-text">{renderHTML(blog.excerpt)}</p>
                    </section>
                </div>
                <div className="card-body">
                    Posted {blog.updatedAt} by {'  '}
                    <Link href={`/`}>
                        <a className="pull-right">{blog.postedBy.name}</a>
                    </Link>
                </div>
            </div>
        ))
    }
    const head = () => (
        <Head>
            <title>OlyDudes | {APP_NAME}</title>
            <meta name="description" content={blog.mdesc}/>
            <link rel="cannonical" href={`${publicRuntimeConfig.DOMAIN}/blogs/${router.pathname}`}/>
            <meta property="og:title" content={`Latest blogs | ${publicRuntimeConfig.APP_NAME}`}/>
            <meta property="og:description" content="OlyDudes blog, weightlifting, crossfit, running"/>
            <meta property="og:type" content="website"/>
            <meta property="og:url" content={`${publicRuntimeConfig.DOMAIN}/blog/${router.pathname}`}/>
            <meta property="og:site_name" content={`${publicRuntimeConfig.APP_NAME}`}/>

            <meta property="og:image" content={`${publicRuntimeConfig.API}/api/blogs/photo/${blog.slug}`}/>
            <meta property="og:image:secure_url" content={`${publicRuntimeConfig.API}/api/blogs/photo/${blog.slug}`}/>
            <meta property="og:site_name:type" content="image/jpg"/>
    

        </Head>
    )


    const showBlogCategories = (blog) => {
        return blog.categories.map((c, index) => (
            <Link href={`/categories/${c.slug}`}>
                <a classname="btn btn-primary mr-1 ml-1 mt-3">{c.name}</a>
            </Link>
        ))
    }
    const showBlogTags = (blog) => {
        return blog.tags.map((t, index) => (
            <Link href={`/tags/${t.slug}`}>
                <a classname="btn btn-primary mr-1 ml-1 mt-3">{t.name}</a>
            </Link>
        ))
    }
    const showComments = () => {
        return (
            <div>
                <DiscussThread id={blog.id} title={blog.title} path={`/blog/${blog.slug}`}/>
            </div>
        )
    }
    return <>
    {head()}
        <Layout>
            <main>
                <article>
                    <div className="container-fluid">
                        <section>
                            <div className="row" style={{ marginTop: '-30px'}}>
                                <img 
                                    src={`${API}/api/blog/photo/${blog.slug}`}
                                    alt={blog.title}
                                    className="img img-fluid featured-image"
                                    />
                            </div>
                        </section>
                        <section>
                        <div className="container">
                                <h1 className="display-2 pb-3 pt-3 text-center font-weight-bold">{blog.title}</h1>
                            </div>
                            <p className="lead pt-1 pb-1">
                                Written by {blog.postedBy.name} | Published {blog.updatedAt}
                            </p>
                            <div className="pb-3">
                                {showBlogCategories(blog)}
                                {showBlogTags(blog)}
                                <br />
                                <br />

                            </div>
                        </section>
                    </div>
                    <div className="container">
                        <section>
                            <div className="col-md-12 lead">{renderHTML(blog.body)}</div>
                        </section>
                    </div>
                    <div className="container pb-5">
                        <h4 className="text-center pt-5 pb-5 h2">Related blogs</h4>
                        <hr />
                        {/* {relared.length >0 && showRelated()} */}
                    </div>
                    <div className="container pb-5">
                       {showComments()}
                    </div>
                </article>
            </main>
        </Layout>
    </>
}
SingleBlog.getInitialProps = ({ query }) => {
    return singleBlog(query.slug).then(data => {
        if(data.error) {
            console.log(data.error)
        } else {
            return {blog: data}
        }
    })
}
export default withRouter(SingleBlog)