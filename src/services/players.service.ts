import { HttpClient } from '../utils/http.client';
import config from '../config';
import { GetPlayersQuery, PlayerResponse } from '../utils/types/player.interfaces';

const {
  endpoints: { players },
} = config;

export default class PlayersModule {
  static api = `http://localhost:3000${players}`;

  static getPlayers(query: GetPlayersQuery): Promise<PlayerResponse> {
    const { search , ...rest} = query;
    const filter: GetPlayersQuery = { ...rest};
    if(search) filter.search = search;
    return HttpClient.get(PlayersModule.api, { ...filter });
  }
}
