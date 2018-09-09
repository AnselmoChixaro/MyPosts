import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { withRouter } from 'react-router'

function TopBar(props) {
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton color="inherit" aria-label="Menu" onClick={() => props.history.goBack()} >
                        <ArrowBack />
                    </IconButton>
                    <Typography variant="title" color="inherit">
                        My Posts
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default withRouter(TopBar)