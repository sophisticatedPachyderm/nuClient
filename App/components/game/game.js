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
const ChooseColorPopUp = require('./chooseColorPU');
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
  },
  username: {
    textAlign: 'center',
    color: '#000',
    fontSize: 24,
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
      needToChooseColor: false,
    };


    if (props.myPosition === props.activePlayer) {
      this.state.playable = true;
    }

    let ws = wsInit(props.parentProps.appUserId, {
      myTurnResponse: {
        mines: (response) => {
          console.log('My turn, server response:', response);

          var newCurrentCard = response.playedCards.pop();

          if (Number(response.currentPlayer) === this.props.myPosition) {
            
          } else {
            //sone one else is next
            if (newCurrentCard[0] === 'takeTwo' || newCurrentCard[0] === 'takeFour') {

              let takeCount = {
                'takeTwo': 2,
                'takeFour': 4
              };
              let count = takeCount[newCurrentCard[0]];
              //get player whose .postion === currentPlayer
              let tempArr = ['topPlayer', 'leftPlayer', 'rightPlayer'];
              for (let i = 0; i < tempArr.length; i++) {
                if (this.state[tempArr[i]] && response.currentPlayer === this.state[tempArr[i]].position) {
                  let temp = this.state[tempArr[i]];

                  for (let j = 0; j < count; j++) {
                    temp.hand.push([0, 'r']);
                  }
                  let key = tempArr[i];
                  let obj = {};
                  obj[key] = temp;
                  this.setState(obj);
                }
              }

            }
          }
        },
        opponent: (response) => {
          console.log('This shouldn\'t be coming though');
          console.log('myTurn opponent response', '\n', response);
          // 1) update the currentCard  -> set state here
          var newCurrentCard = response.playedCards.pop();
          console.log('newCurrentCard:', newCurrentCard);
          this.setState({currentCard: newCurrentCard});

          // 2) update # cards in opponents hand
          //pop off card of response.userId 's hand'
          let tempArr = ['topPlayer', 'leftPlayer', 'rightPlayer'];
          for (let i = 0; i < tempArr.length; i++) {
            if (this.state[tempArr[i]] && response.userId === this.state[tempArr[i]].userId) {
              let temp = this.state[tempArr[i]];
              temp.hand.pop();
              let key = tempArr[i];
              let obj = {};
              obj[key] = temp;
              this.setState(obj);
            }
          }

          // 3) check if my turn  -- set state here
          if (Number(response.currentPlayer) === this.props.myPosition) {
            console.log('Its my turn now!');
            this.setState({playable: true});

            // 4) check if i was forced to draw cards -> update your own hand  --> set state here
            if (newCurrentCard[0] === 'takeTwo' || newCurrentCard[0] === 'takeFour') {
              console.log('i drew cards:', response.nextHand);
              this.setState({currentHand: response.nextHand});
            }
          } else {
            //sone one else is next
            if (newCurrentCard[0] === 'takeTwo' || newCurrentCard[0] === 'takeFour') {

              let takeCount = {
                'takeTwo': 2,
                'takeFour': 4
              };
              let count = takeCount[newCurrentCard[0]];
              //get player whose .postion === currentPlayer
              let tempArr = ['topPlayer', 'leftPlayer', 'rightPlayer'];
              for (let i = 0; i < tempArr.length; i++) {
                if (this.state[tempArr[i]] && response.currentPlayer === this.state[tempArr[i]].position) {
                  let temp = this.state[tempArr[i]];

                  for (let j = 0; j < count; j++) {
                    temp.hand.push([0, 'r']);
                  }
                  let key = tempArr[i];
                  let obj = {};
                  obj[key] = temp;
                  this.setState(obj);
                }
              }

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
              temp.hand.push(response.cardDrawn);
              let key = tempArr[i];
              let obj = {};
              obj[key] = temp;
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
    } else if (this.state.needToChooseColor) {
      notification = <ChooseColorPopUp
        style={styles.optional}
        chooseColor={(color) => _h.chooseColor(color, this)} />
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
        <Text style={styles.username}>{this.props.parentProps.appUsername}</Text>
        <ScrollView style={styles.hand} horizontal={true}>
          {cardsArray}
        </ScrollView>
      </View>
    );
  }
};

module.exports = game;
