chooseCard = (card, index, context) => {
  console.log(card, index);
  context.setState({currentCard: card});
  // now send this choice to the server
}

module.exports = {
  chooseCard: chooseCard,
}
