"use client"
import { useCallback, useState, useEffect } from 'react'
import { Icon } from "@iconify/react"
import { Check, ChevronRight, Copy, X } from "lucide-react"
import AppTable from "@/components/common/AppTable"
import { useApp } from '@/hooks/useApp'
import { EarlyBuyerData, TopHolderData, TopTraderData, WalletCheckerData, WalletCheckerFilters } from '@/contexts/app/AppContext'
import { toast } from 'react-toastify'
import IMAGES from '@/utils/images'

type Column<T> = {
  header: string;
  accessor: keyof T | ((row: T, index?: number) => React.ReactNode);
  className?: string;
}


const Home = () => {
  const {
    selectedTokens,
    addToken,
    removeToken,
    selectedFunction,
    setSelectedFunction,
    fetchWalletData,
    walletData,
    loading,
    setWalletData,
    checkWalletLoading,
    fetchWalletChecker,
    walletCheckerFilters,
    setWalletCheckerFilters,
    filteredWalletData,
    selectedWalletAddresses,
    setSelectedWalletAddresses
  } = useApp();

  const [inputValue, setInputValue] = useState('');


  const [walletCheckerInput, setWalletCheckerInput] = useState('');
  const [copiedAddresses, setCopiedAddresses] = useState<{[key: string]: boolean}>({});

  useEffect(() => {
    setSelectedFunction('traders');
  }, [setSelectedFunction]);

  const copyToClipboard = (e: any, text: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedAddresses({...copiedAddresses, [text]: true});
    toast.success('Address copied to clipboard!');
    
    // Reset the copied state after 2 seconds
    setTimeout(() => {
      setCopiedAddresses(prev => ({...prev, [text]: false}));
    }, 2000);
  };

  const copyAllAddresses = () => {
    let addresses: string[] = [];
     if (filteredWalletData.length > 0) {
      // For wallet checker section, get addresses directly from filteredWalletData
      console.log('filteredWalletData', filteredWalletData);
      addresses = filteredWalletData.map(row => row.wallet_address);
    } else if (selectedFunction === 'buyers') {
      addresses = (walletData as EarlyBuyerData[]).map(row => row.maker);
    } else if (selectedFunction === 'traders' || selectedFunction === 'holders') {
      addresses = (walletData as (TopTraderData | TopHolderData)[]).map(row => row.address);
    }

    if (addresses.length > 0) {
      const addressText = addresses.join('\n');
      navigator.clipboard.writeText(addressText);
      toast.success('All addresses copied to clipboard!');
    }
  };

  const handleSearch = () => {
    if (!selectedFunction) {
      toast.warning('Please select a function first');
      return;
    }
    if (selectedTokens.length === 0) {
      toast.warning('Please add at least one token address');
      return;
    }
    fetchWalletData(selectedFunction, selectedTokens);
  };

  const handleFunctionSelect = (func: 'traders' | 'holders' | 'buyers') => {
    setSelectedFunction(func);
    setWalletData([]);
  };

  const getColumns = useCallback(() => {
    if (selectedFunction === 'buyers') {
      return [
        {
          header: 'Buyer',
          accessor: (row: EarlyBuyerData) => (
            <div className="flex items-center gap-2">
              {row.maker_avatar && (
                <img src={row.maker_avatar} alt={row.maker_name || row.maker} className="w-6 h-6 rounded-full" />
              )}
              <span className="font-mono truncate max-w-[120px]">
                {row.maker_name || row.maker.slice(0, 8)}...
              </span>
              {row.maker_token_tags?.length > 0 && (
                <span className="bg-[#9c46eb] text-xs px-2 py-0.5 rounded">
                  {row.maker_token_tags[0]}
                </span>
              )}
              {copiedAddresses[row.maker] ? (
                <Check
                  color="#828282"
                  strokeWidth={1.5}
                  className="cursor-pointer"
                />
              ) : (
                <Copy
                  color="#828282"
                  strokeWidth={1.5}
                  onClick={(e) => copyToClipboard(e, row.maker)}
                  className="cursor-pointer hover:text-white"
                />
              )}
            </div>
          ),
          className: 'text-left'
        },
        {
          header: 'Amount/USD',
          accessor: (row: EarlyBuyerData) => (
            <div className="flex flex-col">
              <span>${formatNumber(parseFloat(row.amount_usd))}</span>
              <span className="text-xs text-gray-400">
                {formatNumber(parseFloat(row.base_amount))}
              </span>
            </div>
          ),
          className: 'text-left'
        },
        {
          header: 'Price',
          accessor: (row: EarlyBuyerData) => (
            <span>${formatNumber(parseFloat(row.price_usd))}</span>
          ),
          className: 'text-left'
        },
        {
          header: 'History Bought/Sold',
          accessor: (row: EarlyBuyerData) => (
            <div className="flex flex-col">
              <span>{formatNumber(parseFloat(row.history_bought_amount))}</span>
              <span className="text-xs text-gray-400">
                {formatNumber(parseFloat(row.history_sold_amount))}
              </span>
            </div>
          ),
          className: 'text-left'
        },
        {
          header: 'Realized Profit',
          accessor: (row: EarlyBuyerData) => {
            const profit = parseFloat(row.realized_profit);
            return (
              <span className={profit >= 0 ? 'text-[#42d578]' : 'text-[#ea3921]'}>
                ${formatNumber(profit)}
              </span>
            );
          },
          className: 'text-left'
        },
        {
          header: 'Unrealized Profit',
          accessor: (row: EarlyBuyerData) => {
            const profit = parseFloat(row.unrealized_profit);
            return (
              <span className={profit >= 0 ? 'text-[#42d578]' : 'text-[#ea3921]'}>
                ${formatNumber(profit)}
              </span>
            );
          },
          className: 'text-left'
        },
        {
          header: 'Total Trades',
          accessor: (row: EarlyBuyerData) => formatNumber(parseFloat(row.total_trade.toString())),
          className: 'text-left'
        },
        {
          header: 'Time',
          accessor: (row: EarlyBuyerData) => formatTimeAgo(parseInt(row.timestamp)),
          className: 'text-left'
        }
      ];
    }

    const formatSolBalance = (balance: string | number) => {
      if (!balance) return '0';
      const num = typeof balance === 'string' ? parseFloat(balance) : balance;
      if (isNaN(num)) return '0';
      return (num / 1000000000).toFixed(2) === '0.00' ? '0' : (num / 1000000000).toFixed(2);
    };

    const baseColumns: Column<TopTraderData | TopHolderData>[] = [
      {
        header: 'Trader',
        accessor: (row) => (
          <div className="flex items-center gap-2">
            {row.avatar && (
              <img src={row.avatar} alt={row.name || row.address} className="w-6 h-6 rounded-full" />
            )}
            <span className="font-mono truncate w-[300px]">
              {row.name || row.address}...
            </span>
            {copiedAddresses[row.address] ? (
              <Check
                color="#828282"
                strokeWidth={1.5}
                className="cursor-pointer"
              />
            ) : (
              <Copy
                color="#828282"
                strokeWidth={1.5}
                onClick={(e) => copyToClipboard(e, row.address)}
                className="cursor-pointer hover:text-white"
              />
            )}
          </div>
        ),
        className: 'text-left'
      },
      {
        header: 'SOL Bal/Age',
        accessor: (row) => (
          <div className="flex flex-col">
            <span>{formatSolBalance(row.sol_balance)}</span>
            <span className="text-xs text-gray-400">
              {parseInt(row.created_at) ? formatTimeAgo(parseInt(row.created_at)) : '--'}
            </span>
          </div>
        ),
        className: 'text-left'
      },
      {
        header: 'Source/TF Time',
        accessor: (row) => (
          <div className="flex flex-col w-[100px] ">
            <span className="truncate text-base">{row.native_transfer?.name || row.native_transfer?.from_address || '--'}</span>
            <span className="text-xs text-gray-400">
              {parseInt(row.last_active_timestamp) ? formatTimeAgo(parseInt(row.last_active_timestamp)) : '--'}
            </span>
          </div>
        ),
        className: 'text-left'
      },
      {
        header: 'Bought',
        accessor: (row) => (
          <div className="flex flex-col">
            <span>${formatNumber(parseFloat(row.buy_volume_cur))}</span>
            <span className="text-xs text-gray-400">
              {formatNumber(parseFloat(row.buy_amount_cur))}
            </span>
          </div>
        ),
        className: 'text-left'
      },
      {
        header: 'Sold',
        accessor: (row) => (
          <div className="flex flex-col">
            <span>${formatNumber(parseFloat(row.sell_volume_cur))}</span>
            <span className="text-xs text-gray-400">
              {formatNumber(parseFloat(row.sell_amount_cur))}
            </span>
          </div>
        ),
        className: 'text-left'
      },
      {
        header: 'Pnl/USD',
        accessor: (row) => {
          const profit = parseFloat(row.profit);
          const profitChange = parseFloat(row.profit_change);
          return (
            <div className={`flex flex-col ${profit >= 0 ? 'text-[#42d578]' : 'text-[#ea3921]'}`}>
              <span>${formatNumber(profit)}</span>
              <span className="text-xs">
                {profitChange > 0 ? '+' : ''}{(profitChange * 100).toFixed(2)}%
              </span>
            </div>
          );
        },
        className: 'text-left'
      },
      {
        header: 'Realized',
        accessor: (row) => {
          const realizedProfit = parseFloat(row.realized_profit);
          return (
            <span className={realizedProfit >= 0 ? 'text-[#42d578]' : 'text-[#ea3921]'}>
              ${formatNumber(realizedProfit)}
            </span>
          );
        },
        className: 'text-left'
      },
      {
        header: 'Unrealized',
        accessor: (row) => {
          const unrealizedProfit = parseFloat(row.unrealized_profit);
          return (
            <span className={unrealizedProfit >= 0 ? 'text-[#42d578]' : 'text-[#ea3921]'}>
              ${formatNumber(unrealizedProfit)}
            </span>
          );
        },
        className: 'text-left'
      },
      {
        header: 'Holding Duration',
        accessor: (row) => {
          const start = parseInt(row.start_holding_at);
          const end = parseInt(row.end_holding_at);
          return start && end ? formatDuration(end - start) : '--';
        },
        className: 'text-left'
      },
      {
        header: 'Avg Cost/Sold',
        accessor: (row) => (
          <div className="flex flex-col">
            <span>${parseFloat(row.avg_cost) ? formatNumber(parseFloat(row.avg_cost)) : '--'}</span>
            <span className="text-xs text-gray-400">
              ${parseFloat(row.avg_sold) ? formatNumber(parseFloat(row.avg_sold)) : '--'}
            </span>
          </div>
        ),
        className: 'text-left'
      },
      {
        header: 'Last Active',
        accessor: (row) => parseInt(row.last_active_timestamp) ? formatTimeAgo(parseInt(row.last_active_timestamp)) : '--',
        className: 'text-left'
      }
    ];

    return baseColumns;
  }, [selectedFunction]);


  const formatNumber = (num: number) => {
    if (isNaN(num) || num === null || num === undefined) return '--';
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(num);
  };

  const formatTimeAgo = (timestamp: number) => {
    if (!timestamp) return '--';
    const now = Date.now();
    const diff = now - timestamp * 1000;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d`;
    if (hours > 0) return `${hours}h`;
    return `${minutes}m`;
  };

  const formatDuration = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return '--';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) return `${hours}h`;
    return `${minutes}m`;
  };

  const walletCheckerColumns = [
    {
      header: 'Address',
      accessor: (row: WalletCheckerData) => {
        const data = row.wallet_7d.data;
        const address = row.wallet_address;

        return (
          <div className="flex items-center gap-2">
            {data.avatar && (
              <img src={data.avatar} alt="" className="w-6 h-6 rounded-full" />
            )}
            <span className="font-mono truncate max-w-[120px]">
              {address.slice(0, 8)}...{address.slice(-6)}
            </span>
            {data.tags?.length > 0 && (
              <span className="bg-[#9c46eb] text-xs px-2 py-0.5 rounded">
                {data.tags[0]}
              </span>
            )}
            {copiedAddresses[address] ? (
              <Check
                color="#828282"
                strokeWidth={1.5}
                className="cursor-pointer"
              />
            ) : (
              <Copy
                color="#828282"
                strokeWidth={1.5}
                onClick={(e) => copyToClipboard(e, address)}
                className="cursor-pointer hover:text-white"
              />
            )}
          </div>
        );
      },
      className: 'text-left'
    },
    {
      header: 'PnL/USD',
      accessor: (row: WalletCheckerData) => {
        const data = row.wallet_7d.data;
        const pnl = data.total_value;
        return (
          <div className={`flex flex-col ${pnl >= 0 ? 'text-[#42d578]' : 'text-[#ea3921]'}`}>
            <span>{pnl !== undefined && pnl !== null ? `${pnl >= 0 ? '$' : '-$'}${formatNumber(Math.abs(pnl))}` : '--'}</span>
          </div>
        );
      },
      className: 'text-left'
    },
    {
      header: 'Win Rate',
      accessor: (row: WalletCheckerData) => {
        const data = row.wallet_7d.data;
        const winrate = data.winrate;
        return (
          <div className="flex flex-col">
            <span className={winrate >= 0.5 ? 'text-[#42d578]' : 'text-[#ea3921]'}>
              {(winrate * 100).toFixed(2)}%
            </span>
          </div>
        );
      },
      className: 'text-left'
    },
    {
      header: 'Tokens',
      accessor: (row: WalletCheckerData) => {
        const tokenCount = row.distribution_7d.data.tokens.length;
        return tokenCount;
      },
      className: 'text-left'
    },
    {
      header: 'Realized P.',
      accessor: (row: WalletCheckerData) => {
        const data = row.wallet_7d.data;
        const profit = data.realized_profit_7d;
        return (
          <span className={profit >= 0 ? 'text-[#42d578]' : 'text-[#ea3921]'}>
            {profit >= 0 ? '$' : '-$'}{formatNumber(Math.abs(profit))}
          </span>
        );
      },
      className: 'text-left'
    },
    {
      header: 'Unrealized P.',
      accessor: (row: WalletCheckerData) => {
        const data = row.wallet_7d.data;
        const profit = data.unrealized_profit;
        return (
          <span className={profit >= 0 ? 'text-[#42d578]' : 'text-[#ea3921]'}>
            {profit >= 0 ? '$' : '-$'}{formatNumber(Math.abs(profit))}
          </span>
        );
      },
      className: 'text-left'
    },
    {
      header: 'Last Active',
      accessor: (row: WalletCheckerData) => {
        const timestamp = row.wallet_7d.data.last_active_timestamp;
        return formatTimeAgo(timestamp);
      },
      className: 'text-left'
    }
  ]

  const functionButtons = [
    {
      id: 'traders',
      label: 'Top 10 Traders',
      gradient: 'from-[#582885] to-[#9c46eb]'
    },
    {
      id: 'holders',
      label: 'Top 10 Holders',
      gradient: 'from-[#2a5ad7] to-[#3676ef]'
    },
    {
      id: 'buyers',
      label: 'First 20 Buyers',
      gradient: 'from-[#582885] to-[#9c46eb]'
    }
  ] as const;


  const handleWalletCheckerSearch = () => {
    if (selectedWalletAddresses.length === 0) {
      toast.warning('Please add at least one wallet address');
      return;
    }
    fetchWalletChecker(selectedWalletAddresses);
  };


  const handleFilterChange = (key: keyof WalletCheckerFilters, value: string) => {
    setWalletCheckerFilters({
      ...walletCheckerFilters,
      [key]: value
    });
  };

  const formatPnlInput = (value: string): string => {
    if (!value) return '';
    // If it ends with 'k', keep it as is
    if (value.toLowerCase().endsWith('k')) return value;
    // Try to parse the number
    const num = parseFloat(value.replace(/,/g, ''));
    if (isNaN(num)) return '';
    // Format with commas for thousands
    return num.toLocaleString('en-US');
  };

  const handlePnlChange = (key: 'minPnl' | 'maxPnl', value: string) => {
    // Allow empty input
    if (!value) {
      handleFilterChange(key, '');
      return;
    }
    
    // Remove existing commas and validate
    const cleanValue = value.replace(/,/g, '').toLowerCase();
    
    // Allow 'k' suffix
    if (cleanValue.endsWith('k') || /^\d*\.?\d*$/.test(cleanValue)) {
      handleFilterChange(key, cleanValue);
    }
  };

  return (
    <>
      <section className="container mx-auto px-4 sm:px-6 lg:px-16 py-8 sm:py-12 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 text-center md:text-start flex flex-col items-center lg:items-start">
          <p className="text-[#9c46eb] mb-2 uppercase tracking-wider text-base sm:text-lg">FOLLOW THE MONEY</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-l from-white from-80% to-[#272626] bg-clip-text text-transparent md:text-5xl leading-tight md:leading-[64px] mt-2">Find the top 0.1% Traders</h2>
          <p className="text-[#aeacac] mb-6 max-w-xl text-base sm:text-lg leading-relaxed">
            For the first time, you can seamlessly search through multiple coins and gather Top Traders, Top Holders and
            Early Buyers or insiders, then filter them based on your preferred criterias (PNL, Winrate, Tokens Traded)
          </p>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="h-8 w-8 sm:h-10 sm:w-10 cursor-pointer rounded-full bg-[#2a2a2a] border-2 border-[#050510] flex items-center justify-center overflow-hidden"
                >
                  <img src={IMAGES[`avatar${i}` as keyof typeof IMAGES]} alt={`User ${i}`} width={40} height={40} />
                </div>
              ))}
            </div>
            <div className="text-sm sm:text-base">
              <p className="font-bold">350+</p>
              <p className="text-[#7b7a7a]">Followers</p>
            </div>
            <Icon icon={'prime:twitter'} className="sm:h-[43px] sm:w-[43px] cursor-pointer" />
          </div>

          <div className="inline-block bg-[#9c46eb]/[32%] rounded-full px-4 sm:px-5 py-2 sm:py-2.5 text-sm sm:text-base text-[#AEACAC]">
            CA: $ZYRA Token Not Launched Yet
          </div>
        </div>

        <div className="flex-1 flex justify-center mt-6 md:mt-0">
          <div className="relative h-[200px] w-[200px] sm:h-[300px] sm:w-[300px] md:h-[350px] md:w-[350px] lg:h-[400px] lg:w-[400px]">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#9c46eb]/30 to-transparent rounded-full"></div>
            <img src={IMAGES.img7} alt="Zyra Agent" className="rounded-full object-cover w-full h-full" />
          </div>
        </div>
      </section>

      <section className="container relative mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-2">Utilize Zyra Agent</h2>
        <p className="text-[#aeacac] text-center mb-6 sm:mb-8 text-base sm:text-lg">
          Choose what type of wallets you want to gather, then enter one or more token addresses to get them from
        </p>

        <div className="flex flex-col lg:flex-row gap-4 justify-around mb-8 sm:mb-12 px-1 lg:px-24">
          {functionButtons.map((button) => (
            <button
              key={button.id}
              onClick={() => handleFunctionSelect(button.id)}
              disabled={loading}
              className={`text-center py-2.5 sm:py-3.5 rounded-md px-10 text-base sm:text-lg font-medium transition
                ${selectedFunction === button.id
                  ? `bg-gradient-to-r ${button.gradient} text-white`
                  : loading
                    ? 'bg-[#2a2a2a] text-[#aeacac] opacity-50 cursor-not-allowed'
                    : 'bg-[#442561] text-[#aeacac] hover:bg-[#301C43]'
                }`}
            >
              {button.label}
            </button>
          ))}
        </div>

        <div className="lg:px-2">
          <h3 className="text-xl sm:text-2xl text-center font-medium mb-3 sm:mb-4">
            Enter up to 20 Token Addresses
          </h3>

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter a list of token addresses (comma separated or 1 per line)"
                  className="w-full bg-transparent border border-[#9c46eb]/[70%] rounded-lg py-3 sm:py-4 px-4 sm:px-5 focus:outline-none focus:ring-1 focus:ring-[#9c46eb] text-base sm:text-lg"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const tokens = e.currentTarget.value
                        .split(/[,\s\n]+/)
                        .map(token => token.trim())
                        .filter(Boolean);

                      tokens.forEach(token => {
                        if (selectedTokens.length < 20) {
                          addToken(token);
                        }
                      });
                      setInputValue('');
                    }
                  }}
                />
              </div>
              <button
                onClick={handleSearch}
                disabled={loading || selectedTokens.length === 0}
                className={`px-6 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-medium transition
                  ${loading
                    ? 'bg-[#2a2a2a] text-[#aeacac] opacity-50 cursor-not-allowed'
                    : selectedTokens.length === 0
                      ? 'bg-[#2a2a2a] text-[#aeacac] opacity-50 cursor-not-allowed'
                      : 'bg-gradient-to-r from-[#582885] to-[#9c46eb] text-white hover:opacity-90'
                  }`}
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>

            {selectedTokens.length > 0 && (
              <div className="flex flex-wrap gap-2 max-h-[92px] overflow-y-auto">
                {selectedTokens.map((token, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-[#2a2a2a] px-3 py-1.5 rounded-full w-full lg:w-fit justify-between"
                  >
                    <span className="text-sm truncate">{token}</span>
                    <X
                      className="h-4 w-4 min-w-4 cursor-pointer hover:text-red-500"
                      onClick={() => removeToken(token)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#9c46eb]"></div>
            </div>
          ) : (
            <>
              {selectedFunction === 'buyers' && walletData.length > 0 && (
                <AppTable
                  columns={getColumns() as Column<EarlyBuyerData>[]}
                  data={walletData as EarlyBuyerData[]}
                  pagination={true}
                  itemsPerPage={10}
                  className="mt-8"
                />
              )}
              {(selectedFunction === 'traders' || selectedFunction === 'holders') && walletData.length > 0 && (
                <AppTable
                  columns={getColumns() as Column<TopTraderData | TopHolderData>[]}
                  data={walletData as (TopTraderData | TopHolderData)[]}
                  pagination={true}
                  itemsPerPage={10}
                  className="mt-8"
                />
              )}
            </>
          )}

          {walletData.length > 0 && (
            <div className="flex justify-center mt-8">
              <button 
                onClick={copyAllAddresses}
                className="text-center bg-gradient-to-r from-[#582885] to-[#9c46eb] text-white px-6 sm:px-10 py-2.5 sm:py-3 rounded-full flex items-center gap-2 text-base sm:text-lg font-medium hover:opacity-90"
              >
                Copy all to Clipboard
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ================================================================================================================================================================================ */}

      <section className="container relative mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-2">Wallet Checker</h2>
        <p className="text-[#aeacac] text-center mb-6 sm:mb-8 text-base sm:text-lg">
          Now that you have plenty of wallets, filter the ones that qualify your criteria.
        </p>

        <div className="grid grid-cols-2 gap-4 mb-12 px-1 lg:px-[200px]">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-400">Min PNL ($)</label>
            <div className="relative">
              <input
                type="text"
                value={formatPnlInput(walletCheckerFilters.minPnl)}
                onChange={(e) => handlePnlChange('minPnl', e.target.value)}
                placeholder="e.g. 100,000 or 100k"
                className="w-full bg-transparent border border-[#9c46eb]/[70%] rounded-lg py-2 px-3 outline-none"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">USD</span>
            </div>
            <p className="text-xs text-gray-500">Enter value in USD (e.g. 100,000 or 100k)</p>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-400">Max PNL ($)</label>
            <div className="relative">
              <input
                type="text"
                value={formatPnlInput(walletCheckerFilters.maxPnl)}
                onChange={(e) => handlePnlChange('maxPnl', e.target.value)}
                placeholder="e.g. 100,000 or 100k"
                className="w-full bg-transparent border border-[#9c46eb]/[70%] rounded-lg py-2 px-3 outline-none"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">USD</span>
            </div>
            <p className="text-xs text-gray-500">Enter value in USD (e.g. 100,000 or 100k)</p>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-400">Min Winrate (%)</label>
            <input
              type="number"
              value={walletCheckerFilters.minWinrate}
              onChange={(e) => handleFilterChange('minWinrate', e.target.value)}
              placeholder="Min Winrate"
              className="bg-transparent border border-[#9c46eb]/[70%] rounded-lg py-2 px-3 outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-400">Max Winrate (%)</label>
            <input
              type="number"
              value={walletCheckerFilters.maxWinrate}
              onChange={(e) => handleFilterChange('maxWinrate', e.target.value)}
              placeholder="Max Winrate"
              className="bg-transparent border border-[#9c46eb]/[70%] rounded-lg py-2 px-3 outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-400">Min Tokens</label>
            <input
              type="number"
              value={walletCheckerFilters.minTokens}
              onChange={(e) => handleFilterChange('minTokens', e.target.value)}
              placeholder="Min Tokens"
              className="bg-transparent border border-[#9c46eb]/[70%] rounded-lg py-2 px-3 outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-400">Max Tokens</label>
            <input
              type="number"
              value={walletCheckerFilters.maxTokens}
              onChange={(e) => handleFilterChange('maxTokens', e.target.value)}
              placeholder="Max Tokens"
              className="bg-transparent border border-[#9c46eb]/[70%] rounded-lg py-2 px-3 outline-none"
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 mb-12">
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Enter a list of wallet addresses (comma separated or 1 per line)"
              className="w-full bg-transparent border border-[#9c46eb]/[70%] rounded-lg py-3 px-4 focus:outline-none focus:ring-1 focus:ring-[#9c46eb]"
              value={walletCheckerInput}
              onChange={(e) => setWalletCheckerInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {

                  const addresses: string[] = e.currentTarget.value
                    .split(/[,\s\n]+/)
                    .map(addr => addr.trim())
                    .filter(Boolean);

                  setSelectedWalletAddresses([...selectedWalletAddresses, ...addresses]);
                  setWalletCheckerInput('');
                }
              }}
            />
            <button
              onClick={handleWalletCheckerSearch}
              disabled={checkWalletLoading || selectedWalletAddresses.length === 0}
              className={`px-6 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-medium transition
                ${checkWalletLoading
                  ? 'bg-[#2a2a2a] text-[#aeacac] opacity-50 cursor-not-allowed'
                  : selectedWalletAddresses.length === 0
                    ? 'bg-[#2a2a2a] text-[#aeacac] opacity-50 cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#582885] to-[#9c46eb] text-white hover:opacity-90'
                }`}
            >
              {checkWalletLoading ? 'Checking...' : 'Check'}
            </button>
          </div>

          {selectedWalletAddresses.length > 0 && (
            <div className="flex flex-wrap gap-2 max-h-[92px] overflow-y-auto">
              {selectedWalletAddresses.map((address, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-[#2a2a2a] px-3 py-1.5 rounded-full w-full lg:w-fit justify-between"
                >
                  <span className="text-sm truncate">{address}</span>
                  <X
                    className="h-4 w-4 min-w-4 cursor-pointer hover:text-red-500"
                    onClick={() => {
                      setSelectedWalletAddresses([...selectedWalletAddresses].filter((addr: string) => addr !== address));
                      
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        {
          checkWalletLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#9c46eb]"></div>
            </div>
          ) : (
            filteredWalletData.length > 0 && (
              <>
                <AppTable
                  columns={walletCheckerColumns as Column<WalletCheckerData>[]}
                  data={filteredWalletData}
                  pagination={true}
                  itemsPerPage={10}
                  className="mt-8"
                  selectedWalletAddresses={selectedWalletAddresses}
                />
                <div className="flex justify-center mt-8">
                  <button 
                    onClick={copyAllAddresses}
                    className="text-center bg-gradient-to-r from-[#582885] to-[#9c46eb] text-white px-6 sm:px-10 py-2.5 sm:py-3 rounded-full flex items-center gap-2 text-base sm:text-lg font-medium hover:opacity-90"
                  >
                    Copy all to Clipboard
                    <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                </div>
              </>
            )
          )
        }
      </section>
    </>
  )
}

export default Home