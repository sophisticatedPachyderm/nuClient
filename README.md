#notUno
definitely not uno, an iOS recreation of a popular card game

#Team
Duke Pham, Evan Moncuso, Steven Chung

#Purpose
##Stack
For the client, we use React-Native to build an iOS friendly app.

We connected to our NodeJS webserver (hosted on Heroku) with both HTTP Fetch requests and Socket interactions


We chose to use Fetch for the main client - server interactions because it would minimize network overhead when we didn't need a real time stream (clients logging in, view their game lobby, etc). The sockets were used to keep a real time connection with a game in progress.

![Alt text](system_design.png?raw=true "system design")

We use a MySQL database hosted through with Amazon RDS.


![Alt text](schema_design.png?raw=true "schema design")


For the server repo see here: https://github.com/sophisticatedPachyderm/notUno
