import React, { Component } from 'react';
import logo from '../assets/logo.svg';
import '../assets/NotFound.css';

class NotFound extends Component {
    render() {
        return (
            <div className='app-body-card'>
                <h1 className='not-found-title'>Oops... Page not found!</h1>
                <img className='not-found-image' src={ logo } alt='logo' />
            </div>
        );
    }
}

export default NotFound;