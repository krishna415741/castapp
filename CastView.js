import PropTypes from 'prop-types';
import { requireNativeComponent, ViewPropTypes } from 'react-native';
var viewProps = {
  name: 'CastView',
  propTypes: {
    url: PropTypes.string,
  }
}
module.exports = requireNativeComponent('CastView', viewProps);