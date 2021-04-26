import fetch from 'isomorphic-fetch'
import {API} from '../config'
import { handleResponse } from './auth'
export const userPublicProfile = (username) => {
    console.log("get Profile")
    return fetch(`${API}/api/user/${username}`, {
        method: 'GET'
    })
    .then(response => {
        console.log("SUCCESS")
        return response.json()
    })
    .catch(err => {
        console.log("FAILUREs")
        return err
    }) 
}



export const getProfile = token => {
    return fetch(`${API}/api/profile`, {
        method: 'GET',
        headers: {
            Accept : 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        
        return response.json()
    })
    .catch(err => {
        console.log(err)
    }) 
}
export const update = (token, user) => {
    return fetch(`${API}/api/user/update`, {
        method: 'PUT',
        headers: {
            Accept : 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: user
    })
    .then(response => {
        handleResponse(response)

        return response.json()
    })
    .catch(err => {
        console.log(err)
    }) 
}