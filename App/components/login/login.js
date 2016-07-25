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
const _h = require('./loginHelpers')

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
    color: '#f00',
  }
});

class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appUsername: '',
      appPassword: '',
      appUserId: NaN,
      valid: false,
      error: '',
    }
  }

  componentDidUpdate() {
    if (this.state.error !== '') {
      setTimeout(() => this.setState({error: ''}), 5000);
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
          <Button
            caption={'submit'}
            callback={() => {
              if(this.state.appUsername !== '' && this.state.appPassword !== '') {
                _h.sendAuthCheck(this.state.appUsername, this.state.appPassword, this)
              } else {
                this.setState({error: 'Cannot submit empty username or password'});
              }
            }} />

          <Button
            caption={'create'}
            callback={() => _h.openCreateScreen(this)} />
          <Text style={styles.error}> {this.state.error} </Text>
        </View>
      </View>
    );
  }
};

module.exports = login;
