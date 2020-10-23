import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
} from 'react-native';
import CoursesInProgress from '../../components/coursesInProgress';
import FeaturedMusic from '../../components/featuredMusic';
import Sleep from '../../components/sleep';
import Profile from '../../containers/profile';
import {styles} from './styles';
import Images from '../../config/images';

class ProfileSettingsView extends Component {
  constructor(props) {
    super(props);
  }
  renderInfoLine(label, value) {
    return (
      <View style={styles.line}>
        <Text style={styles.infoText}>{label}</Text>
        <Text style={styles.infoText}>{value}</Text>
      </View>
    );
  }
  renderButton(label) {
    return (
      <TouchableOpacity style={styles.line}>
        <Text style={styles.infoText}>{label}</Text>
        <Image source={Images.icons.arrow_right} style={styles.arrowIcon} />
      </TouchableOpacity>
    );
  }
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.topButtons}>
          <TouchableOpacity
            style={styles.btnClose}
            onPress={() => this.props.closeModal()}>
            {/* <Image
              source={Images.icons.close_purple}
              style={styles.closeIcon}
            /> */}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnSettings}
            onPress={() => this.props.openModal(Profile, true)}>
            <Image
              source={Images.icons.settings_pressed}
              style={styles.closeIcon}
            />
          </TouchableOpacity>
        </View>

        <ImageBackground
          style={styles.avatar}
          source={require('../../assets/images/profile_right.png')}
        />
        <TouchableOpacity>
          <Text style={styles.editPhoto}>Edit Photo</Text>
        </TouchableOpacity>
        <ImageBackground
          source={require('../../assets/images/arc-nav.png')}
          style={styles.roundImage}
        />
        <View style={styles.whiteBottom}>
          <Text style={styles.sectionHeader}>profile</Text>
          {this.renderInfoLine('Username', 'missjillscott')}
          {this.renderInfoLine('Full Name', 'Jill Scott')}
          {this.renderInfoLine('Email', 'jill@quantasy.com')}

          <Text style={styles.sectionHeader}>account</Text>
          {this.renderButton('Change Password')}
          {this.renderButton('Preferences')}
          {this.renderButton('Help & Support')}
          {this.renderButton('Sign Out')}
        </View>
      </ScrollView>
    );
  }
}

export default ProfileSettingsView;
