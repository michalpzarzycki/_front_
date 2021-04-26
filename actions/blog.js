import fetch from 'isomorphic-fetch'
import {API} from '../config'
import queryString from 'query-string'
import { handleResponse } from './auth'
export const createBlog = (blog, token) => {
    console.log("CREATE BLOG")
    return fetch(`${API}/api/blog`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: blog
    })
    .then(response => {
        handleResponse(response)
        console.log("SUCCESS")
        return response.json()
    })
    .catch(err => {
        console.log("FAILUREs")
        return err
    }) 
}


export const listBlogsWithCategoriesAndTags = (skip, limit) => {
    const data = {skip, limit}
    return fetch(`${API}/api/blogs-categories-tags`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        return err
    }) 
}

export const singleBlog = slug => {
    return fetch(`${API}/api/blog/${slug}`, {
        method: 'GET'
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}


export const listRelated = (blog) => {
    return fetch(`${API}/api/blogs/related`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(blog)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        return err
    }) 
}

export const listSearch = (params) => {
    console.log('search params', params)
    let query = queryString.stringify(params)
    console.log('query params', query)
    return fetch(`${API}/api/blogs/search?${query}`, {
        method: 'GET'
    })
    .then((response) => {
        return response.json()
    })
    .catch(err => console.log(err))
}