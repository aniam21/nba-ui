import List from 'components/common/List';
import EmptyList from 'components/common/EmptyList';
import { favoritePlayersState } from 'atoms/player.atoms';
import { useRecoilValue } from 'recoil';
import { Player, PlayersMap } from '$utils/types/player.interfaces';
import ListItem from '../common/ListItem';

import { tableHeaders } from '../../utils/defaultValues';
import styles from './index.module.css';

const FavoriteList = () => {
  const favoritePlayers = useRecoilValue<PlayersMap>(favoritePlayersState);

  const headers = [...tableHeaders, 'Color'];

  return (
    <div className={styles.list__wrapper}>
      <List label="Your Favorite Players" headers={headers} headersClassName={styles.list__container}>
        <div className={styles.list__content}>
          {!favoritePlayers.size ? (
            <EmptyList label="No Favorite Players" />
          ) : (
            Array.from(favoritePlayers.entries()).map(([key, player]: [string, Player]) => (
              <div key={key} className={styles.list__item}>
                <ListItem
                key={key}
                  data={
                    player
                  }
                  withColorPicker
                  containerClassName={styles.list__container}
                />
              </div>
            ))
          )}
        </div>
      </List>
    </div>
  );
};

export default FavoriteList;
