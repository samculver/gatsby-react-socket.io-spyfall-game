import { Model } from "../model";
import { User } from "./user";
import shortid from 'shortid';

export interface Game {
  code: string;
}

interface IGameSettings {
  location: string;
  spy: string;
}

interface IGameProfile {
  location?: string | null;
  role?: string | null;
}

export function createGame(): Game {
  const game = {
    code: shortid.generate()
  }
  return game;
}

const users: { [gameId: string]: User[] } = {};
const gameSettings: { [gameId: string]: IGameSettings } = {};

export function getUsers(gameCode: string): User[] {
  return users[gameCode];
}

export function join(gameCode: string, user: User) {
  users[gameCode] = users[gameCode] || [];
  users[gameCode].push(user);
}

export function setupGame(gameCode: string) {

  const players = users[gameCode];
  const spy = players[Math.floor(Math.random() * players.length)];
  // set location for this game session
  gameSettings[gameCode] = gameSettings[gameCode] || {
    location: 'Space Station',
    spy: spy
  };

  users[gameCode].map((user) => {
    user.role = user.token === spy.token ? 'Spy' : 'Astronaut';
    return user
  });
}

export function getMyGameProfile(gameCode: string, user: User): IGameProfile {
  const player = users[gameCode].filter(player => player.token === user.token);
  const role = player.length ? player[0].role : null;
  const location = role !== "Spy" ? gameSettings[gameCode].location : null;
  return {
    location: location,
    role: role
  }
}

export function leaveAll(user: User) {
  Object.entries(users).forEach(([gameid, users]) => {
    const i = users.findIndex(maybeUser => maybeUser.token === user.token);
    if (i !== -1) users.splice(i, 1);
  });
}
