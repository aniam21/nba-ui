import { useEffect, useState } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';

import { loaderState, pageState } from 'atoms/filter.atoms';
import { playersState } from 'atoms/player.atoms';

import PaginationFooter from 'components/common/PaginationFooter';
import SearchBar from 'components/common/SearchBar';
import List from 'components/common/List';
import EmptyFooter from 'components/common/EmptyList';
import usePlayers from 'hooks/usePlayers';

import SpinningLoader from 'components/common/SpinningLoader';
import ListItem from 'components/common/ListItem';
import { PlayerResponse } from '$utils/types/player.interfaces';

import styles from './index.module.css';

const AllPlayerList = () => {
  const { fetchPlayers } = usePlayers();
  const loadingState = useRecoilValue(loaderState);

  const players = useRecoilValue<PlayerResponse>(playersState);
  const [page, setPage] = useRecoilState(pageState);
  const [search, setSearch] = useState("");

  const { metadata, data } = players;

  useEffect(() => {
    fetchPlayers(search, page);
  }, [page, search]);

  const handleSearch = (searchTerm: string) => {
    if (searchTerm === '' || page !== 1 || search !== searchTerm) {
      setPage(1);
    }
    setSearch(searchTerm);
  };

  const noPlayersFound = !data.size && !loadingState;

  return (
    <div className={styles.wrapper}>
      <div className={styles.loader}>
        <SpinningLoader visible={loadingState} />
      </div>
      <div className={loadingState ? styles.loading : ''}>
        <List
          label="All NBA Players"
          footer={
            <PaginationFooter
              metadata={{
                totalPages: metadata.totalPages || 1,
                nextPage: metadata.nextPage || 1,
                currentPage: page
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
            Array.from(data.entries()).map(([key, player]) => (
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
