const _h  = require('../login/loginHelpers');

console.log(_h);

joinGame = (gameId, context) => {
  // send the message to the server to join the game
  fetch('https://notuno.herokuapp.com/api/game/joingame', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      gameId: gameId,
      userId: context.props.parentProps.userId,
    })
  })
  .then((response) => {
    // here, I actually want to refresh the
    context.props.navigator.pop();
    _h.openMyGamesScreen(true, context);
  })
  .catch((err) => {
    console.log(err);
  });

}

module.exports = {
  joinGame: joinGame
};
