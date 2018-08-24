import React, { Component } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { List, ListItem, AppBar } from '@material-ui/core';
import Category from './Category';
import { connect } from 'react-redux'
import { LoadCategories } from '../Actions';

const flexContainer = {
    display: 'flex',
    flexDirection: 'row',
    padding: 0,
};

class Categories extends Component {

    componentDidMount(){
        this.props.loadCategories();
    }

    render() {

        const { categories } = this.props

        return (
            <div>
                <div>
                    <AppBar position="static" color="default">
                        <Toolbar>
                            <Typography variant="title" color="inherit">
                                Categories
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </div>
                <div>
                <List style={flexContainer}>
                        {categories.map((category) => (
                            <ListItem key={category.name}>
                                <Category category={category}></Category>
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
        categories : state.Category
    }
}

function mapDispatchToProps(dispatch){
    return{
        loadCategories: () => dispatch(LoadCategories())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);