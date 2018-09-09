import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp'
import ArrowDropDown from '@material-ui/icons/ArrowDropDown'
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton, Divider } from '@material-ui/core';
import { Link } from 'react-router-relative-link'
import { Vote, DeletePost } from '../Actions';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

class Post extends Component {

    state = {
        ...this.props.post
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.post !== nextProps.post) {
            this.setState(nextProps.post)
        }
    }

    handleVote = param => event => {
        const voteData = {
            id: this.state.id,
            voteChoice: param
        }

        this.props.vote(voteData);

        if (voteData.voteChoice === "upVote")
            this.setState((prevState) => ({
                voteScore: prevState.voteScore + 1
            }))
        else
            this.setState((prevState) => ({
                voteScore: prevState.voteScore - 1
            }))
    }

    handleDelete = event => {
        this.props.delete(this.state);
        this.setState(() => ({
            deleted: true
        }))
        this.props.handlePostDeleted(this.state);
    }

    handleClickPost = param => event => {
        console.log("Card Clicked")
        this.props.history.push(param, this.state)
    }

    render() {
        const editPostLink = {
            pathname: `/post/edit/${this.state.id}`
        };

        const commentPostLink = {
            pathname: `/${this.state.category}/${this.state.id}`
        }

        const hand = { cursor: "pointer" };
        const { classes, disabled, show } = this.props
        const date = new Date(this.state.timestamp)
        const displayedDate = "Created on:" + ((date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear());
        const commentCount = this.props.commentCount ? this.props.commentCount : this.state.commentCount;
        const commentLabel = this.state.commentCount === 1 ? "Comment" : "Comments";

        return (
            <div>
                <Card className={classes.card}>
                    <CardContent onClick={this.handleClickPost(commentPostLink)} style={hand}>
                        <Typography color="textSecondary" className={classes.author}>
                            Author: {this.state.author}
                        </Typography>
                        <Typography gutterBottom variant="headline" component="h2">
                            {this.state.title}
                        </Typography>
                        <Divider />
                        {
                            show ? <Typography paragraph>
                                {this.state.body}
                            </Typography> : null
                        }
                    </CardContent>
                    <CardActions>
                        <Button size="small" color="primary">
                            <Link to={editPostLink}>Edit</Link>
                        </Button>
                        <Button size="small" color="primary" disabled={disabled}>
                            <Link to={commentPostLink}>Comment</Link>
                        </Button>
                        <Typography component="p">
                            {commentCount} {commentLabel}
                        </Typography>
                        <IconButton onClick={this.handleVote("upVote")}>
                            <ArrowDropUp></ArrowDropUp>
                        </IconButton>
                        <IconButton onClick={this.handleVote("downVote")}>
                            <ArrowDropDown></ArrowDropDown>
                        </IconButton>
                        <Typography component="p">{this.state.voteScore}</Typography>
                        <IconButton onClick={this.handleDelete} disabled={disabled}>
                            <DeleteIcon></DeleteIcon>
                        </IconButton>
                        <Typography className={classes.typography} component="p">
                            {displayedDate}
                        </Typography>
                    </CardActions>
                </Card>
            </div>
        )
    }
}

const styles = theme => ({
    card: {
        width: 1000,
        maxWidth: 1200,
    },
    typography: {
        marginLeft: 'auto'
    },
    bottomTypography: {
        position: 'static'
    },
    author: {
        marginBottom: 16,
        fontSize: 14,
    }
});

function mapDispatchToProps(dispatch) {
    return {
        vote: (data) => dispatch(Vote(data)),
        delete: (data) => dispatch(DeletePost(data))
    }
}

export default withStyles(styles)(withRouter(connect(null, mapDispatchToProps)(Post)))