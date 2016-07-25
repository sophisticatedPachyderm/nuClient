chooseCard = (card, index, context) => {
   if (!context.state.playable) {
    context.setState({warning: 'it is not your turn yet'});
    console.log('it is not your turn yet');
  } else if (!context.state.drawCard) {
    context.setState({warning: 'you need to choose to draw a card'});
    console.log('you need to choose to draw a card');
  } else if (card[0] === 'wild' || card[0] === 'takeFour') {

    context.setState({currentCard: card, needToChooseColor: true, tempIndex: index});

  } else if (cardLogic(context.state.currentCard, card)) {
    context.setState({currentCard: card});
    // now send this choice to the server
    context.ws.send(JSON.stringify({
      route: 'myTurn',
      cardIndex: index,
      userId: context.props.parentProps.appUserId,
      gameId: context.props.gameId,
    }));
    // set the client to not respond to players touches anymore
    let temp = context.state.currentHand;
    temp.splice(index, 1);
    // this action basically ends the user's turn
    context.setState({playable: false, drawCard: false, currentHand: temp});
  } else {
    console.log('invalid choice!');
  }
}

cardLogic = (current, played) => {
  if (played[1] === 1) {
    return true;
  }
  else if (current[0] === played[0]) {
    return true;
  } else if (current[1] === played[1]) {
    return true;
  }
  return false;
}

writePlayersToPositions = (players) => {
  let output = {};

  for (let p in players) {
    console.log(players[p].position);
  	if (p === 'currentPlayer') {
  		output[players[p].position] = 'bottom';
  	} else if (p === 'leftPlayer' && players[p].position) {
  		output[players[p].position] = 'left';
  	} else if (p === 'rightPlayer' && players[p].position) {
  		output[players[p].position] = 'right';
  	} else if (p === 'topPlayer' && players[p].position) {
  		output[players[p].position] = 'top';
  	}
  }

  return output;
};

chooseImage = (data, loc) => {
  if(loc === 'direction') {
    if (data === 0) {
      return {uri: 'clock.png'};
    } else {
      return {uri: 'counter.png'};
    }
  } else {
    if (data === 'top') {
      return {uri: 'up.png'};
    } else if (data = 'bottom') {
      return {uri: 'down.png'};
    } else if (data = 'left') {
      return {uri: 'left.png'};
    } else if (data = 'right') {
      return {uri: 'right.png'};
    }
  }
}

isMyTurn = (context) => {
  if (context.props.myPosition !== context.props.activePlayer) {
    notification = <Warning style={styles.optional}
      title={context.state.popUpMessage}
      warning={context.state.warning} />
  } else {
    context.setState({playable:true});
  }
}

chooseColor = (color, context) => {
  let index = context.state.tempIndex;
  context.ws.send(JSON.stringify({
    route: 'myTurn',
    cardIndex: index,
    userId: context.props.parentProps.appUserId,
    gameId: context.props.gameId,
    wildColor: color,
  }));
  // set the client to not respond to players touches anymore
  let temp = context.state.currentHand;
  temp.splice(index, 1);
  // set the color to be what we need
  let tempCard = context.state.currentCard;
  tempCard[1] = color;
  // this action basically ends the user's turn
  context.setState({
    currentCard: tempCard,
    playable: false,
    drawCard: false,
    currentHand: temp,
    needToChooseColor: false,
  });
}

module.exports = {
  chooseCard: chooseCard,
  writePlayersToPositions: writePlayersToPositions,
  chooseImage: chooseImage,
  isMyTurn: isMyTurn,
  chooseColor: chooseColor,
}
