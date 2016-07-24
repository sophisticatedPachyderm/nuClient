import React, {Component} from 'react';

import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
} from 'react-native';

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    flex: 1,
    width: width * 0.3,
    justifyContent: 'center',
    marginLeft: width * 0.015,
    marginRight: width * 0.015,
    marginBottom: 1,
    borderRadius: 5,
  },
  val: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 32
  }
});

class card extends Component {
  render() {
    const {index, card, action, colors} = this.props;
    const color = colors[card[1]];
    const value = card[0];

    return (
       <TouchableHighlight style={[styles.card, {backgroundColor: color}]} onPress={() => action(this.props.card, index)}>
        <Text style={styles.val}>
          {value}
        </Text>
      </TouchableHighlight>
    );
  }
};

module.exports = card;
