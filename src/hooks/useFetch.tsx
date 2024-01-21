import { useSetRecoilState } from 'recoil';
import { AxiosError } from 'axios';
import { loaderState } from '../atoms/filter.atoms';

export const useFetch = () => {
  const setIsLoading = useSetRecoilState(loaderState);

  async function fetchAsync<T>(asyncAction: Promise<T>): Promise<T>;
  async function fetchAsync<T>(asyncAction: Promise<T>): Promise<T | AxiosError> {
    setIsLoading(true);
    try {
      const data = await asyncAction;
      return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return err.response?.data ?? err;
    } finally {
      setIsLoading(false);
    }
  }
  return { fetchAsync };
};
