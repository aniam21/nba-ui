import { useRecoilState } from 'recoil';

import { queryState } from 'atoms/filter.atoms';
import { playersState } from 'atoms/player.atoms';

import PaginationFooter from 'components/common/PaginationFooter';
import SearchBar from 'components/common/SearchBar';
import List from 'components/common/List';
import EmptyFooter from 'components/common/EmptyList';
import usePlayers from 'hooks/usePlayers';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import SpinningLoader from 'components/common/SpinningLoader';
import ListItem from 'components/common/ListItem';
import { PlayerResponse } from '$utils/types/player.interfaces';

import styles from './index.module.css';

const AllPlayerList = () => {
  const { fetchPlayers } = usePlayers();
  const queryClient = useQueryClient();
  const [players, setPlayers] = useRecoilState<PlayerResponse>(playersState);
  const [query, setQuery] = useRecoilState(queryState);

  const handleSuccess = (data: PlayerResponse) => {
    setPlayers(data);
  };
  const queryRes = useQuery<PlayerResponse>({
    queryKey: ['playersData', query.page, query.search],
    queryFn: () => fetchPlayers(query.search, query.page),
    refetchOnWindowFocus: false
  });

  const handleNextHover = () => {
    queryClient.prefetchQuery({
      queryKey: ['playersData', query.page + 1, query.search],
      queryFn: () => fetchPlayers(query.search, query.page + 1)
    });
  };
  const handleSearch = (searchTerm: string) => {
    let newPage = query.page;
    if (searchTerm === '' || query.page !== 1 || query.search !== searchTerm) {
      newPage = 1;
    }
    setQuery({ page: newPage, search: searchTerm });
  };

  const noPlayersFound = queryRes.data && !queryRes.data.data.size && !queryRes.isLoading;

  if (queryRes.isError) return <div>Something went wrong ...</div>;
  if (queryRes.isSuccess) handleSuccess(queryRes.data);

  return (
    <div className={styles.wrapper}>
      <div className={styles.loader}>
        <SpinningLoader visible={queryRes.isLoading} />
      </div>
      <div className={queryRes.isLoading ? styles.loading : ''}>
        <List
          label="All NBA Players"
          footer={
            <PaginationFooter
              onNextHover={handleNextHover}
              metadata={{
                totalPages: players.metadata.totalPages || 1,
                nextPage: players.metadata.nextPage || 1,
                currentPage: query.page
              }}
            />
          }
        >
          <SearchBar handleSearch={handleSearch} />
          {noPlayersFound ? (
            <div>
              <EmptyFooter label="No Players Found" />
            </div>
          ) : (
            Array.from(players.data.entries()).map(([key, player]) => (
              <div key={key} className={styles.list__container}>
                <ListItem data={player} />
              </div>
            ))
          )}
        </List>
      </div>
    </div>
  );
};

export default AllPlayerList;
