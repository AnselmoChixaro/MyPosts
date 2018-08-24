import fetch from 'cross-fetch';

const api = "http://localhost:3001"

let token = localStorage.token

if (!token)
    token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
    'Accept': 'application/json',
    'Authorization': token
}

export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES'
export const RECEIVED_CATEGORIES = 'RECEIVED_CATEGORIES'
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVED_POSTS = 'RECEIVED_POSTS'
export const REQUEST_POST = 'REQUEST_POST'
export const RECEIVED_POST = 'RECEIVED_POST'
export const ADD_POST = "ADD_POST"
export const EDIT_POST = "EDIT_POST"
export const REMOVE_POST = "REMOVE_POST"
export const ADD_COMMENT = "ADD_COMMENT"
export const EDIT_COMMENT = "EDIT_COMMENT"
export const REMOVE_COMMENT = "REMOVE_COMMENT"

export function requestCategories() {
    return {
        type: REQUEST_CATEGORIES
    }
}

export function receivedCategories(data) {
    return {
        type: RECEIVED_CATEGORIES,
        categories: data.categories
    }
}

export function LoadCategories() {
    return function (dispatch) {
        dispatch(requestCategories())
        return fetch(`${api}/categories`, { headers })
            .then(res => res.json())
            .then(data => dispatch(receivedCategories(data)))
    }
}

export function LoadPostsByCategory(category) {
    return function (dispatch) {
        dispatch(requestPosts(category))
        return fetch(`${api}/${category}/posts`, { headers })
            .then(res => res.json())
            .then(data => dispatch(receivedPosts(data)))
    }
}

export function requestPosts(category) {
    return {
        type: REQUEST_POSTS,
        filter: category
    }
}

export function receivedPosts(data) {
    return {
        type: RECEIVED_POSTS,
        posts: data
    }
}

export function LoadPosts() {
    return function (dispatch) {
        dispatch(requestPosts())
        return fetch(`${api}/posts`, { headers })
            .then(res => res.json())
            .then(data => dispatch(receivedPosts(data)))
    }
}

export function requestPost(id){
    return{
        type: REQUEST_POST,
        id: id
    }
}

export function receivedPost(id, post){
    return{
        type: RECEIVED_POST,
        id: id,
        post: post
    }
}

export function LoadPost(id){
    return function (dispatch){
        dispatch(requestPost(id))
        return fetch(`${api}/posts/${id}`, { headers })
        .then( res => res.json())
        .then( data => dispatch(receivedPost(id, data)))
    }
}

export function addPost({ post }) {
    return {
        type: ADD_POST,
        post
    }
}

export function editPost({ post }) {
    return {
        type: EDIT_POST,
        post
    }
}

export function removePost({ post }) {
    return {
        type: REMOVE_POST,
        post
    }
}

export function addComment({ post, comment }) {
    return {
        type: ADD_COMMENT,
        post,
        comment
    }
}

export function editComment({ post, comment }) {
    return {
        type: EDIT_COMMENT,
        post,
        comment
    }
}

export function removeComment({ post, comment }) {
    return {
        type: REMOVE_COMMENT,
        post,
        comment
    }
}