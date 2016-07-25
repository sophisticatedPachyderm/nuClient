import React, {Component} from 'react';

import {
  Text,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';

const {height, width} = Dimensions.get('window');

// get style sheet from external
const styles = StyleSheet.create({
  oppView: {
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 6,
    padding: 12,
    width: width * 0.15,
  },
  oppText: {
    fontSize:24,
    color:'#fff',
    textAlign: 'center',
  },
  top: {
    position: 'absolute',
    top: 22,
    left: width * 0.425,
    justifyContent: 'center',
    zIndex: 100,
  },
  left: {
    position: 'absolute',
    justifyContent: 'center',
    left: 0,
    zIndex: 100,
  },
  right: {
    position: 'absolute',
    justifyContent: 'center',
    right: 0,
    zIndex: 100,
  },
  currentPlayer: {
    backgroundColor: '#000',
    color:'#fff',
  }
});

class opponentView extends Component {
  render() {
    if (this.props.player) {
      console.log('oppview', this.props.player.hand);
      let hand = this.props.player.hand;
      return (
         <View style={[styles[this.props.loc], styles.oppView]}>
          <Text style={styles.oppText}>{hand.length}</Text>
         </View>
     );
    } else {
      return <View></View>;
    }
  }
};

module.exports = opponentView;
