
export interface BackendPlayer {
  id: string;
  fullName: string;
  team: string;
  height: number | string;
  position: string;
}

export interface Player extends BackendPlayer {
  color?: string;
  favorite?: boolean;
}

export interface PagesMetadata {
  totalPages: number;
  currentPage: number;
  next_page?: number;
  perPage: number;
  totalCount: number;
}

export type PlayerResponse = {
  data: PlayersMap,
  metadata: Metadata
};

export interface Metadata {
  totalPages: number;
  currentPage: number;
  perPage: number;
  totalCount: number;
}

export interface GetPlayersQuery {
  page: number;
  perPage?: number;
  search?: string;
  populate?: boolean;
}

export type PlayersMap = Map<string, Player>;
