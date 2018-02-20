import React, { Component } from 'react';
import { Preloader } from 'react-materialize';
import '../assets/LoadingScreen.css';

class LoadingScreen extends Component {
    render() {
        return (
            <div className= { `loading-screen ${this.props.active ? 'active' : ''}` }>
                <Preloader
                    color='green'
                    size='medium'
                />
            </div>
        );
    }
}

export default LoadingScreen;