import {Alert, Dimensions, Platform} from 'react-native';

class AppUtils {
  static isIOS() {
    return (Platform.OS = 'ios');
  }

  static isAndroid() {
    return (Platform.OS = 'android');
  }

  static getScreenWidth() {
    return Dimensions.get('window').width;
  }

  static getScreenHeight() {
    return Dimensions.get('window').height;
  }

  static isNull(obj) {
    return obj === null || typeof obj === 'undefined';
  }

  //** CHECK EMPTY STRING */
  static isEmpty(str) {
    return !str || str.length === 0;
  }

  //** CHECK EMPTY ARRAY */
  static isEmptyArray(array) {
    return array === undefined || array.length === 0;
  }
}

export default AppUtils;
