import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
} from 'react-native';

const Login = require('./App/components/login/login');

class nuClient extends Component {
  render() {
    return (
      <NavigatorIOS
        style={{flex: 1}}
        initialRoute={{
          title: 'Login',
          component: Login,
      }} />
    );
  }
}


AppRegistry.registerComponent('nuClient', () => nuClient);
