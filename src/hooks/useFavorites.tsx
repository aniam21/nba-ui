import { useRecoilState, useRecoilValue } from 'recoil';
import { playersState, favoritePlayersState } from 'atoms/player.atoms';
import { PlayersMap } from '$utils/types/player.interfaces';

export const useFavorites = () => {
  const players = useRecoilValue(playersState);
  const [favoritePlayers, setFavoritePlayers] = useRecoilState<PlayersMap>(favoritePlayersState);

  const isIdFavorite = (id: string) => !!favoritePlayers.has(id);

  const setFavoriteColor = (id: string, color: string) => {
    const playerFound = favoritePlayers.get(id);
    if (!playerFound) return;
    const newPlayer = { ...playerFound, color };
    const map = new Map(favoritePlayers);
    map.set(id, newPlayer);
    setFavoritePlayers(map);
  };

  const toggleFavorite = (id: string) => {
    if (favoritePlayers.get(id)) {
      const map = new Map(favoritePlayers);
      map.delete(id);
      setFavoritePlayers(new Map(map));
    } else {
      const player = players.data.get(String(id));
      if (!player) return;
      const newPlayer = { ...player, favorite: true, color: 'tansparent' };
      setFavoritePlayers(new Map(favoritePlayers.set(id, newPlayer)));
    }
  };

  return { isIdFavorite, toggleFavorite, setFavoriteColor };
};
