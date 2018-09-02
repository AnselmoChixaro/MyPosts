import React from 'react';
import { connect } from 'react-redux'
import { LoadComments, LoadPost } from '../Actions';
import Post from './Post';
import Comment from './Comment'
import { List, ListItem, Button, withStyles, Divider } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

class Comments extends React.Component {

    state = {
        post: {},
        comments: [],
        adding: false
    }

    componentDidMount() {
        this.props.loadPost(this.props.match.params.postid)
        this.props.loadComments(this.props.match.params.postid)
    }

    componentWillReceiveProps(nextProp) {
        if (this.props.post !== nextProp.post) {
            this.setState(() => ({
                post: nextProp.post
            }))
        }

        if (this.props.comments !== nextProp.comments) {
            this.setState(() => ({
                comments: nextProp.comments.sort((a, b) => {
                    return b.voteScore - a.voteScore
                })
            }))
        }
    }

    onAddClickHandle = () => {
        this.setState((prevState) => ({
            adding: !prevState.adding
        }))
    }

    handleDeleteComment = (event) => {

        console.log(event)

        let comments = [...this.state.comments].filter((comment) => comment.id !== event.id);

        this.setState(() => ({
            comments: comments,
            adding: false
        }))
    }

    handleAddComment = (event) => {

        let comments = [...this.state.comments].concat(event);

        this.setState(() => ({
            comments: comments,
            adding: false
        }))
    }

    render() {

        const { classes } = this.props

        return (
            <div>
                <div>
                    <Post post={this.state.post} disabled={true} />
                </div>
                <div>
                    <List>
                        {this.state.comments.map((comment) => (
                            <div key={comment.id}>
                                <ListItem key={comment.id}>
                                    <Comment comment={comment} handleDeleteComment={this.handleDeleteComment} ></Comment>
                                </ListItem>
                                <Divider />
                            </div>
                        ))}
                    </List>
                </div>
                <div>
                    {
                        this.state.adding ?
                            (
                                <Comment comment={newComment(this.state.post.id)} handleAddComment={this.handleAddComment} ></Comment>
                            )
                            : null
                    }
                </div>
                <div>
                    <Button variant="fab" color="primary" mini aria-label="Add" className={classes.button} onClick={this.onAddClickHandle}>
                        <AddIcon />
                    </Button>
                </div>
            </div>
        )
    }
}

const styles = theme => ({
    button: {
        position: 'absolute',
        bottom: theme.spacing.root * 2,
        right: theme.spacing.unit * 2,
    },
});

function newComment(parentid) {
    return {
        id: "",
        timestamp: Date.now(),
        body: "",
        author: "",
        parentId: parentid

    }
}

function mapStateToProps(state) {
    return {
        post: state.Posts.post,
        comments: state.Comments.comments
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadPost: (data) => dispatch(LoadPost(data)),
        loadComments: (data) => dispatch(LoadComments(data))
    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Comments))