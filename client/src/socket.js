import * as io from 'socket.io-client';

export const socket = io(`ws://spyfallserver.azurewebsites.net`);

let latestVersion = 0;

socket.emit('get version', (version: number) => {
  latestVersion = version;
  console.log('running version:', version);
});

socket.on('reconnect', () => {
  socket.emit('get version', (version: number) => {
    if (latestVersion !== version) {
      window.location.reload(true);
    }
  });
});

export function signOut() {
  localStorage.removeItem('token');
  window.location.reload(true);
}
