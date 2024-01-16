import React from 'react';

import usePages from 'hooks/usePages';
import Button from '../Button';
import { Metadata } from '$utils/types/player.interfaces';
import styles from './index.module.css';

interface FooterProps {
  metadata: Pick<Metadata, 'currentPage' | 'totalPages' | 'nextPage'>;
}
const PaginationFooter = ({metadata}: FooterProps) => {
  const { currentPage, nextPage, totalPages }  = metadata;
  const { page, handleNext, handlePrev } = usePages();
  const prevDisabled = currentPage === 1;
  // API developers removed 'total_pages' due to errors during my task so checking if next page is available
  const nextDisabled = (totalPages === 1 && !nextPage) || (currentPage === totalPages && totalPages !== 1);
  return (
    <div className={styles.list__footer}>
      <div className={styles.footer__prev}>
        <Button disabled={prevDisabled} onClick={handlePrev}>
          Prev
        </Button>
      </div>
      {page} {metadata.totalPages > 1 ?  `....${metadata.totalPages}` : ""}
      <div className={styles.footer__next}>
        <Button disabled={nextDisabled} onClick={handleNext}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default PaginationFooter;
