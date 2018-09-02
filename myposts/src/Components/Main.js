import React from 'react';
import Categories from './Categories';
import Posts from './Posts';

class Main extends React.Component {

    render() {
        return (
            <div>
                <div>
                    <Categories></Categories>
                </div>
                <div>
                    <Posts></Posts>
                </div>
            </div>
        )
    }
}

export default Main