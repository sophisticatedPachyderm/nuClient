const OpenGames = require('../openGames/openGames');

parentSetState = (key, value, context) => {
  let obj = {};
  obj[key] = value;
  context.setState(obj);
}

const cachedGames = [];

// --- send a fetch request to the server to check the credentials --- //
sendAuthCheck = (username, password, context) => {
  fetch('https://notuno.herokuapp.com/api/user/auth/signin', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      password: password,
    })
  })
  .then((response) => response.json())
  .then((jsonResponse) => {
    let valid = jsonResponse.response === 'affirmative';
    context.setState({
      'valid': valid,
      'appUserId': jsonResponse.userId,
    });
    return [valid,context];
  })
  .then((incoming) => {
    openMyGamesScreen(incoming[0], incoming[1]);
  })
  .catch((err) => {
    console.log(err);
  });
}

// --- send a fetch request to the server to check the credentials --- //
openCreateScreen = () => {
  console.log('and on the 8th day...');
}

openMyGamesScreen = (valid, context) => {
  if (valid) {
    context.setState({
      appPassword: '',
    });
    fetch('https://notuno.herokuapp.com/api/game/allgames', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: context.state.appUserId,
      })
    })
    .then((response) => response.json())
    .then((jsonResponse) => {
      // assign this to the openGames state
      for (let key in jsonResponse) {
        cachedGames.push({
          gameId: key,
          players: jsonResponse[key].usernameList,
        });
      }
      return cachedGames;
    })
    .then((openGames) => {
      context.props.navigator.push({
        title: 'Open Games',
        component: OpenGames,
        passProps: {
          appUsername: context.state.appUsername,
          appUserId: context.state.appUserId,
          openGames: openGames,
        },
        rightButtonTitle: 'add',
        onRightButtonPress: () => {
          console.log('I made a game, you should probably change this.');
        },
      });
    })
    .catch((err) => {
      console.log(err);
    });

  } else {
    context.setState({
      error: 'Your username and/or password are not valid',
    });
    console.log('seems fishy')
  }
};

module.exports = {
  parentSetState: parentSetState,
  sendAuthCheck: sendAuthCheck,
  openCreateScreen: openCreateScreen,
  openMyGamesScreen: openMyGamesScreen,
}
