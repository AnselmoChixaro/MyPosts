import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp'
import ArrowDropDown from '@material-ui/icons/ArrowDropDown'
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { PutComment, VoteComment, AddComment, DeleteComment } from '../Actions';
import connect from 'react-redux/lib/connect/connect';

class Comment extends React.Component {

    state = {
        ...this.props.comment,
        editing: false,
        adding: false
    }

    componentDidMount() {
        if (!this.state.id) {
            const uuid = require('uuid/v4')
            this.setState((prevState) => ({
                id: uuid(),
                editing: !prevState.adding,
                adding: !prevState.adding
            }))
        }

    }

    handleEdit = event => {

        if (this.state.adding) {
            this.props.addComment(this.state)
            this.props.handleAddComment(this.state)
        } else {
            if (this.state.editing) {
                this.props.editComment(this.state);
            }
        }

        this.setState((prevState) => ({
            editing: !prevState.editing
        }))
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    }

    handleDelete = () => {
        this.props.deleteComment(this.state)
        this.props.handleDeleteComment(this.state)
    }

    handleVote = param => event => {
        const voteData = {
            id: this.state.id,
            voteChoice: param
        }

        this.props.voteComment(voteData);

        if (voteData.voteChoice === "upVote")
            this.setState((prevState) => ({
                voteScore: prevState.voteScore + 1
            }))
        else
            this.setState((prevState) => ({
                voteScore: prevState.voteScore - 1
            }))
    }

    render() {

        const { classes } = this.props
        const { editing, adding } = this.state
        const date = new Date(this.state.timestamp)
        const displayedDate = "Commented on:" + ((date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear());

        return (
            <div>
                <Card className={classes.card}>
                    <CardContent>
                        <div>
                            {
                                adding ?
                                    <TextField
                                        value={this.state.author}
                                        fullWidth
                                        placeholder="Enter your name here"
                                        onChange={this.handleChange('author')}
                                    />
                                    :
                                    <Typography color="textSecondary" className={classes.author}>
                                        Author: {this.state.author}
                                    </Typography>
                            }
                        </div>
                        <div>
                            {
                                editing ?
                                    <TextField
                                        value={this.state.body}
                                        multiline={true}
                                        fullWidth
                                        placeholder="Enter your comment here"
                                        onChange={this.handleChange('body')}
                                    />
                                    :
                                    <Typography gutterBottom variant="headline" component="h2">
                                        {this.state.body}
                                    </Typography>
                            }
                        </div>
                    </CardContent>
                    <CardActions>
                        <Button size="small" color="primary" onClick={this.handleEdit}>
                            {
                                adding ? "Post" : "Edit"
                            }
                        </Button>
                        <IconButton onClick={this.handleVote("upVote")} disabled={editing} >
                            <ArrowDropUp></ArrowDropUp>
                        </IconButton>
                        <IconButton onClick={this.handleVote("downVote")} disabled={editing}>
                            <ArrowDropDown></ArrowDropDown>
                        </IconButton>
                        <Typography component="p">{this.state.voteScore}</Typography>
                        <IconButton onClick={this.handleDelete} disabled={editing}>
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
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    button: {
        position: 'absolute',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
    },
    typography: {
        marginLeft: 'auto'
    },
    author: {
        marginBottom: 16,
        fontSize: 14,
    }
});

function mapDispatchToProps(dispatch) {
    return {
        addComment: (data) => dispatch(AddComment(data)),
        editComment: (data) => dispatch(PutComment(data)),
        deleteComment: (data) => dispatch(DeleteComment(data)),
        voteComment: (data) => dispatch(VoteComment(data))
    }
}

export default withStyles(styles)(connect(null, mapDispatchToProps)(Comment))