import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { queryState } from '../atoms/filter.atoms';

function usePages() {

  const [query, setQuery] = useRecoilState<{ page: number, search: string}>(queryState);

  const handleNext = useCallback(() => {
    setQuery((prevState) => ({ ...prevState ,page: prevState.page + 1}));
  }, [query.page]);

  const handlePrev = useCallback(() => {
    if (query.page === 1) return;
    setQuery((prevState) => ({ ...prevState ,page: prevState.page - 1}));
  }, [query.page]);

  return {
    handlePrev,
    handleNext,
    query,
  };
}

export default usePages;
