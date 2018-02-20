import { connect } from 'react-redux';
import Script from '../components/Script';

const mapStateToProps = (state, { id, dispatch }) => {
  return {
    id,
    dispatch,
    ...state
  };
}

export default connect(mapStateToProps)(Script);