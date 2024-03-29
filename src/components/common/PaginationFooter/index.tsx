import usePages from 'hooks/usePages';
import { Metadata } from '$utils/types/player.interfaces';
import Button from '../Button';
import styles from './index.module.css';

interface FooterProps {
  metadata: Pick<Metadata, 'currentPage' | 'totalPages' | 'nextPage'>;
  onNextHover?: () => void;
}
const PaginationFooter = ({ metadata, onNextHover }: FooterProps) => {
  const { currentPage, nextPage, totalPages } = metadata;
  const { handleNext, handlePrev } = usePages();
  const prevDisabled = currentPage === 1;
  // API developers removed 'total_pages' due to errors during my task so checking if next page is available
  const nextDisabled = (nextPage && nextPage < currentPage + 1) || (currentPage === totalPages && totalPages !== 1);
  return (
    <div className={styles.list__footer}>
      <div className={styles.footer__prev}>
        <Button disabled={prevDisabled} onClick={handlePrev}>
          Prev
        </Button>
      </div>
      {currentPage} {metadata.totalPages > 1 ? `....${metadata.totalPages}` : ''}
      <div  className={styles.footer__next}>
        <Button onMouseOver={onNextHover} disabled={nextDisabled} onClick={handleNext}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default PaginationFooter;
