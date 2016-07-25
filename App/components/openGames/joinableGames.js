import React, {Component} from 'react';

import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  ListView,
} from 'react-native';

const {height, width} = Dimensions.get('window');

// --- load other components --- //
const GameListItem = require('./gameListItem');

const _h = require('./joinGameHelpers');

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
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      joinableGames: ds.cloneWithRows(this.props.joinableGames),
    }
  }


  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex:0.1}} />
          <ListView
            style={{flex:0.75}}
            dataSource={this.state.joinableGames}
            renderRow={(game, index) => <GameListItem
                      index={index}
                      game={game}
                      userId={this.props.parentProps.appUserId}
                      callback={() => _h.joinGame(game.gameId, this)} />}
          />
        <View style={{flex:0.15}}>
        </View>
      </View>
    );
  }
};

module.exports = joinableGames;
