import * as io from 'socket.io-client';

//export const socket = io(`ws://${window.location.hostname}:8081`);
const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
//export const socket = io(`${protocol}://spyfallserver.azurewebsites.net`);
export const socket = io(`ws://localhost:8081`);

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
