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
      // playable means it is current this player's turn
      playable: false,
      // draw card means you've made the decision to play a card in your hand
      drawCard: false,
      popUpMessage: 'opponent\'s turn',
    };

    if (props.myPosition === props.activePlayer) {
      this.state.playable = true;
    }

    let ws = wsInit(props.parentProps.appUserId, {
      myTurnResponse: {
        mines: (response) => {
          console.log('My turn, server response:', response);
        },
        opponent: (response) => {
          console.log('This shouldn\'t be coming though');
        }
      },

      drawCardResponse: {
        mines: (response) => {
          console.log('My draw, server response:', response);
          // this works to rerender the page on draw of card. Do we want to keep
          let temp = this.state.currentHand;
          temp.push(response.cardDrawn);
          this.setState({currentHand: temp});
        },
        opponent: (response) => {
          console.log('what happens here?', response.response);
        }
      }
    });

    this.state.ws = ws;
  }


  render() {
    // --- create the cards in a player's hand --- //
    // --- shouldn't have to worry about 0 length, //
    // --- because then the game is over       --- //

    let cardsArray = this.state.currentHand.map((card, index) => {
            return <Card
              key={index}
              card={card}
              index={index}
              action={() => _h.chooseCard(card, index, this)}
              colors={colorConverter} />;
          });

    // --- strip out the players to use for the opponenet views --- //
    const {topPlayer, leftPlayer, rightPlayer} = this.props.assignedPlayers;

    // --- set up the popup to block invalid moves --- //
    let notification;

    if (!this.state.playable) {
      notification = <Warning style={styles.optional}
        title={this.state.popUpMessage}
        warning={this.state.warning} />
    } else if (this.state.playable && !this.state.drawCard){
      notification =
      <PopUp style={styles.optional} title={'Play card or draw?'}
        textA={'Draw new card'}
        actionA={() => {
          this.state.ws.send(JSON.stringify({
            route: 'drawCard',
            userId: this.props.parentProps.appUserId,
            gameId: +this.props.gameId,
          }));
          // this will also need to act on the response that the server sends
        }}
        textB={'Play card from hand'}
        actionB={() => {
          this.setState({drawCard: true});
        }} />
    }

    console.log(this.props);

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
