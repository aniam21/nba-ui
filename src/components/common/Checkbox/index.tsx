import cx from 'classnames';

import styles from './index.module.css';

interface CheckboxProps {
  id: string;
  checked: boolean;
  onClick: (id: string) => void;
}

const Checkbox = ({ id, checked, onClick }: CheckboxProps) => {

  const itemSelectedBsColor = checked ? '#000000' : 'transparent';
  return (
      <span
        style={{ backgroundColor: itemSelectedBsColor }}
        className={cx(styles.custom__checkbox, checked ? styles['custom__checkbox--checked'] : '')}
      >
        <input type="checkbox" id="checkbox" checked={checked} onChange={() => onClick(id)} />
      </span>
  );
};

export default Checkbox;