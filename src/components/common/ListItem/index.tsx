import React from 'react';
import { useFavorites } from 'hooks/useFavorites';
import cx from 'classnames';
import { Player } from '$types/player.interfaces';
import ColorPicker from '../ColorPicker';
import styles from './index.module.css';

interface ListItemProps {
  data: Player;
  containerClassName?: string;
  withColorPicker?: boolean;
}

const ListItem = ({ data, containerClassName, withColorPicker }: ListItemProps) => {
  const { fullName, position, team, height, id, color } = data;
  const { isIdFavorite, setFavoriteColor, toggleFavorite } = useFavorites();
  const handleColorChange = (colorPicked: string) => {
    setFavoriteColor(String(id), colorPicked);
  };

  const isFavorite = isIdFavorite(String(id));
  const itemSelectedBsColor = isFavorite ? '#000000' : 'transparent';
  return (
    <div className={cx(styles.item__container, containerClassName)} style={{ background: color }}>
      <div className={styles.list__item}>{fullName}</div>
      <div className={styles.list__item}>{team}</div>
      <div className={styles.list__item}>{position}</div>
      <div className={styles.list__item}>{height}</div>
      {withColorPicker ? (
        <div className={styles.list__item}>
          <ColorPicker handleChange={handleColorChange} key={id} id={id} />
        </div>
      ) : null}
      <div className={styles.list__item}>
        <span
          style={{ backgroundColor: itemSelectedBsColor }}
          className={cx(styles.custom__checkbox, isFavorite ? styles['custom__checkbox--checked'] : '')}
        >
          <input type="checkbox" id="checkbox" checked={isFavorite} onChange={() => toggleFavorite(String(data.id))} />
        </span>
      </div>
    </div>
  );
};

export default ListItem;
