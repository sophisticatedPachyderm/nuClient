


// OR

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,

  Text,
  View,
  ScrollView,

} from 'react-native';

const Login = require('./App/components/login/login');

const Button = require('./App/components/button');
const GameListItem = require('./App/components/openGames/gameListItem');
const data = require('./data.js');
const _h = require('./App/components/openGames/openGamesHelpers');

class nuClient extends Component {
  render() {
    let games = data.map((game, index) => {
      return <GameListItem
                key={index}
                index={index}
                game={game}
                userId={24}
                callback={() => chooseGame(game.gameId, this)} />
    });
    return (
      <View style={{flex: 1}}>
        <View style={{flex:0.1}} />
        <ScrollView style={{flex:0.75}}>
          {games}
        </ScrollView>
        <View style={{flex:0.15}}>
          <Button
            caption={'Join another Game'}
            callback={() => _h.openJoinableGamesScreen()} />
        </View>
      </View>
    );
  }
}


AppRegistry.registerComponent('nuClient', () => nuClient);
