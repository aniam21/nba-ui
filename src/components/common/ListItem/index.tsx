import { useFavorites } from 'hooks/useFavorites';
import cx from 'classnames';
import { Player } from '$types/player.interfaces';
import ColorPicker from '../ColorPicker';
import styles from './index.module.css';
import Checkbox from '../Checkbox';

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
        <Checkbox checked={isFavorite} id={id} onClick={(clickedId) => toggleFavorite(String(clickedId))} />
      </div>
    </div>
  );
};

export default ListItem;
