import { connect } from 'react-redux';

import ShowPitch from './showPitch';
import changeThePitch from './action-creators';


const mapStateToProps = state => {
  return {
    notes: state.notes,
    context: state.context,
    stave: state.stave
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getNewPitch: () => {
      dispatch(changeThePitch);
    }
  };
};

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(ShowPitch);

export default HomeContainer;
