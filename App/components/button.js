import React, {Component} from 'react';

import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  Dimensions
} from 'react-native';

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#555',
    color:'#fff',
    fontSize: 18,
    lineHeight: 22,
    padding: 12,
    margin: 12,
    width: width * 0.66,
    marginLeft: width * 0.15,
  },
});

const button = ({caption, callback}) => {
  return (
    <View>
      <TouchableHighlight
        onPress={ () => {
          callback();
        }}>
        <Text style={styles.button}> {caption} </Text>
      </TouchableHighlight>
    </View>
  );
};

module.exports = button;
