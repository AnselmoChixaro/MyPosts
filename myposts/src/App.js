import React from 'react';
import TopBar from './Components/TopBar';
import Main from './Components/Main';
import { Switch, Route } from 'react-router-dom'
import Posts from './Components/Posts'
import EditPost from './Components/EditPost'
import Comments from './Components/Comments'

class App extends React.Component {    
    render() {

        const NoPost = ({ location }) => (
            <div>
              <h3>  Post not found or this post is already deleted!:(</h3>
            </div>
        )

        return (
            <div>
                <div>
                    <TopBar />
                </div>
                <div>
                 <Switch>   
                    <Route exact path="/404/NoPost" component={NoPost} />
                    <Route exact path="/" component={()=> <Main></Main>} />
                    <Route exact path="/:categoryname" component={Posts}/>
                    <Route exact path="/post/edit/:postid" component={EditPost}/>
                    <Route exact path="/post/add/" component={EditPost}/>
                    <Route exact path="/:category/:postid" component={Comments}/>
                  </Switch>
                </div>
            </div>
        )
    }
}

export default App