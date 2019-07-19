import { Model } from "../model";
import { User } from "./user";
import { locations } from "./locations";
import shortid from 'shortid';
var randomize = require('randomatic');

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
    code: randomize('a', 5)
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

  if (!gameSettings.hasOwnProperty(gameCode)) {
    // game isnt setup yet, so lets setup
    const players = users[gameCode];
    const spy = players[Math.floor(Math.random() * players.length)];
    const locationData = locations[Math.floor(Math.random() * locations.length)];
    // set location for this game session
    gameSettings[gameCode] = gameSettings[gameCode] || {
      location: locationData.location,
      spy: spy
    };
    // question: would gameSetting every get too large? How to clean up?

    users[gameCode].map((user) => {
      user.role = user.token === spy.token ? 'Spy' :
        locationData.roles[Math.floor(Math.random() * locationData.roles.length)];
      return user
    });

  }
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

export function getLocations(): Array<any> {
  return locations.map(item=>item.location)
}

export function leaveAll(user: User) {
  Object.entries(users).forEach(([gameid, users]) => {
    const i = users.findIndex(maybeUser => maybeUser.token === user.token);
    if (i !== -1) users.splice(i, 1);
  });
}
