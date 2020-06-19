import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes from './routes';

import Globalstyle from './styles/global';

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
      <Globalstyle />
    </>
  );
};

export default App;
