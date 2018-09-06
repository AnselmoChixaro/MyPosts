import React, { Component } from 'react';
import { Toolbar, AppBar, List, ListItem, Select, FormControl, InputLabel, Typography, Button, MenuItem, Divider } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Redirect } from 'react-router-dom'
import Post from './Post';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { LoadPosts, LoadPostsByCategory } from '../Actions';

class Posts extends Component {

    state = {
        posts: [],
        redirect: false,
        orderby: "voteScore"
    }

    componentDidMount() {

        if (this.props.match) {
            this.props.loadPostsByCategory(this.props.match.params.categoryname);
        }
        else {
            this.props.loadPosts();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.Posts !== nextProps.Posts) {
            if (nextProps.Posts)
                this.setState(() => ({
                    posts: nextProps.Posts.sort((a, b) => {
                        return b.voteScore - a.voteScore
                    })
                }))
        }
    }

    onAddClickHandle = () => {
        this.setState({ redirect: true })
    }

    onHandleChange = (event) => {

        const orderby = "orderby";

        if (event.target.value === "voteScore") {
            this.setState({
                [orderby]: event.target.value,
                posts: this.props.Posts.sort((a, b) => {
                    return b.voteScore - a.voteScore
                })
            });
        } else if (event.target.value === "timestamp") {
            this.setState({
                [orderby]: event.target.value,
                posts: this.props.Posts.sort((a, b) => {
                    return b.timestamp - a.timestamp
                })
            });
        }
    }

    handlePostDeleted = (event) => {

        let posts = [...this.state.posts].filter((post) => post.id !== event.id);

        this.setState(() => ({
            posts: posts
        }))
    }

    render() {
        const addPostLink = {
            pathname: `/post/add/`,
            postid: ``
        };

        if (this.state.redirect) {
            return <Redirect push to={addPostLink} />
        }

        const { classes } = this.props

        return (
            <div>
                <div>
                    <AppBar position="static" color="default">
                        <Toolbar>
                            <Typography variant="title" color="inherit">
                                Posts
                            </Typography>
                            <FormControl className={classes.formControl}>
                                <InputLabel shrink>Order by</InputLabel>
                                <Select
                                    value={this.state.orderby}
                                    onChange={this.onHandleChange}
                                >
                                    <MenuItem value={"voteScore"}>VoteScore</MenuItem>
                                    <MenuItem value={"timestamp"}>Creation Date</MenuItem>
                                </Select>
                            </FormControl>
                        </Toolbar>
                    </AppBar>
                </div>
                <div>
                    <List>
                        {this.state.posts.map((post) => (
                            <div key={post.id}>
                                <ListItem key={post.id}>
                                    <Post post={post} show={false} handlePostDeleted={this.handlePostDeleted} disabled={false}></Post>
                                </ListItem>
                                <Divider />
                            </div>
                        ))}
                    </List>
                </div>
                <div>
                    <Button variant="fab" color="primary" mini aria-label="Add" className={classes.button} onClick={this.onAddClickHandle}>
                        <AddIcon />
                    </Button>
                </div>
            </div>
        );
    }
}

const styles = theme => ({
    button: {
        position: 'absolute',
        bottom: theme.spacing.root * 2,
        right: theme.spacing.unit * 2,
    },
    formControl: {
        position: 'absolute',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
    },
});

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

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Posts))