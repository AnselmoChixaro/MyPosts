import React from 'react';
import TopBar from './Components/TopBar';
import Main from './Components/Main';
import { Route } from 'react-router-dom'
import Posts from './Components/Posts'
import EditPost from './Components/EditPost'

class App extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <TopBar />
                </div>
                <div>
                    <Route exact path="/" component={()=> <Main></Main>} />
                    <Route exact path="/category/:categoryname" component={Posts}/>
                    <Route exact path="/post/edit/:postid" component={EditPost}/>
                </div>
            </div>
        )
    }
}

export default App