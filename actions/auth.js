import fetch from 'isomorphic-fetch'
import  getConfig from 'next/config'
import cookie from 'js-cookie'
import { Router } from 'next/router'
const { publicRuntimeConfig } = getConfig()

export const handleResponse = response => {
    if (response.status === 401) {
        signout(() => {
            Router.push({
                pathname: '/signin',
                query: {
                    message: 'Your session is expired. Please signin.'
                }
            })
        })

    }
}

export const signup = (user) => {
    return fetch(`${publicRuntimeConfig.API_DEVELOPMENT}/api/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
}

export const signin = (user) => {
    return fetch(`${publicRuntimeConfig.API_DEVELOPMENT}/api/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
}

export const signout = (next) => {
    removeCookie('token')
    removeLocalStorage('user')
    next()

    return fetch(`${publicRuntimeConfig.API_DEVELOPMENT}/api/signout`, {
        method: 'GET'
    }).then(responese => {
        console.log("signout success")
    }).catch(err => {
        console.log(err)
    })
}


//set cookie
export const setCookie = (key, value) => {
    if (process.browser) {
        cookie.set(key, value, {
            expires: 1
        })
    }
}

export const removeCookie = (key) => {
    if (process.browser) {
        cookie.remove(key, {
            expires: 1
        })
    }
}


//getcookie

export const getCookie = (key) => {
    if (process.browser) {
        return cookie.get(key)
    }
}
//local dtorage

export const setLocalStorage = (key, value) => {
    if (process.browser) {
        localStorage.setItem(key, JSON.stringify(value))
    }
}

export const removeLocalStorage = (key) => {
    if (process.browser) {
        localStorage.removeItem(key)
    }
}
//auth user by pass data to cookie and localstore

export const authenticate = (data, next) => {
    setCookie('token', data.token);
    setLocalStorage('user', data.user);
    next();
}

export const isAuth = () => {
    if (process.browser) {
        const cookieChecked = getCookie('token');
        if (cookieChecked) {
            if (localStorage.getItem('user')) {
                return JSON.parse(localStorage.getItem('user'))
            } else {
                return false;
            }
        }
        return false;
    }
}

export const updateUser = (user, next) => {
    if (process.browser) {
        if (localStorage.getItem('uset')) {
            let auth = JSON.parse(localStorage.getItem('user'))
            auth = user
            localStorage.setItem(user, JSON.stringify(auth))
            next()
        }
    }
}