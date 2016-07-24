import React, {Component} from 'react';

import {
  Text,
  View,
  ScrollView,
  Dimensions,
  StyleSheet,
} from 'react-native';

const Card = require('./card');
// const PopUp = require('./popup');
const OppView = require('./opponentView');

const _h = require('./gameHelpers');

// const wsInit = require('../../socket/socketUtil');
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
      // the challenge will be to figure out how to set up the props to come in as default state
      currentCard: this.props.currentCard,
    };
  }

  render() {
    let cardsArray = this.props.userCards.map((card, index) => {
            return <Card
              key={index}
              card={card}
              index={index}
              action={() => _h.chooseCard(card, index, this)}
              colors={colorConverter} />;
          });

    const {topPlayer, leftPlayer, rightPlayer} = this.props.assignedPlayers;

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
        </View>
        <ScrollView style={styles.hand} horizontal={true}>
          {cardsArray}
        </ScrollView>
      </View>
    );
  }
};

module.exports = game;
