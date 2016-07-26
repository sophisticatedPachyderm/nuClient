#notUno

definitely not uno

#Purpose

This repo exists so we can have some documentation about our Greenfield project. One of the biggest things that we wanted to focus on was learning something new, not necessarily making a product to fill a need.

From that, we decided to use React Native to build a web app. We also used websockets (ws/wss) to to make the game render in real time as people play across a couple devices.

#Stack

For the client, we use React-Native to build an ios friendly app.

We use a mySQL database without any hosted with AWS to store the three tables (users, games, gamesByUsers (JOIN TABLE)). For the server we do not user any kind of ORM.

We use node/express for the server. Under the server, we have http routing for the user login/creation/initial retrieval. And we use websockets for any update coming across the game screen.
