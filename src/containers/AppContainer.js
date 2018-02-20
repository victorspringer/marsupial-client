import { connect } from 'react-redux';
import App from '../components/App';

const mapStateToProps = (state, { dispatch, location: { pathname } }) => {
  return {
    dispatch,
    pathname,
    ...state
  };
}

export default connect(mapStateToProps)(App);
