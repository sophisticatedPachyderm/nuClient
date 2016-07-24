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
const GameListItem = require('./gameListItem');

const _h = require('./openGamesHelpers');

//
// From props, you have access to:
//  - username -> this.props.appUsername
//  - userId -> this.props.appUserId
//  - openGames -> this.props.openGames
//

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize:  32,
  }
});

class joinableGames extends Component {
  constructor(props) {
    super(props);
    this.state = {
      joinableGames: this.props.joinableGames,
    }
  }


  render() {
    console.log(this.props)
    const joinableGames = this.state.joinableGames;
    let games;
    if (joinableGames.length === 0) {
      console.log('no available games');
    } else {
      games = joinableGames.map((game, index) => {
        console.log(game)
        return <GameListItem
          key={index}
          index={index}
          game={game}
          callback={() => console.log('yay')}/>
      });
    }
    return (
      <View style={styles.container}>
        <ScrollView style={{flex:1}}>
          {games}
        </ScrollView>
      </View>
    )
  }
};

module.exports = joinableGames;
