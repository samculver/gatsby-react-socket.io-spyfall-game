# spy-fall
Creating a version of the multiplayer party game "Spyfall" using Gatsby with React and Socket.io

This project is working but not fully complete.

Demo: http://spyfall.surge.sh

Server is deployed to AWS on the free tier.

Client is hosted on https://surge.sh/ because Surge does not require SSL to communicate with the free tier AWS.

## Run

Server:

    $ cd server
    $ npm install
    $ npx tsc
    $ node dist/index.js

Client:

    $ cd client
    $ npm install
    $ gatsby develop --open
