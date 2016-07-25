// const socketRoutes = require('./socketRoutes');

wsInit = (userId, routes) => {
  const ws = new WebSocket('wss://notuno.herokuapp.com/');

  ws.onopen = (e) => {
    // connection opened
    console.log('on open:', e.target);
    console.log('socket assigned');
    console.log('userId:', userId);
  };


  ws.onmessage = (e) => {
    let message = JSON.parse(e.data);

    let route = message.route;

    let moveFrom = 'mines';
    if (message.userId !== userId) { moveFrom = 'opponent'; }

    if (routes[route]) {
      routes[route][moveFrom](message);
    } else {
      console.log('Invalid route. You sent this to: ', route, moveFrom, '.');
    }
  };

  ws.onerror = (e) => {
    // an error occurred
    console.log('WebSocket says error');
  };

  ws.onclose = (e) => {
    // connection closed
    console.log('WebSocket is closed');
    console.log(e.code, e.reason);
  };

  return ws;
};


module.exports = wsInit;
