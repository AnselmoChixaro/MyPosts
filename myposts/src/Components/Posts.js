import React, { Component } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import { List, ListItem } from '@material-ui/core';
import Post from './Post';
import { connect } from 'react-redux'
import { LoadPosts, LoadPostsByCategory } from '../Actions';

class Posts extends Component {

    componentDidMount() {

        if( this.props.match ){
            this.props.loadPostsByCategory(this.props.match.params.categoryname);
        }
        else{
            this.props.loadPosts();
        }
    }
    
    render() {

        const { Posts } = this.props

        return (
            <div>
                <div>
                    <AppBar position="static" color="default">
                        <Toolbar>
                            <Typography variant="title" color="inherit">
                                Posts
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </div>
                <div>
                    <List>
                        {Posts.map((post) => (
                            <ListItem key={post.id}>
                                <Post post={post}></Post>
                            </ListItem>
                        ))}
                    </List>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        Posts: state.Posts.posts
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadPosts: () => dispatch(LoadPosts()),
        loadPostsByCategory: (categoryName) => dispatch(LoadPostsByCategory(categoryName))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)