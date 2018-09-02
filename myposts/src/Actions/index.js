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
export const EDITING_POST = "EDITING_POST"
export const REMOVE_POST = "REMOVE_POST"
export const REQUEST_COMMENTS = "REQUEST_COMMENTS"
export const RECEIVED_COMMENTS = "RECEIVED_COMMENTS"
export const ADD_COMMENT = "ADD_COMMENT"
export const EDIT_COMMENT = "EDIT_COMMENT"
export const REMOVE_COMMENT = "REMOVE_COMMENT"
export const VOTE = "VOTE"
export const VOTE_COMMENT = "VOTE_COMMENT"

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

export function requestPost(id) {
    return {
        type: REQUEST_POST,
        id: id
    }
}

export function receivedPost(id, post) {
    return {
        type: RECEIVED_POST,
        id: id,
        post: post
    }
}

export function LoadPost(id) {
    return function (dispatch) {
        dispatch(requestPost(id))
        return fetch(`${api}/posts/${id}`, { headers })
            .then(res => res.json())
            .then(data => dispatch(receivedPost(id, data)))
    }
}

export function addingPost(post) {
    return {
        type: ADD_POST,
        post
    }
}

export function AddPost(post) {
    return function (dispatch) {
        dispatch(addingPost(post))
        let id = post.id;
        let timestamp = post.timestamp;
        let title = post.title;
        let body = post.body;
        let author = post.author;
        let category = post.category;
        return fetch(`${api}/posts`, {
            method: `POST`,
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, timestamp, title, body, author, category })
        }).then(res => res.json())
    }
}

export function editingPost(post) {
    return {
        type: EDITING_POST,
        post
    }
}

export function editPost(post) {
    return {
        type: EDIT_POST,
        post
    }
}

export function PutPost(post) {
    return function (dispatch) {
        dispatch(editingPost(post))
        let title = post.title;
        let body = post.body;
        return fetch(`${api}/posts/${post.id}`, {
            method: `PUT`,
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, body })
        }).then(res => res.json())
    }
}

export function removePost(post) {
    return {
        type: REMOVE_POST,
        post
    }
}

export function DeletePost(post) {
    return function (dispatch) {
        dispatch(removePost(post))
        return fetch(`${api}/posts/${post.id}`, {
            method: `DELETE`,
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify()
        }).then(res => res.json())
    }
}

export function requestComments(postId) {
    return {
        type: REQUEST_COMMENTS,
        postId: postId
    }
}

export function receivedComments(postid, comments) {
    return {
        type: RECEIVED_COMMENTS,
        postid: postid,
        comments: comments
    }
}

export function LoadComments(postId) {
    return function (dispatch) {
        dispatch(requestComments(postId))
        return fetch(`${api}/posts/${postId}/comments`, { headers })
            .then(res => res.json())
            .then(data => dispatch(receivedComments(postId, data)))
    }
}

export function addingComment(comment) {
    return {
        type: ADD_COMMENT,
        post: comment.parentid,
        comment: comment
    }
}

export function AddComment(comment){
    return function (dispatch) {
        dispatch(addingComment(comment))
        let parentId = comment.parentId;
        let id = comment.id;
        let timestamp = Date.now();
        let body = comment.body;
        let author = comment.author;
        return fetch(`${api}/comments`, {
            method: `POST`,
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, timestamp, body, author, parentId })
        }).then(res => res.json())
    }
}

export function editComment(comment) {
    return {
        type: EDIT_COMMENT,
        comment
    }
}

export function PutComment(comment) {
    return function (dispatch) {
        dispatch(editComment(comment))
        let body = comment.body;
        let timestamp = Date.now();
        return fetch(`${api}/comments/${comment.id}`, {
            method: `PUT`,
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ timestamp, body })
        }).then(res => res.json())
    }
}

export function deletingComment(comment){
    return{
        type: REMOVE_COMMENT,
        comment: comment
    }
}

export function DeleteComment(comment){
    return function(dispatch){
        dispatch(deletingComment(comment))
        return fetch(`${api}/comments/${comment.id}`, {
            method: `DELETE`,
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify()
        }).then(res => res.json())
    }
}

export function voted(voteChoice) {
    return {
        type: VOTE,
        voteChoice
    }
}

export function Vote(data) {
    return function (dispatch) {
        dispatch(voted(data))
        let id = data.id;
        let option = data.voteChoice;
        return fetch(`${api}/posts/${id}`, {
            method: `POST`,
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ option })
        }).then(res => res.json())
    }
}


export function votedComment(voteChoice){
    return{
        type: VOTE_COMMENT,
        voteChoice
    }
}

export function VoteComment(data) {
    return function (dispatch) {
        dispatch(votedComment(data))
        let id = data.id;
        let option = data.voteChoice;
        return fetch(`${api}/comments/${id}`, {
            method: `POST`,
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ option })
        }).then(res => res.json())
    }
}