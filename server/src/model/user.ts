import shortid from 'shortid';
import { Model } from '../model';

export interface User {
  token: string;
  nick: string;
  role?: string;
}

export function createUser(): User {
  const user = {
    token: shortid.generate(),
    nick: 'Guest',
  };
  return user;
}

export function setNick(user: User, nick: string) {
  user.nick = nick;
}
