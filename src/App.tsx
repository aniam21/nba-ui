import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false
    }
  }
});

const App = () => (
  <RecoilRoot>
    <ToastContainer
      position="top-center"
      newestOnTop
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss={false}
      draggable={false}
      theme="colored"
    />
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  </RecoilRoot>
);

export default App;
