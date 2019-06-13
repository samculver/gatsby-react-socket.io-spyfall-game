import 'socket.io';
import { Game } from './src/model/game';
import { User } from './src/model/user';

declare module 'socket.io' {

  interface Socket {
    ip: string;
    user?: User;
    game?: string;
  }

}
