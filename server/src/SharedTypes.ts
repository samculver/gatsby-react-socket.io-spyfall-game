export function validNick(nick: string): boolean {
  return nick.length >= 3 && /^[a-zA-Z0-9_-]+$/.test(nick);
}

export interface User {
  token: string;
  nick: string | null;
}

export interface BasicGame {
  name: string;
  id: number;
}
