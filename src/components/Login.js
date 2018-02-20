import React, { Component } from 'react';
import { Input, Button, Icon } from 'react-materialize';
import { ToastContainer, toast } from 'react-toastify';
import { login } from '../actions/LoginActions';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            awsKey: '',
            awsSecret: ''
        };
    }

    changeUsername(e) {
        this.setState({ username: e.target.value });
    }

    changeAwsKey(e) {
        this.setState({ awsKey: e.target.value });
    }

    changeAwsSecret(e) {
        this.setState({ awsSecret: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { username, awsKey, awsSecret } = this.state;
        if (
            username.replace(/\s/g,'') === '' ||
            awsKey.replace(/\s/g,'') === '' ||
            awsSecret.replace(/\s/g,'') === ''
        ) {
            toast.error('All fields are required!', {
                position: toast.POSITION.TOP_CENTER
            });
            return;
        }
        this.props.dispatch(login(username, awsKey, awsSecret));
    }

    render() {
        return (
            <div className='app-body-card login-card'>
                <ToastContainer />
                <form onSubmit={ this.handleSubmit.bind(this) }>
                    <h1>Login</h1>
                    <Input
                        s={ 12 }
                        label='Username' 
                        value={ this.state.username }
                        onChange={ this.changeUsername.bind(this) }
                    />
                    <Input
                        s={ 12 }
                        label='AWS Access Key'
                        value={ this.state.awsKey }
                        onChange={ this.changeAwsKey.bind(this) }
                    />
                    <Input
                        s={ 12 }
                        label='AWS Secret Access Key'
                        value={ this.state.awsSecret }
                        onChange={ this.changeAwsSecret.bind(this) }
                    />
                    <Button waves='light'>Login<Icon left>input</Icon></Button>
                </form>
            </div>
        );
    }
}

export default Login;