import React, { Component } from 'react';
import { Navbar, NavItem, Icon } from 'react-materialize';
import LoadingScreen from './LoadingScreen';
import NotFound from './NotFound';
import LoginContainer from '../containers/LoginContainer';
import ScriptsContainer from '../containers/ScriptsContainer';
import ScriptContainer from '../containers/ScriptContainer';
import EditScriptContainer from '../containers/EditScriptContainer';
import { logout } from '../actions/LoginActions';
import logo from '../assets/logo.svg';
import '../assets/App.css';

const loggedIn = () => {
  if (
    !localStorage.getItem('username') ||
    !localStorage.getItem('awsKey') ||
    !localStorage.getItem('awsSecret')
  ) return false;
  return true;
}

const Page = ({ pathname }) => {
  if (!loggedIn()) {
    return <LoginContainer />;
  }

  if (!pathname) return <NotFound />;

  if (pathname.substr(pathname.length - 1) === '/') {
    pathname = pathname.slice(0, -1);
  }

  const path = pathname.split('/');
  if (path.length < 2) return <ScriptsContainer />;

  switch(path[1]) {
    case 'scripts':
      return <ScriptsContainer />;
    case 'add-script':
      return <EditScriptContainer version={ 1 } />;
    case 'script':
      if (path.length !== 3) return <NotFound />;
      return <ScriptContainer id={ path[2] } />;
    case 'script-version':
      if (path.length !== 4) return <NotFound />;
      return <EditScriptContainer id={ path[2] } version={ path[3] } />;
    default:
      return <NotFound />;
  }
}

class App extends Component {
  logout(e) {
    e.preventDefault();
    this.props.dispatch(logout());
  }

  render() {
    const { loadingScreenStatus } = this.props;
    const Brand = ({ name }) => {
      return (
        <div>
          <img src={ logo } alt='logo' />
          <span className='brand-name'>{ name }</span>
        </div>
      );
    };

    return (
      <div className='app'>
        <header className='app-header'>
          <Navbar brand={ <Brand name='marsupial' /> } right>
            {
              loggedIn() &&
              <NavItem onClick={ this.logout.bind(this) }>
                Logout<Icon className='logout' left>input</Icon>
              </NavItem>
            }
          </Navbar>
          <LoadingScreen active={ loadingScreenStatus.active } />
        </header>
        <div className='app-body'>
          <Page className='content' pathname={ this.props.pathname } />
        </div>
      </div>
    );
  }
}

export default App;
