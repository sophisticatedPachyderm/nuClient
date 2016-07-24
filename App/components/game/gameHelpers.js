chooseCard = (card, index, context) => {
  if (cardLogic(context.state.currentCard, card)) {
    context.setState({currentCard: card});
    // now send this choice to the server
  } else {
    console.log('invalid choice!');
  }
}

cardLogic = (current, played) => {
  if (played[1] === 1) {
    console.log('here we need some action to make the player choose a new color');
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

module.exports = {
  chooseCard: chooseCard,
  writePlayersToPositions: writePlayersToPositions,
  chooseImage: chooseImage,
}
