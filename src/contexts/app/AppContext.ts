import { createContext } from 'react';


export type TopTraderData = {
  "account_address": string,
  "accu_amount": string,
  "accu_cost": string,
  "addr_type": string,
  "address": string,
  "amount_cur": string,
  "amount_percentage": string,
  "avatar": string | null,
  "avg_cost": string,
  "avg_sold": string,
  "balance": string,
  "buy_amount_cur": string,
  "buy_tx_count_cur": string,
  "buy_volume_cur": string,
  "cost": string,
  "cost_cur": string,
  "created_at": string,
  "end_holding_at": string,
  "eth_balance": string,
  "is_new": boolean,
  "is_suspicious": boolean,
  "last_active_timestamp": string,
  "maker_token_tags": string[],
  "name": string | null,
  "native_transfer": {
    "from_address": string,
    "name": string | null,
    "timestamp":string
  },
  "netflow_amount":string,
  "netflow_usd":string,
  "profit":string,
  "profit_change":string,
  "realized_profit":string,
  "sell_amount_cur":string,
  "sell_amount_percentage":string,
  "sell_tx_count_cur":string,
  "sell_volume_cur":string,
  "sol_balance":string,
  "start_holding_at":string,
  "tag_rank": any,
  "tags": string[],
  "total_cost": string,
  "transfer_in": boolean,
  "trx_balance": string,
  "twitter_name": string | null,
  "twitter_username": string | null,
  "unrealized_pnl": string | null,
  "unrealized_profit": string,
  "usd_value": string,
  "wallet_tag_v2": string
}
export type TopHolderData = {
  "account_address": string,
  "accu_amount": string,
  "accu_cost": string,
  "addr_type": string,
  "address": string,
  "amount_cur": string,
  "amount_percentage": string,
  "avatar": string | null,
  "avg_cost": string,
  "avg_sold": string,
  "balance": string,
  "buy_amount_cur": string,
  "buy_tx_count_cur": string,
  "buy_volume_cur": string,
  "cost": string,
  "cost_cur": string,
  "created_at": string,
  "end_holding_at": string,
  "eth_balance": string,
  "is_new": boolean,
  "is_suspicious": boolean,
  "last_active_timestamp": string,
  "maker_token_tags": string[],
  "name": string | null,
  "native_transfer": {
    "from_address": string,
    "name": string | null,
    "timestamp":string
  },
  "netflow_amount":string,
  "netflow_usd":string,
  "profit":string,
  "profit_change":string,
  "realized_profit":string,
  "sell_amount_cur":string,
  "sell_amount_percentage":string,
  "sell_tx_count_cur":string,
  "sell_volume_cur":string,
  "sol_balance":string,
  "start_holding_at":string,
  "tag_rank": any,
  "tags": string[],
  "total_cost": string,
  "transfer_in": boolean,
  "trx_balance": string,
  "twitter_name": string | null,
  "twitter_username": string | null,
  "unrealized_pnl": string | null,
  "unrealized_profit": string,
  "usd_value": string,
  "wallet_tag_v2": string
}

export type EarlyBuyerData = {
  "amount_usd":string,
  "balance":string,
  "base_amount":string,
  "event":string,
  "history_bought_amount":string,
  "history_sold_amount":string,
  "history_sold_income":string,
  "id":string,
  "is_open_or_close":string,
  "maker":string,
  "maker_avatar":string,
  "maker_ens":string,
  "maker_name":string,
  "maker_tags": string[],
  "maker_token_tags": string[],
  "maker_twitter_name":string,
  "maker_twitter_username":string,
  "price_usd":string,
  "quote_address":string,
  "quote_amount":string,
  "quote_symbol":string,
  "realized_profit":string,
  "timestamp":string,
  "token_address":string,
  "total_trade":string,
  "tx_hash":string,
  "unrealized_profit":string
}

export type TokenDistributionData = {
  address: string;
  logo: string;
  name: string;
  realized_pnl: string;
  symbol: string;
  total_profit: string;
  total_profit_pnl: string;
  total_profit_ratio: string;
}

export type DistributionResponse = {
  code: string;
  data: {
    profit_ratio: string | null;
    tokens: TokenDistributionData[];
    total: string | null;
  };
  msg: string;
}

export type WalletPeriodData = {
  code: string;
  data: WalletDashboardData;
  msg: string;
}

export type WalletCheckerData = {
  distribution_30d: DistributionResponse;
  distribution_7d: DistributionResponse;
  wallet_30d: WalletPeriodData;
  wallet_7d: WalletPeriodData;
  wallet_address: string;
}

export type TokenDistribution = {
  distribution: {
    [key: string]: string;
  };
  total: number;
}

export type CheckWalletDataType = {
  "Last Active": string;
  "Link": string;
  "PnL 30d": string;
  "PnL 7d": string;
  "PnL 7d Value": string;
  "Realized Profit": string;
  "SOL Balance": string;
  "Token Distribution 30d": TokenDistribution | null;
  "Token Distribution 7d": TokenDistribution | null;
  "Trading Volume 30d": number;
  "Wallet Address": string;
  "Winrate": string;
  "Winrate 30d": string;
}

export type TableData = TopTraderData | TopHolderData | EarlyBuyerData ;


export type WalletCheckerFilters = {
  minPnl: string;
  maxPnl: string;
  minWinrate: string;
  maxWinrate: string;
  minTokens: string;
  maxTokens: string;
  timeframe: '7d' | '30d';
}


export type TokenInfo = {
  address: string;
  token_address: string;
  symbol: string;
  name: string;
  decimals: number;
  logo: string;
  price_change_6h: string;
  is_show_alert: boolean;
  is_honeypot: boolean | null;
}

export type HoldingData = {
  "avg_cost": string,
  "avg_sold": string,
  "balance": string,
  "buy_30d": string,
  "cost": string,
  "end_holding_at": string,
  "history_bought_cost": string,
  "history_sold_income": string,
  "last_active_timestamp": string,
  "liquidity": string,
  "position_percent": string,
  "price": string,
  "realized_pnl": string,
  "realized_pnl_30d": string,
  "realized_profit": string,
  "realized_profit_30d": string,
  "sell_30d": string,
  "sells": string,
  "start_holding_at": string,
  "token": {
    "address": string,
    "decimals": string,
    "is_honeypot": boolean | null,
    "is_show_alert": boolean,
    "logo": string,
    "name": string,
    "price_change_6h": string,
    "symbol": string,
    "token_address": string
  },
  "total_profit": string,
  "total_profit_pnl": string,
  "total_supply": string,
  "unrealized_pnl": string,
  "unrealized_profit": string,
  "usd_value": string,
  "wallet_token_tags": string[] | null
}

export type RiskData = {
  token_active: number;
  token_honeypot: number;
  token_honeypot_ratio: number;
  no_buy_hold: number;
  no_buy_hold_ratio: number;
  sell_pass_buy: number;
  sell_pass_buy_ratio: number;
  fast_tx: number;
  fast_tx_ratio: number;
}

export type TagRank = {
  kol: number;
  trojan: number;
}

export type WalletDashboardData = {
  buy: number;
  buy_1d: number;
  buy_7d: number;
  buy_30d: number;
  sell: number;
  sell_1d: number;
  sell_7d: number;
  sell_30d: number;
  pnl: number;
  pnl_1d: number;
  pnl_7d: number;
  pnl_30d: number;
  all_pnl: number;
  realized_profit: number;
  realized_profit_1d: number;
  realized_profit_7d: number;
  realized_profit_30d: number;
  unrealized_profit: number;
  unrealized_pnl: number;
  total_profit: number;
  total_profit_pnl: number;
  balance: string;
  eth_balance: string;
  sol_balance: string;
  trx_balance: string;
  bnb_balance: string;
  total_value: number;
  winrate: number;
  token_sold_avg_profit: number;
  history_bought_cost: number;
  token_avg_cost: number;
  token_num: number;
  profit_num: number;
  pnl_lt_minus_dot5_num: number;
  pnl_minus_dot5_0x_num: number;
  pnl_lt_2x_num: number;
  pnl_2x_5x_num: number;
  pnl_gt_5x_num: number;
  bind: boolean;
  avatar: string;
  name: string;
  ens: string;
  tags: string[];
  tag_rank: TagRank;
  twitter_name: string;
  twitter_username: string;
  twitter_bind: boolean;
  twitter_fans_num: number;
  followers_count: number;
  is_contract: boolean;
  last_active_timestamp: number;
  risk: RiskData;
  avg_holding_peroid: number;
  updated_at: number;
  refresh_requested_at: number | null;
}

export type Period = '1d' | '7d' | '30d' | 'all';

export type WalletDetailsResponse = {
  holdings: HoldingData[];
  recent: HoldingData[];
  dashboard: WalletDashboardData;
}

interface AppContextType {
  selectedTokens: string[];
  addToken: (token: string) => void;
  removeToken: (token: string) => void;
  clearTokens: () => void;

  walletData: TableData[];
  checkWalletData: WalletCheckerData[];
  loading: boolean;
  selectedFunction: 'traders' | 'holders' | 'buyers' | null;
  setSelectedFunction: (func: 'traders' | 'holders' | 'buyers' | null) => void;
  setWalletData: (data: TableData[]) => void;
  fetchWalletData: (selectedFunction: 'traders' | 'holders' | 'buyers', selectedTokens: string[]) => Promise<void>;
  fetchWalletChecker: (selectedWalletAddresses: string[]) => void;
  checkWalletLoading: boolean;
  walletDetails: WalletDetailsResponse | null;
  fetchWalletDetails: (address: string, period: Period) => Promise<void>;
  walletDetailsLoading: boolean;
  topTradersData: TopTraderData[];
  topHoldersData: TopHolderData[];
  earlyBuyersData: EarlyBuyerData[];
  walletCheckerFilters: WalletCheckerFilters;
  setWalletCheckerFilters: (filters: WalletCheckerFilters) => void;
  filteredWalletData: WalletCheckerData[];
  selectedWalletAddresses: string[];
  setSelectedWalletAddresses: (addresses: string[]) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined); 