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
    height: height * 0.2,
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
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 24
  },
  warning: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 12,
  }
})

const warning = ({title, warning}) => (
  <View style={styles.top}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.warning}>{warning || ''}</Text>
  </View>
);

module.exports = warning;
