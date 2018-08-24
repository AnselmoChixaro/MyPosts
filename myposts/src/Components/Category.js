import React, { Component } from 'react';
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from 'react-router-dom'
import { LoadPostsByCategory } from "../Actions";
import { connect } from 'react-redux'

const styles = {
    card: {
        minWidth: 275
    },
    bullet: {
        display: "inline-block",
        margin: "2 2px",
        transform: "scale(0.8)"
    },
    title: {
        marginBottom: 0,
        fontSize: 36
    },
    pos: {
        marginTop: 4,
        marginBottom: 0
    }
};

class Category extends Component {
    render() {
        const postByCategoryLink = {
            pathname: `/category/${this.props.category.name}`,
            category: this.props.category.name
        };

        return (
            <div>
                <Card>
                    <CardContent>
                        <Typography variant="headline" component="h2" style={styles.title}>
                            {this.props.category.name}
                        </Typography>
                    </CardContent>
                    <CardActions style={styles.pos}>
                        <Button size="small" >
                            <Link to={postByCategoryLink} >See more...</Link>
                        </Button>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        post: state.post
    }
}

function mapDispatchToProps (dispatch){
    return {
        selectCategory: (data) => dispatch(LoadPostsByCategory(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);
