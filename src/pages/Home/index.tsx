import React from 'react';

import FavoriteList from 'components/FavoriteList';
import AllPlayerList from '../../components/PlayersList';
import styles from './index.module.css';

const Home = () => (
  <div className={styles.page}>
    <div className={styles.lists__container}>
      <div className={styles.list__wrapper}>
        <FavoriteList />
      </div>
      <div className={styles.list__wrapper}>
        <AllPlayerList />
      </div>
    </div>
  </div>
);
export default Home;
