import React from 'react';
import cx from 'classnames';
import { tableHeaders } from '../../../utils/defaultValues';
import styles from './index.module.css';

interface ListProps {
  label: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  headers?: string[];
  headersClassName?: string;
}

const List = ({ label, headers = tableHeaders, children, footer, headersClassName }: ListProps) => {
  const currHeaders = [...headers, 'Favorite'];
  return (
    <div className={styles.list__container}>
      <div className={styles.list__label}>{label}</div>
      <div className={cx(styles.headers__container, headersClassName)}>
        {currHeaders.map((heading) => (
          <div key={heading} className={styles.header}>
            {heading}
          </div>
        ))}
      </div>
      <div className={styles.list__content}>{children}</div>
      {footer ? <div className={styles.list__footer}>{footer}</div> : null}
    </div>
  );
};

export default List;
