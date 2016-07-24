import React, {Component} from 'react';

import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image
} from 'react-native';

const _h = require('./gameHelpers');

const {height, width} = Dimensions.get('window');

// get style sheet from external
const styles = StyleSheet.create({
  oppView: {
    padding: 12,
    width: width * 0.15,
  },
  oppText: {
    fontSize:24,
    color:'#fff',
    textAlign: 'center',
  },
  direction: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    zIndex: 100,
  },
  currentPlayer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: 100,
  },
  image: {
    height: 60,
    width: 60,
  }
});

class opponentView extends Component {
  render() {
    let procData = _h.chooseImage(this.props.data);
    return (
    <View style={[styles[this.props.loc], styles.oppView]}>
      <Image source={procData} style={styles.image} />
    </View>
     );
  }
};

module.exports = opponentView;
