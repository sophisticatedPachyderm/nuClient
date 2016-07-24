import React, {Component} from 'react';

import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Dimensions
} from 'react-native';

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    color: '#333',
    marginLeft: width * 0.15,
  },
  inputField: {
    height: height * 0.1,
    width: width * 0.66,
    padding: 6,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 6,
    marginLeft: width * 0.15,
    marginRight: width * 0.15,
  },
});

const fullLogin = ({title, callback, pw}) => {
  pw = pw || false;
  return (
    <View>
      <Text style={styles.title}> { title } </Text>
      <TextInput
        autoCapitalize={'none'}
        secureTextEntry={pw}
        style={styles.inputField}
        onChangeText={ (text) => {
          callback(text);
        }}/>
    </View>
  );
};

module.exports = fullLogin;
