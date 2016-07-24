const create = require('./create');

parentSetState = (key, value, context) => {
  let obj = {};
  obj[key] = value;
  context.setState(obj);
}

createUser = (username, password, confirm, context) => {
  if (password !== confirm) {
    console.log('BOOO YOU STINK');
    return false;
  }
  fetch('https://notuno.herokuapp.com/api/user/auth/signup', {
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
  .then((parsedResponse) => {
    if(parsedResponse.response === 'affirmative') {
      context.setState({
        appUserId: parsedResponse.userId,
        appPassword: '',
        valid: true,
      });
      // _lh.openMyGamesScreen(context.state.valid, context);
    } else {
      context.setState({
        error: parsedResponse,
      })
    }

  })
  .catch((err) => {
    console.log(err);
  });
}

module.exports = {
  parentSetState: parentSetState,
  createUser: createUser,
}
