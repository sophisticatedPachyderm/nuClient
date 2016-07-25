import React, { Component } from 'react';
import { writePlayersToPositions } from './gameHelpers.js';

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

const { height, width } = Dimensions.get('window');
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
  '1': '#555',
}

class game extends Component {
  constructor(props) {
    super(props);
    let { topPlayer, leftPlayer, rightPlayer } = props.assignedPlayers;

    if (topPlayer) {
      topPlayer.hand = JSON.parse(topPlayer.hand);
    }
    if (leftPlayer) {
      leftPlayer.hand = JSON.parse(leftPlayer.hand);
    }
    if (rightPlayer) {
      rightPlayer.hand = JSON.parse(rightPlayer.hand);
    }

    this.state = {
      warning: '',
      currentCard: this.props.currentCard,
      currentHand: this.props.userCards,
      // playable means it is current this player's turn
      playable: false,
      // draw card means you've made the decision to play a card in your hand
      drawCard: false,
      popUpMessage: 'opponent\'s turn',
      topPlayer: topPlayer,
      leftPlayer: leftPlayer,
      rightPlayer: rightPlayer,
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
          console.log('myTurn opponent response', '\n', response);
          // 1) update the currentCard  -> set state here
          var newCurrentCard = response.playedCards.pop();
          console.log('newCurrentCard:', newCurrentCard);
          this.setState({currentCard: newCurrentCard});

          // 2) update # cards in opponents hand

          // 3) check if my turn  -- set state here
          if (Number(response.currentPlayer) === this.props.myPosition) {
            console.log('Its my turn now!');
            this.setState({playable: true});

            // 4) check if i was forced to draw cards -> update your own hand  --> set state here
            if (newCurrentCard[0] === 'takeTwo' || newCurrentCard[0] === 'takeFour') {
              console.log('i drew cards:', response.nextHand);
              this.setState({currentHand: response.nextHand});
            }
          }

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
          let tempArr = ['topPlayer', 'leftPlayer', 'rightPlayer'];
          for (let i = 0; i < tempArr.length; i++) {
            if (this.state[tempArr[i]] && response.userId === this.state[tempArr[i]].userId) {
              let temp = this.state[tempArr[i]];
              console.log('ABABABABAB', temp);
              temp.hand.push(response.cardDrawn);
              let key = tempArr[i];
              let obj = {};
              obj[key] = temp;
              console.log('BCBCBCBCBCBC', obj);
              this.setState(obj);
            }
          }
          //---- this may need to be replicated 3 times if the above does not work -----
          // if (response.userId === this.state.topPlayer.userId) {
          //   let temp = this.state.topPlayer;
          //   temp.hand.push(response.cardDrawn);
          //   this.setState({
          //     topPlayer: temp,
          //   });
          // }
        }
      }
    });

    this.ws = ws;
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
    let {topPlayer, leftPlayer, rightPlayer} = this.props.assignedPlayers;

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
          this.ws.send(JSON.stringify({
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
