import React, { Component } from 'react'
import { LoadPost, LoadCategories, PutPost, AddPost } from '../Actions';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames'
import SaveIcon from '@material-ui/icons/Save';
import { Select, FormControl, InputLabel, Paper, Typography, Button } from '@material-ui/core';
import { Redirect } from 'react-router-dom'

class EditPost extends Component {

    state = {
        id: '',
        title: '',
        author: '',
        body: '',
        category: '',
        timestamp: Date.now(),
        commentCount: 0,
        deleted: false,
        voteScore: 0,
        categories: [],
        editing: false,
        redirect: false,
    }

    componentDidMount() {
        if (this.props.match.params.postid) {
            this.props.loadPost(this.props.match.params.postid)
            this.setState({ editing: true })
        }
        else {
            const id = "id";
            const uuid = require('uuid/v4');
            this.setState({
                [id]: uuid()
            });
        }

        this.props.loadCategories()
    };

    componentWillReceiveProps(nextProp) {
        if (this.props.post !== nextProp.post) {
            this.setState(nextProp.post)
            if (!nextProp.post.id){
                this.setState({ redirect: true })
            }
        }

        if (this.props.categories !== nextProp.categories) {
            this.setState({ categories: nextProp.categories })
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    }

    handleEdit = () => {

        if (this.state.editing) {
            this.props.editPost(this.state);
            if (this.props.history)
                this.props.history.goBack()
        } else {
            this.props.addPost(this.state);
            if (this.props.history)
                this.props.history.goBack();
        }
    }

    render() {
        const { classes } = this.props;
        const { editing } = this.state;

        if( this.state.redirect )
            return <Redirect to="/404/NoPost"/>

        return (
            <div>
                <div>
                    <Paper className={classes.root} elevation={1}>
                        {
                            editing ?
                                <Typography variant="headline" component="h3">
                                    Editing Post
                                </Typography> :
                                <Typography variant="headline" component="h3">
                                    Adding Post
                                </Typography>
                        }
                    </Paper>
                </div>
                <form className={classes.container} onSubmit={this.handleEdit}>
                    <TextField
                        id="title"
                        label="Title"
                        placeholder="Input the post Title"
                        className={classes.textField}
                        value={this.state.title}
                        onChange={this.handleChange('title')}
                        margin="normal"
                    />
                    <TextField
                        id="author"
                        label="Author"
                        placeholder="Input your name"
                        className={classes.textField}
                        value={this.state.author}
                        onChange={this.handleChange('author')}
                        margin="normal"
                        disabled={this.state.editing}
                    />
                    <TextField
                        id="body"
                        label="Body"
                        placeholder="Input the post body"
                        multiline
                        rowsMax="5"
                        className={classes.textField}
                        value={this.state.body}
                        onChange={this.handleChange('body')}
                        margin="normal"
                    />
                    <FormControl className={classes.formControl}>
                        <InputLabel shrink>Category</InputLabel>
                        <Select
                            disabled={this.state.editing}
                            value={this.state.category}
                            onChange={this.handleChange('category')}
                            className={classes.selectEmpty}
                        >
                            {this.state.categories.map((category) => (
                                <option key={category.name} value={category.name}>{category.name}</option>
                            ))}
                        </Select>
                    </FormControl>
                    <Button variant="contained" size="small" className={classes.button} onClick={this.handleEdit}>
                        <SaveIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
                        Save
                    </Button>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        post: state.Posts.post,
        categories: state.Category
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadPost: (data) => dispatch(LoadPost(data)),
        loadCategories: () => dispatch(LoadCategories()),
        editPost: (data) => dispatch(PutPost(data)),
        addPost: (data) => dispatch(AddPost(data)),
    }
}

const styles = theme => ({
    container: {
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 600,
    },
    menu: {
        width: 200,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 3,
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
    button: {
        margin: theme.spacing.unit,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 20,
    },
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(EditPost))