import PlayersModule from 'services/players.service';
import { toast } from 'react-toastify';
import { useFetch } from './useFetch';

import { PlayerResponse } from '../utils/types/player.interfaces';

function usePlayers() {
  const { fetchAsync } = useFetch();

  const fetchPlayers = async (search = '', page = 1): Promise<PlayerResponse> => {
    try {
      const recievedPlayers = await fetchAsync<PlayerResponse>(PlayersModule.getPlayers({ search, page }));
      const playersMap = new Map(Object.entries(recievedPlayers.data));
      const formattedPlayers = {
        metadata: recievedPlayers.metadata,
        data: playersMap
      };
      return formattedPlayers;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const message = err.response?.message ?? err.message;
      toast.error(message, {
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true
      });
      throw new Error(message);
    }
  };

  return { fetchPlayers };
}

export default usePlayers;
