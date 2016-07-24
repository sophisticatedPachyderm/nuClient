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
    height: height * 0.33,
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
  option: {
    textAlign: 'center',
    margin: 12,
    padding: 6,
    borderRadius: 6,
    fontWeight: 'bold'

  },
  title: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 24
  }
})

const popup = ({title, actionA, actionB, textA, textB}) => (
  <View style={styles.top}>
    <Text style={styles.title}>{title}</Text>
    <TouchableHighlight onPress={() => actionA()}>
      <Text style={[styles.option, {backgroundColor: '#9C27B0', color: '#fff'}]}> {textA} </Text>
    </TouchableHighlight>
    <TouchableHighlight onPress={() => actionB()}>
    <Text style={[styles.option, {backgroundColor: '#FF5722'}]}> {textB} </Text>
    </TouchableHighlight>
  </View>
);

module.exports = popup;
