import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { pageState } from '../atoms/filter.atoms';

function usePages() {
  const [page, setPage] = useRecoilState<number>(pageState);

  const handleNext = useCallback(() => {
    setPage((prevState) => prevState + 1);
  }, [page]);

  const handlePrev = useCallback(() => {
    if (page === 1) return;
    setPage((prevState) => prevState - 1);
  }, [page]);

  return {
    handlePrev,
    handleNext,
    page
  };
}

export default usePages;
