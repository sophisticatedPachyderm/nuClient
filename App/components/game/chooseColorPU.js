import React, {Component} from 'react';

import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  Dimensions,
} from 'react-native';

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  top: {
    height: height * 0.66,
    width: width * 0.66,
    backgroundColor: '#333',
    opacity: 0.7,
    position: 'absolute',
    top: height * 0.2,
    left: width * (0.33/2),
    zIndex: 100,
    padding:12,
    borderRadius: 6,
    shadowColor: '#111',
    shadowOffset: {
      height: 3,
      width: 3
    },
    shadowOpacity: 0.7,
    shadowRadius: 2,
  },
  title: {
    height: 32,
    fontSize: 24,
  },
  box: {
    margin: 12,
    flexDirection: 'column',
    height: 48,
    width: 200,
    flex: 1,
  },
  red: {
    backgroundColor: '#F44336',
  },
  green: {
    backgroundColor: '#4CAF50',
  },
  blue: {
    backgroundColor: '#2196F3',
  },
  yellow: {
    backgroundColor: '#FFEB3B',
  }
})

const colorPopUp = ({chooseColor}) => (
  <View style={styles.top}>
    <Text style={styles.title}> new color: </Text>
    <TouchableHighlight onPress={() => {
      console.log('you chose red');
      chooseColor('r');
    }}>
      <View style={[styles.box, styles.red]} />
    </TouchableHighlight>
    <TouchableHighlight onPress={() => {
      console.log('you chose green');
      chooseColor('g');
    }}>
      <View style={[styles.box, styles.green]} />
    </TouchableHighlight>
    <TouchableHighlight onPress={() => {
      console.log('you chose blue');
      chooseColor('b');
    }}>
      <View style={[styles.box, styles.blue]} />
    </TouchableHighlight>
    <TouchableHighlight onPress={() => {
      console.log('you chose yellow');
      chooseColor('y');
    }}>
      <View style={[styles.box, styles.yellow]} />
    </TouchableHighlight>
  </View>
);

module.exports = colorPopUp;
