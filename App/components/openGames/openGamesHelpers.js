const Game = require('../game/game');

openJoinableGamesScreen = () => {
  console.log('You\'ve decided to better yourself by joining ANOTHER game');
}

chooseGame = (gameId, context) => {
  console.log('you chose game', gameId);
  fetch('https://notuno.herokuapp.com/api/game/getgame', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        gameId: gameId
      })
    })
    .then((response) => response.json())
    .then((parsedResponse) => {
      console.log(parsedResponse);
      // get the current card to pass down to the game application
      let currentCard = JSON.parse(parsedResponse.playedCards);
      currentCard = currentCard[currentCard.length-1];
      // players data
      let assignedPlayers = {
        currentPlayer: null,
        topPlayer: null,
        rightPlayer: null,
        leftPlayer: null,
      };

      let myPosition;

      for (let i=0; i < parsedResponse.players.length; i++) {
        let player = parsedResponse.players[i];
        if (player.userId === context.props.appUserId) {
          assignedPlayers.currentPlayer = player;
          myPosition = player.position;
        } else if (assignedPlayers.topPlayer === null) {
          assignedPlayers.topPlayer = player;
        } else if (assignedPlayers.leftPlayer === null) {
          assignedPlayers.leftPlayer = player;
        } else if (assignedPlayers.rightPlayer == null) {
          assignedPlayers.rightPlayer = player;
        }
      }
      let userCards = JSON.parse(assignedPlayers.currentPlayer.hand);
      let activePlayer = parsedResponse.currentPlayer;
      let gameId = parsedResponse.gameId;
      let direction = parsedResponse.direction;

      // ====================================================================
      // We'll be passing down into the game module:
      // - currentCard -> the card that's being compared against
      // - myPosition -> the player position the current player is (0-3)
      // - assignedPlayers -> arr of player objects, each are hand, user, pos
      // - activePlayer -> player whose current turn it is
      // - userCards -> the hand of the current player
      // - gameId -> current game's id
      // - direction -> current direction of play (l:1 , r:0)
      // ====================================================================

      // Oh hell, now let's write the game module. I guess.

      context.props.navigator.push({
        title: ('game ' + gameId),
        component: Game,
        passProps: {
          parentProps: context.props,
          currentCard: currentCard,
          myPosition: myPosition,
          assignedPlayers: assignedPlayers,
          activePlayer: activePlayer,
          userCards: userCards,
          gameId: gameId,
          direction: direction,
        }
      });

    })
    .catch((err) => {
      console.log(err);
    })
}


module.exports = {
  openJoinableGamesScreen: openJoinableGamesScreen,
  chooseGame: chooseGame,
}
