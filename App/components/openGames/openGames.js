import React, {Component} from 'react';

import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';

const {height, width} = Dimensions.get('window');

// --- load other components --- //
const Button = require('../button');
const GameListItem = require('./gameListItem');

const _h = require('./openGamesHelpers');

//
// From props, you have access to:
//  - username -> this.props.appUsername
//  - userId -> this.props.appUserId
//  - openGames -> this.props.openGames
//

const styles = StyleSheet.create({

});

class openGames extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openGames: [],
    }
  }

  render() {
    let games = this.props.openGames.map((game, index) => {
      return <GameListItem
                key={index}
                index={index}
                game={game}
                userId={this.props.appUserId}
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
};

module.exports = openGames;
