import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingScreen from './components/common/LoadingScreen';
import { AppProvider } from './contexts/app/AppProvider';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <Suspense fallback={<LoadingScreen />}>
          <AppRoutes />
        </Suspense>
      </AppProvider>
      <ToastContainer position='top-left' />
    </BrowserRouter>
  );
};

export default App;
