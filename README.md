#notUno
definitely not uno an iOS recreation of a popular card game

#Purpose
## Client
We used React-Native to


From that, we decided to use React Native to build a web app. We also used websockets (ws/wss) to to make the game render in real time as people play across a couple devices.

#Stack
For the client, we use React-Native to build an iOS friendly app.

We connected to our NodeJS webserver (hosted on Heroku) with both HTTP Fetch requests and Socket interactions


We chose to use Fetch for the main client - server interactions because it would minimize network overhead when we didn't need a real time stream (clients logging in, view their game lobby, etc). The sockets were used to keep a real time connection with a game in progress.


We use a MySQL database hosted through with Amazon RDS. 
