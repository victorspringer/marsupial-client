import { connect } from 'react-redux';
import EditScript from '../components/EditScript';

const mapStateToProps = (state, { id, version, dispatch }) => {
  return {
    id,
    version,
    dispatch,
    ...state
  };
}

export default connect(mapStateToProps)(EditScript);