import React, {Component} from 'react';

import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  Dimensions
} from 'react-native';

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  gameContainer: {
    padding: 24,
    flex: 0.95,
  },
  gameId: {
    fontSize: 24,
    lineHeight: 32,
  },
  players: {
    flexDirection: 'row',
    padding: 12,
  },
  player: {
    padding: 6,
  }
})
class gameListItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const game = this.props.game;
    const index = this.props.index;
    const callback = this.props.callback;
    const startGame = this.props.startGame;
    const userId = this.props.userId;
    const colors = {
      0: '#2196F3',
      1: '#4CAF50',
      2: '#F44336',
      3: '#FFEB3B',
    }

    let players;

    if (Array.isArray(game.players)) {
      players = game.players.map((person, index) => {
        return <Text key={index} style={styles.player}>{person}</Text>
      });
    } else {
      players = <Text> this game has {game.players} player(s) </Text>
    }

    return (
      <TouchableHighlight style={styles.container} onPress={() => callback(game.gameId)}>
        <View>
          <View style={{flex:0.05}} />
          <View style={[styles.gameContainer, {backgroundColor: colors[index % 4]}]}>
            <Text style={styles.gameId}>game ID: {game.gameId || 'n/a'}</Text>
            <View style={styles.players}>{players}</View>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
};

module.exports = gameListItem;
