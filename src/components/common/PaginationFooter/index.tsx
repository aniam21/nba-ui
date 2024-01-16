import React from 'react';

import usePages from 'hooks/usePages';
import Button from '../Button';
import { Metadata } from '$utils/types/player.interfaces';
import styles from './index.module.css';

interface FooterProps  {
  metadata: Pick<Metadata, 'currentPage' | 'totalPages'>;
}
const PaginationFooter = (props: FooterProps) => {

  const { metadata } = props;
  const { page, handleNext, handlePrev } = usePages();
  const prevDisabled = metadata.currentPage === 1;
  const nextDisabled = metadata.currentPage === metadata.totalPages;
    return (
      <div className={styles.list__footer}>
        <div className={styles.footer__prev}>
          <Button disabled={prevDisabled} onClick={handlePrev}>Prev</Button>
        </div>
        {page} ....{metadata.totalPages}
        <div className={styles.footer__next}>
          <Button disabled={nextDisabled} onClick={handleNext}>Next</Button>
        </div>
      </div>
  );
};

export default PaginationFooter;
