import React, {Component} from 'react';

import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ListView,
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
  error: {
    textAlign: 'center',
    color: '#f00',
    fontWeight: 'bold'
  }
});

class openGames extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      openGames: ds.cloneWithRows(this.props.openGames),
      error: ''
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex:0.1}} />
          <ListView
            style={{flex:0.75}}
            dataSource={this.state.openGames}
            renderRow={(game, index) => <GameListItem
                      index={index}
                      game={game}
                      userId={this.props.appUserId}
                      callback={() => {
                        if (game.players.length > 1) {
                          chooseGame(game.gameId, this);
                        } else {
                          this.setState({error: 'unable to join with only one player'});
                        }
                      }} />}
          />
        <View style={{flex:0.15}}>
          <Button
            caption={'Join another Game'}
            callback={() => _h.openJoinableGamesScreen(this)} />
          <Text style={styles.error}> {this.state.error} </Text>
        </View>
      </View>
    );
  }
};

module.exports = openGames;
