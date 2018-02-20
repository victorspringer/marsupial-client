import { connect } from 'react-redux';
import Login from '../components/Login';

const mapStateToProps = (state, { dispatch }) => {
  return {
    dispatch,
    ...state
  };
}

export default connect(mapStateToProps)(Login);