import { HttpClient } from '../utils/http.client';
import config from '../config';
import { GetPlayersQuery, PlayerResponse } from '../utils/types/player.interfaces';

const {
  endpoints: { players },
  PLAYERS_PER_PAGE
} = config;

export default class PlayersModule {
  static api = `http://localhost:3000${players}`;

  static getPlayers(query: GetPlayersQuery): Promise<PlayerResponse> {
    const { search , ...rest} = query;
    const filter: GetPlayersQuery = { ...rest, perPage: PLAYERS_PER_PAGE};
    if(search) filter.search = search;
    return HttpClient.get(PlayersModule.api, { ...filter });
  }
}
