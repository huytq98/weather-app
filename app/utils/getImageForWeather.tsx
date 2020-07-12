/* eslint-disable global-require */

const images = {
  Clear: require('../screens/assets/clear.png'),
  Hail: require('../screens/assets/hail.png'),
  'Heavy Cloud': require('../screens/assets/heavy-cloud.png'),
  'Light Cloud': require('../screens/assets/light-cloud.png'),
  'Heavy Rain': require('../screens/assets/heavy-rain.png'),
  'Light Rain': require('../screens/assets/light-rain.png'),
  Showers: require('../screens/assets/showers.png'),
  Sleet: require('../screens/assets/sleet.png'),
  Snow: require('../screens/assets/snow.png'),
  Thunder: require('../screens/assets/thunder.png')
};

export default weather => images[weather]
