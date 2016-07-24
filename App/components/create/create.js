import React, {Component} from 'react';

import {
  Text,
  View,
  StyleSheet,
  Dimensions
} from 'react-native';


// --- load other components --- //
const Button = require('../button');
const NuInput = require('../fullTextInput');

// --- load helper functions --- //
const _h = require('./createHelpers')

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#555',
    color:'#fff',
    fontSize: 18,
    lineHeight: 22,
    padding: 12,
    margin: 12
  },
  topLevel: {
    flex: 1,
  },
  input: {
    marginLeft: width * 0.2,
    marginRight: width * 0.2
  },
  error: {
    textAlign: 'center',
    fontSize: 32,
    color: '#f00'
  }
});

class create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appUsername: '',
      appPassword: '',
      appConfirm: '',
      appUserId: NaN,
      valid: false,
      error: '',
    }
  }

  render() {
    return (
      <View style={styles.topLevel}>
        <View style={{flex: 0.2}} />
        <View style={{flex: 1}}>
          <NuInput
            style={styles.input}
            title={'username'}
            callback={(text) => _h.parentSetState('appUsername', text, this)} />
          <NuInput
            title={'password'}
            pw={true}
            callback={(text) => _h.parentSetState('appPassword', text, this)} />
          <NuInput
            title={'confirm'}
            pw={true}
            callback={(text) => _h.parentSetState('appConfirm', text, this)} />
          <Button
            caption={'create'}
            callback={() => _h.createUser(this.state.appUsername, this.state.appPassword, this.state.appConfirm, this)} />
          <Text style={styles.error}> {this.state.error} </Text>
        </View>
      </View>
    );
  }
};

module.exports = create;
