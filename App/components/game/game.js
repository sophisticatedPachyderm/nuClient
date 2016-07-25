import React, {Component} from 'react';

import {
  Text,
  View,
  ScrollView,
  Dimensions,
  StyleSheet,
} from 'react-native';

const Card = require('./card');
const PopUp = require('./popup');
const Warning = require('./warning');
const OppView = require('./opponentView');
const GamePlayState = require('./gamePlayState');

const _h = require('./gameHelpers');
const wsInit = require('../../socket/socketInit');

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: width,
  },
  main: {
    flex: 3,
    width: width * 1,
    justifyContent: 'center',
  },
  hand: {
    flex: 1,
    width: width,
    backgroundColor: '#fff'
  },
  label: {
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 72
  },
  optional: {
    justifyContent: 'center',
    margin: width * 0.1,
  }
});

const colorConverter = {
  b: '#2196F3',
  g: '#4CAF50',
  r: '#F44336',
  y: '#FFEB3B',
  1: '#555',
}

class game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      warning: '',
      currentCard: this.props.currentCard,
      currentHand: this.props.userCards,
      playable: false,
      popUpMessage: 'opponent\'s turn',
    };
    console.log(this.props)
    let ws = wsInit(this.props.userId, {
      myTurnResponse: {
        mines: (response) => {
          console.log('My turn, server response:', response.response);
        },
        opponent: (response) => {
          console.log('This shouldn\'t be coming though');
        }
      },

      drawCardResponse: {
        mines: (response) => {
          console.log('My draw, server response:', response.response);
        },
        opponent: (response) => {
          console.log('what happens here?', response.response);
        }
      }
    });
  }

  render() {
    // --- create the cards in a player's hand --- //
    // --- shouldn't have to worry about 0 length, //
    // --- because then the game is over       --- //

    let cardsArray = this.props.userCards.map((card, index) => {
            return <Card
              key={index}
              card={card}
              index={index}
              action={() => _h.chooseCard(card, index, this.state.playable, this)}
              colors={colorConverter} />;
          });


    // --- strip out the players to use for the opponenet views --- //
    const {topPlayer, leftPlayer, rightPlayer} = this.props.assignedPlayers;

    // --- set up the popup to block invalid moves --- //

    let notification;

    if (this.props.myPosition !== this.props.activePlayer) {
      notification = <Warning style={styles.optional}
        title={this.state.popUpMessage}
        warning={this.state.warning} />
    } else {
      this.setState({playable:true});
    }
    console.log(this.props.myPosition);
    console.log(this.props.activePlayer);

    // if (this.state.popUp) {
      // popup will be there
      // if (my turn)
        // chose whether to draw a card or play one that you already have
      // else
        // display message that it's not your turn
    // }

    return (
      <View style={styles.container}>
        <View style={{flex:0.25}} />
        <View style={[styles.main, {backgroundColor: colorConverter[this.state.currentCard[1]]}]}>
          <OppView player={topPlayer} loc={'top'}/>
          <OppView player={leftPlayer} loc={'left'}/>
          <OppView player={rightPlayer} loc={'right'}/>
          <Text style={[styles.label, {color: '#fff'}]}>
            {this.state.currentCard[0]}
          </Text>
          { notification }
        </View>
        <ScrollView style={styles.hand} horizontal={true}>
          {cardsArray}
        </ScrollView>
      </View>
    );
  }
};

module.exports = game;
