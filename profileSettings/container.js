import React, {Component} from 'react';
import ProfileSettingsView from './view';
import {connect} from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../reducers/reducerMap';

class ProfileSettingsContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <ProfileSettingsView {...this.props} />;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileSettingsContainer);
