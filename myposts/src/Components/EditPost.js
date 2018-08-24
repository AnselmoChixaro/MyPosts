import React, { Component } from 'react'
import { LoadPost, LoadCategories } from '../Actions';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Select, FormControl, InputLabel } from '@material-ui/core';

class EditPost extends Component {

    state = {
        id: '',
        title: '',
        author: '',
        body: '',
        category: '',
        commentCount: 0,
        deleted: false,
        voteScore: 0,
        categories:[]
    }

    componentDidMount() {
        this.props.loadPost(this.props.match.params.postid)
        this.props.loadCategories()
    };

    componentWillReceiveProps(nextProp) {
        if (this.props.post !== nextProp.post){
            this.setState(nextProp.post)
        }

        if( this.props.categories !== nextProp.categories){
            this.setState({categories: nextProp.categories})
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    }

    render() {
        const { classes } = this.props;
        console.log(this.state)
        return (
            <div>
                <form className={classes.container}>
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
                            value={this.state.category}
                            onChange={this.handleChange('category')}
                            className={classes.selectEmpty}
                        >
                            {this.state.categories.map((category) => (
                                <option key={category.name} value={category.name}>{category.name}</option>
                            ))}
                        </Select>
                    </FormControl>
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
        loadCategories: () => dispatch(LoadCategories())
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
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(EditPost))