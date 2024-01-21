/* eslint-disable @typescript-eslint/no-explicit-any */
import { atom } from 'recoil';
import { PlayerResponse, PlayersMap } from '$types/player.interfaces';

const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: { setSelf: any; onSet: any }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(new Map(JSON.parse(savedValue)));
    }
    onSet((newValue: any, _: any, isReset: any) => {
      if (isReset) localStorage.removeItem(key);
      else localStorage.setItem(key, JSON.stringify(Array.from(newValue.entries())));
    });
  };

export const playersState = atom<PlayerResponse>({
  key: 'playersState',
  default: {
    metadata: {
      nextPage: null,
      totalPages: 1,
      currentPage: 0,
      perPage: 0,
      totalCount: 0
    },
    data: new Map()
  }
});

export const favoritePlayersState = atom<PlayersMap>({
  key: 'favorites',
  default: new Map(),
  effects: [localStorageEffect('favorites')]
});
