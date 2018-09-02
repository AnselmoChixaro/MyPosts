import {
    REQUEST_CATEGORIES,
    RECEIVED_CATEGORIES,
    REQUEST_POSTS,
    RECEIVED_POSTS,
    REQUEST_POST,
    RECEIVED_POST,
    ADD_POST,
    EDITING_POST,
    EDIT_POST,
    REMOVE_POST,
    ADD_COMMENT,
    EDIT_COMMENT,
    REMOVE_COMMENT,
    VOTE,
    VOTE_COMMENT,
    REQUEST_COMMENTS,
    RECEIVED_COMMENTS
} from '../Actions'
import { combineReducers } from 'redux';

const initialState = {
    posts:[],
    post:{}
}
const categories = []
const comments = []

function Comments( state = comments, action ){
    switch(action.type ){
        case REQUEST_COMMENTS:
        case RECEIVED_COMMENTS:{
            return Object.assign([], state, action)
        }
        case EDIT_COMMENT:{
            return Object.assign([], state, action)
        }
        case VOTE_COMMENT:{
            return Object.assign([], state, action)
        }
        case ADD_COMMENT:{
            return Object.assign([], state, action)
        }
        case REMOVE_COMMENT:{
            return Object.assign([], state, action)
        }
        default:
            return state
    }
}

function Posts(state = initialState, action) {
    switch (action.type) {
        case REQUEST_POSTS:
        case RECEIVED_POSTS: {
            return Object.assign({}, state, action)
        }
        case REQUEST_POST:
        case RECEIVED_POST: {
            return Object.assign({}, state, action)
        }
        case EDITING_POST:
        case EDIT_POST:{
            return Object.assign({}, state, action)
        }
        case ADD_POST:{
            return Object.assign({}, state, action)
        }
        case VOTE:{
            return Object.assign({}, state, action)
        }
        case REMOVE_POST:{
            return Object.assign({}, state, action)
        }
        default:
            return state
    }
}

function Category(state = categories, action) {
    switch (action.type) {

        case REQUEST_CATEGORIES:
        case RECEIVED_CATEGORIES: {
            return Object.assign([], state.categories, action.categories)
        }
        default:
            return state
    }
}

const rootReducer = combineReducers({
    Posts,
    Category,
    Comments
})

export default rootReducer