import querystring from 'querystring';
import socketio from 'socket.io';
import * as Games from './model/game';
import * as Shared from './SharedTypes';
import * as Users from './model/user';

//const port = process.env.PORT || 8081;
const port = 3000;
const server = socketio.listen(port, {transports: ['websocket']});
console.log(`Listening on ${port}`);

const latestVersion = Date.now();

function normalizeUser(user: Users.User): Shared.User {
  return {
    nick: user.nick,
    token: user.token,
  };
}

server.on('connection', socket => {

  socket.ip = socket.handshake.headers['x-forwarded-for'] || socket.handshake.address;

  socket.on('get version', reply => {
    reply(latestVersion);
  });

  socket.on('identify', (token: string | null, reply: (user: Shared.User) => void) => {
    const user = Users.createUser();
    socket.user = Users.createUser();
    reply(normalizeUser(user));
  });

  socket.on('create game', (reply) => {
    if (!socket.user) return;
    console.log(`Creating game`);
    const game : Games.Game = Games.createGame();
    reply(game.code);
  });

  socket.on('create nick', (nick: string, reply) => {
    if (!socket.user) return;
    if (!Shared.validNick(nick)) return;
    console.log(`Creating nickname: ${nick}`);
    Users.setNick(socket.user, nick);
    reply();
  });

  socket.on('join', (code: string, reply: (users: Shared.User[]) => void) => {
    console.log(`trying to join ${code}`);
    if (!socket.user) return;

    const oldGame = socket.game;
    socket.game = code;

    if (oldGame) socket.leave(oldGame);
    socket.join(code);

    Games.leaveAll(socket.user);
    Games.join(code, socket.user);

    // triger any in-game events
    if (oldGame) server.to(oldGame).emit('user left', normalizeUser(socket.user));
    server.to(code).emit('user joined', normalizeUser(socket.user));

    reply(
      Games.getUsers(code).map(normalizeUser)
    );
  });

  socket.on('start game', () => {
    if (!socket.user) return;
    if (!socket.game) return;
    // need to make sure this only happens once
    Games.setupGame(socket.game);
    server.to(socket.game).emit('game start');
  });

  socket.on('get game profile', (reply) => {
    if (!socket.user) return;
    if (!socket.game) return;
    reply(Games.getMyGameProfile(socket.game, socket.user), Games.getLocations());
  });

  socket.on('disconnect', () => {
    if (!socket.user) return;

    const oldGame = socket.game;
    if (!oldGame) return;

    Games.leaveAll(socket.user);
    server.to(oldGame).emit('user left', normalizeUser(socket.user));
  });

});

