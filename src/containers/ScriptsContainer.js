import { connect } from 'react-redux';
import Scripts from '../components/Scripts';

const mapStateToProps = (state, { dispatch }) => {
  return {
    dispatch,
    ...state
  };
}

export default connect(mapStateToProps)(Scripts);