import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp'
import ArrowDropDown from '@material-ui/icons/ArrowDropDown'
import { IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom'

const cardStyle = {
    display: 'block',
    width: 800,
    transitionDuration: '0.3s'
}

class Post extends Component {
    render() {

        const editPostLink = {
            pathname: `/post/edit/${this.props.post.id}`,
            postid: this.props.post.id
        };

        return (
            <div>
                <Card style={cardStyle}>
                    <CardContent>
                        <Typography gutterBottom variant="headline" component="h2">
                            {this.props.post.title}
                        </Typography>
                        <Typography component="p">
                            {this.props.post.body}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" color="primary">
                            <Link to={editPostLink}>Edit</Link>
                        </Button>
                        <Button size="small" color="primary">
                            Comment
                        </Button>
                        <IconButton>
                            <ArrowDropUp></ArrowDropUp>
                        </IconButton>
                        <IconButton>
                            <ArrowDropDown></ArrowDropDown>
                        </IconButton>
                        <Typography component="p">{this.props.post.voteScore}</Typography>
                    </CardActions>
                </Card>
            </div>
        )
    }
}


export default Post