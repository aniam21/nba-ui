import PlayersModule from 'services/players.module';
import { useSetRecoilState } from 'recoil';
import { playersState } from 'atoms/player.atoms';
import { toast } from 'react-toastify';
import { useFetch } from './useFetch';

import { PlayerResponse } from '../utils/types/player.interfaces';

function usePlayers() {
  const setPlayers = useSetRecoilState<PlayerResponse>(playersState);

  const { fetchAsync } = useFetch();

  const fetchPlayers = async (search = '', page = 1) => {
    try {
    const recievedPlayers = await fetchAsync<PlayerResponse>(PlayersModule.getPlayers({ search, page }));
    const playersMap = new Map(Object.entries(recievedPlayers.data));
    const formattedPlayers = {
      metadata: recievedPlayers.metadata,
      data: playersMap
    };
    setPlayers(formattedPlayers);
  } catch (err: any) {
    const message = err.response?.message ?? err.message;
    toast.error(message, {
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
    });
  };
};

  return { fetchPlayers };
}

export default usePlayers;
