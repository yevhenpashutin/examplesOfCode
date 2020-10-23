import {StyleSheet} from 'react-native';
import globalStyles from '../../config/globalStyles';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 30,
  },
  topButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: globalStyles.screen.width,
    paddingHorizontal: 20,
  },
  btnClose: {
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  btnSettings: {
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  closeIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  avatar: {
    height: 94,
    width: 94,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editPhoto: {
    fontFamily: globalStyles.fonts.medium,
    fontSize: 14,
    color: globalStyles.color.purple,
    marginTop: 15,
  },
  roundImage: {
    width: globalStyles.screen.width,
    marginTop: 20,
    height: 55 + 20,
    resizeMode: 'stretch',
    marginBottom: -50,
  },
  whiteBottom: {
    backgroundColor: '#f8f8f8',
    width: globalStyles.screen.width,
  },

  sectionHeader: {
    marginLeft: 20,
    marginBottom: 15,
    marginTop: 30,
    color: globalStyles.color.purple,
    fontFamily: globalStyles.fonts.regular,
    fontSize: 24,
  },
  line: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 50,
    borderBottomColor: '#d8d8d8',
    borderBottomWidth: 1,
  },
  infoText: {
    fontFamily: globalStyles.fonts.medium,
    fontSize: 14,
    color: globalStyles.color.purple,
  },
  arrowIcon: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
  },
});
