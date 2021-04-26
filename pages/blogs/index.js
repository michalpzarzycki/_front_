import Head from 'next/head'
import Link from 'next/link'
import {withRouter} from 'next/router'
import Layout from '../../components/Layout'
import {useState} from 'react'
import {listBlogsWithCategoriesAndTags} from '../../actions/blog'
import {API, DOMAIN, APP_NAME } from '../../config'
import { Card } from 'reactstrap'

const Blogs = ({ blogs, categories, tags, totalBlogs, router, blogsLimit, blogsSkip}) => {
const [limit, setLimit] = useState(blogsLimit)
const [skip, setSkip] = useState(0)
const [size, setSize] = useState(totalBlogs)
const [loadedBlogs, setLoadedBlogs] = useState([])

const loadMore = () => {
    let toSkip = skip + limit;
    listBlogsWithCategoriesAndTags(toSkip, limit).then((data) => {
        if(data.error) {
            console.log(data.error)
        } else {
            setLoadedBlogs([...loadedBlogs,...data.blogs])
            setSize(data.size)
            setSkip(toSkip)
        }
    })
}
const loadMoreButton = () => {
    return (
        size > 0 && size >= limit && (<button className="btn btn-primay" onClick={loadMore}>Load more</button>)
    )
}
    const head = () => (
        <Head>
            <title>OlyDudes | {APP_NAME}</title>
            <meta name="description" content="OlyDudes blog, weightlifting, crossfit, running"/>
            <link rel="cannonical" href={`${DOMAIN}${router.pathname}`}/>
            <meta property="og:title" content={`Latest blogs | ${APP_NAME}`}/>
            <meta property="og:description" content="OlyDudes blog, weightlifting, crossfit, running"/>
            <meta property="og:type" content="website"/>
            <meta property="og:url" content={`${DOMAIN}${router.pathname}`}/>
            <meta property="og:site_name" content={`${APP_NAME}`}/>

            <meta property="og:image" content="/static/images/seoblog.js"/>
            <meta property="og:image:secure_url" content="/static/images/seoblog.js"/>
            <meta property="og:site_name:type" content="image/jpg"/>
    

        </Head>
    )

    const showBlogs = () => {
        return(
            blogs.map((blog, index) => (
                <article key={index}>
                    <div className="lead pb-4">
                        <header>
                            <Link href={`/blogs/${blog.slug}`}>
                                <a className="display-4 pt-3 pb-3 font-weight-bold"><h2>{blog.title}</h2></a>
                            </Link>
                        </header>
                        <section>
                            <p className="mark ml-1 pt-2 pb-2">
                                Written by {blog.postedBy.name} | Published {blog.updatedAt}
                            </p>
                        </section>
                        <section>
                            <p>blog categories and tags</p>
                        </section>
                        <div className="row">
                            <div className="col-md-4">
                                <section>
                                    <img className="img img-fluid" style={{maxHeight: '150px', width: 'auto'}} src={`${API}/api/blog/photo/${blog.slug}`} alt={blog.title}/>
                                </section>
                            </div>
                            <div className="col-md-8">
                                <section>
                                    <div className="pb-3">{blog.excerpt}</div>
                                    <Link href={`/blogs/${blog.slug}`}>
                                        <a className="btn btn-primary pt-2">Read more</a>
                                    </Link>
                                </section>
                            </div>
                        </div>
                    </div>
                    <hr />
                </article>
            )
        ))
    }
    const showAllCategories = () => {
        return categories.map((c, index) => (
            <Link href={`/categories/${c.slug}`}>
                <a classname="btn btn-primary mr-1 ml-1 mt-3">{c.name}</a>
            </Link>
        ))
    }
    const showAllTags = () => {
        return categories.map((t, index) => (
            <Link href={`/tags/${t.slug}`}>
                <a classname="btn btn-primary mr-1 ml-1 mt-3">{t.name}</a>
            </Link>
        ))
    }

    const showLoadedBlogs = () => {
        return loadedBlogs.map((blog, i) => (
            <article key={i}>
                <Card blog={blog}/>
            </article>
        ))
    }
    return(
        <>
        {head()}
         <Layout>
             <main>
                 <div className="container-fluid">
                     <header>
                         <div className="col-md-12 pt-3">
                            <h1 className="display-4 font-weight-bold text-center">BLOGS</h1>
                         </div>
                     </header>
                     <section>
                         <p>Show categories and tags</p>
                         <div className="pb-5">
                             {showAllCategories()}
                             <br />
                             {showAllTags()}
                         </div>
                     </section>
                 </div>
                 <div className="container-fluid">{showBlogs()}</div>
                 <div className="container-fluid">{showLoadedBlogs()}</div>
                 <div className="text-center pt-5 pb-5">{loadMoreButton()}</div>
             </main>
         </Layout>
        </>
    )
}

Blogs.getInitialProps = () => {
    let skip = 0;
    let limit = 2;

    return listBlogsWithCategoriesAndTags().then(data => {
        if(data.error) {
            console.log(data.err)
        } else {
            return {
                blogs: data.blogs,
                categories: data.categories, 
                tags: data.tags, 
                totalBlogs: data.size,
                blogsLimit: limit,
                blogsSkip: skip
            }
        }
    })
}
export default withRouter(Blogs);