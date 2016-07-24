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

module.exports = {
  chooseCard: chooseCard,
}
