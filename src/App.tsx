import React from 'react';
import { RecoilRoot } from 'recoil';
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

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
    <Home />
  </RecoilRoot>
);

export default App;
