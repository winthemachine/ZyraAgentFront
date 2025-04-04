import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { APP_ROUTES } from '@/utils/constant';
import LoadingScreen from '@/components/common/LoadingScreen';
import AppLayout from '@/layout/AppLayout';

const NotFoundPage = React.lazy(() => import('@/pages/NotFound'));
const HomePage = React.lazy(() => import('@/pages/app/Home'));
const LandingPage = React.lazy(() => import('@/pages/Landing'));
const SavedWalletsPage = React.lazy(() => import('@/pages/app/SavedWallet'));
const WalletTrackersPage = React.lazy(() => import('@/pages/app/WalletTrackers'));

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route path={APP_ROUTES.LANDING} element={<LandingPage />} />
        <Route element={<AppLayout />}>
          <Route path={APP_ROUTES.HOME} element={<HomePage />} />
          <Route path={APP_ROUTES.SAVED_WALLET} element={<SavedWalletsPage />} />

          <Route path={`${APP_ROUTES.WALLET_TRACKER}/:address`} element={<WalletTrackersPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense >
  );
};

export default AppRoutes;