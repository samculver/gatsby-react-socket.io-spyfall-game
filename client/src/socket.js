import * as io from 'socket.io-client';

let activeEnv = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development"
const protocol = typeof window !== 'undefined' && window.location.protocol === 'https:' ? 'wss' : 'ws';
const socketServer = activeEnv === 'development' ? 'localhost:8081' : 'spyfallserver.azurewebsites.net';
export const socket = io(`${protocol}://${socketServer}`);

let latestVersion = 0;

socket.emit('get version', (version) => {
  latestVersion = version;
  console.log('running version:', version);
});

socket.on('reconnect', () => {
  socket.emit('get version', (version) => {
    if (latestVersion !== version) {
      window.location.reload(true);
    }
  });
});

export function signOut() {
  localStorage.removeItem('token');
  window.location.reload(true);
}
