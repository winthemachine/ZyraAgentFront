import React, { useState, useCallback, useEffect } from 'react';
import {
  AppContext,
  TableData,
  WalletDetailsResponse,
  TopTraderData,
  TopHolderData,
  EarlyBuyerData,
  WalletCheckerData,
  WalletCheckerFilters,
  Period
} from './AppContext';
import { toast as TOASTNO } from 'react-toastify';
import { useAPI } from '@/hooks/useAPI';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { post } = useAPI();

  
  const [selectedTokens, setSelectedTokens] = useState<string[]>([]);
  const [selectedFunction, setSelectedFunction] = useState<'traders' | 'holders' | 'buyers' | null>(null);

  
  const [walletData, setWalletData] = useState<TableData[]>([]);
  const [topTradersData, setTopTradersData] = useState<TopTraderData[]>([]);
  const [topHoldersData, setTopHoldersData] = useState<TopHolderData[]>([]);
  const [earlyBuyersData, setEarlyBuyersData] = useState<EarlyBuyerData[]>([]);
  const [walletCheckerData, setWalletCheckerData] = useState<WalletCheckerData[]>([]);

  
  const [loading, setLoading] = useState(false);
  const [checkWalletLoading, setCheckWalletLoading] = useState(false);
  const [walletDetailsLoading, setWalletDetailsLoading] = useState(true);

  
  const [walletDetails, setWalletDetails] = useState<WalletDetailsResponse | null>(null);
  const [selectedWalletAddresses, setSelectedWalletAddresses] = useState<string[]>([]);

  
  const [walletCheckerFilters, setWalletCheckerFilters] = useState<WalletCheckerFilters>({
    minPnl: '',
    maxPnl: '',
    minWinrate: '',
    maxWinrate: '',
    minTokens: '',
    maxTokens: '',
    timeframe: '30d'
  });

  
  const [filteredWalletData, setFilteredWalletData] = useState<WalletCheckerData[]>([]);

  
  const addToken = useCallback((token: string) => {
    if (selectedTokens.length >= 20) {
      TOASTNO.warning('Maximum 20 tokens allowed');
      return;
    }
    if (selectedTokens.includes(token)) {
      TOASTNO.info('Token already added');
      return;
    }
    setSelectedTokens(prev => [...prev, token]);
  }, [selectedTokens]);

  const removeToken = useCallback((token: string) => {
    setSelectedTokens(prev => prev.filter(t => t !== token));
  }, []);

  const clearTokens = useCallback(() => {
    setSelectedTokens([]);
  }, []);

  
  // const sortByTopRank = (data: any[]) => {
  //   return [...data].sort((a, b) => {
      
  //     const getTopNumber = (tag: string) => {
  //       if (!tag) return Infinity;  
  //       const match = tag.match(/TOP(\d+)/);
  //       return match ? parseInt(match[1]) : Infinity;
  //     };

  //     const rankA = getTopNumber(a.wallet_tag_v2);
  //     const rankB = getTopNumber(b.wallet_tag_v2);

      
  //     if (rankA !== rankB) {
  //       return rankA - rankB;  
  //     }

      
  //     const profitA = parseFloat(a.profit || a.realized_profit || '0');
  //     const profitB = parseFloat(b.profit || b.realized_profit || '0');
  //     return profitB - profitA;
  //   });
  // };

  
  const fetchTopTraders = useCallback(async (addresses: string[]) => {
    try {
      const response = await post('/top-traders', { addresses });
      if (response.data.success) {
        const limitedData = response.data.data.slice(0, 10);
        setTopTradersData(limitedData);
        setWalletData(limitedData);
      }
      return response.data.data.slice(0, 10);
    } catch (error: any) {
      TOASTNO.error(error?.message || 'Failed to fetch top traders');
      return [];
    }
  }, [post]);

  const fetchTopHolders = useCallback(async (addresses: string[]) => {
    try {
      const response = await post('/top-holders', { addresses });
      if (response.data.success) {
        const limitedData = response.data.data.slice(0, 10);
        setTopHoldersData(limitedData);
        setWalletData(limitedData);
      }
      return response.data.data.slice(0, 10);
    } catch (error: any) {
      TOASTNO.error(error?.message || 'Failed to fetch top holders');
      return [];
    }
  }, [post]);

  const fetchEarlyBuyers = useCallback(async (addresses: string[]) => {
    try {
      const response = await post('/early-buyers', { addresses });
      if (response.data.success) {
        const limitedData = response.data.data.slice(0, 20);
        setEarlyBuyersData(limitedData);
        setWalletData(limitedData);
      }
      return response.data.data.slice(0, 20);
    } catch (error: any) {
      TOASTNO.error(error?.message || 'Failed to fetch early buyers');
      return [];
    }
  }, [post]);

  const fetchWalletChecker = useCallback(async (wallets: string[]) => {
    setCheckWalletLoading(true);
    try {
      const response = await post('/check-wallets', { wallets });
      if (response.data.success) {
        
        // const sortedData = [...response.data.data].sort((a, b) => {
        //   const pnlA = a.wallet_30d.data.pnl;
        //   const pnlB = b.wallet_30d.data.pnl;
        //   return pnlB - pnlA; 
        // });
        setWalletCheckerData(response.data.data);
      }
      return response.data.data;
    } catch (error: any) {
      TOASTNO.error(error?.message || 'Failed to fetch wallet checker data');
      return [];
    } finally {
      setCheckWalletLoading(false);
    }
  }, [post]);

  const fetchWalletData = useCallback(async (selectedFunction: 'traders' | 'holders' | 'buyers', selectedTokens: string[]) => {
    if (!selectedTokens.length || !selectedFunction) return;

    setLoading(true);
    try {
      switch (selectedFunction) {
        case 'traders':
          await fetchTopTraders(selectedTokens);
          break;
        case 'holders':
          await fetchTopHolders(selectedTokens);
          break;
        case 'buyers':
          const buyersData = await fetchEarlyBuyers(selectedTokens);
          setEarlyBuyersData(buyersData);
          break;
      }
    } finally {
      setLoading(false);
    }
  }, [fetchTopTraders, fetchTopHolders, fetchEarlyBuyers]);

  const fetchWalletDetails = useCallback(async (address: string, period: Period = '30d') => {
    setWalletDetailsLoading(true);
    try {
      const response = await post('/wallet-details', { address, period });
      if (response.data.success) {
        setWalletDetails(response.data.data);
      } else {
        throw new Error('Failed to fetch wallet details');
      }
    } catch (error: any) {
      TOASTNO.error(error?.message || 'Failed to fetch wallet details');
    } finally {
      setWalletDetailsLoading(false);
    }
  }, [post]);

  const parseFilterValue = (value: string): number => {
    if (!value) return 0;
    // Remove commas and dots except the last decimal point
    const cleanValue = value.replace(/,/g, '').toLowerCase();
    
    // Handle 'k' suffix
    if (cleanValue.endsWith('k')) {
      return parseFloat(cleanValue.slice(0, -1)) * 1000;
    }
    
    return parseFloat(cleanValue);
  };

  useEffect(() => {
    if (!walletCheckerData.length) {
      setFilteredWalletData([]);
      return;
    }

    const filtered = walletCheckerData.filter(wallet => {
      const data = wallet.wallet_30d;
      const distribution = wallet.distribution_30d;

      if (!data || !distribution) return false;

      const minPnl = parseFilterValue(walletCheckerFilters.minPnl);
      const maxPnl = parseFilterValue(walletCheckerFilters.maxPnl);
      
      // PNL check in USD
      if (walletCheckerFilters.minPnl !== '' && !isNaN(minPnl) && data.data.realized_profit_30d < minPnl) return false;
      if (walletCheckerFilters.maxPnl !== '' && !isNaN(maxPnl) && data.data.realized_profit_30d > maxPnl) return false;

      const minWinrate = parseFloat(walletCheckerFilters.minWinrate);
      const maxWinrate = parseFloat(walletCheckerFilters.maxWinrate);
      const winratePercentage = data.data.winrate * 100;
      if (walletCheckerFilters.minWinrate !== '' && !isNaN(minWinrate) && winratePercentage < minWinrate) return false;
      if (walletCheckerFilters.maxWinrate !== '' && !isNaN(maxWinrate) && winratePercentage > maxWinrate) return false;

      const tokenCount = distribution.data.tokens.length;
      const minTokens = parseFloat(walletCheckerFilters.minTokens);
      const maxTokens = parseFloat(walletCheckerFilters.maxTokens);
      if (walletCheckerFilters.minTokens !== '' && !isNaN(minTokens) && tokenCount < minTokens) return false;
      if (walletCheckerFilters.maxTokens !== '' && !isNaN(maxTokens) && tokenCount > maxTokens) return false;

      return true;
    });

    setFilteredWalletData(filtered);
  }, [walletCheckerData, walletCheckerFilters]);

  return (
    <AppContext.Provider
      value={{
        selectedTokens,
        addToken,
        removeToken,
        clearTokens,
        walletData,
        checkWalletData: walletCheckerData,
        loading,
        selectedFunction,
        setSelectedFunction,
        setWalletData,
        fetchWalletData,
        fetchWalletChecker,
        checkWalletLoading,
        walletDetails,
        fetchWalletDetails,
        walletDetailsLoading,
        topTradersData,
        topHoldersData,
        earlyBuyersData,
        walletCheckerFilters,
        setWalletCheckerFilters,
        filteredWalletData,
        selectedWalletAddresses,
        setSelectedWalletAddresses
      }}>
      {children}
    </AppContext.Provider>
  );
}; 