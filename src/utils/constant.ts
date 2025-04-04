import IMAGES from "./images";

export const API = import.meta.env.VITE_API_URL;
export const NODE_ENV = import.meta.env.VITE_NODE_ENV;

export const APP_ROUTES = {
  LANDING: '/',
  HOME: '/home',
  SAVED_WALLET: '/saved-wallet',

  WALLET_TRACKER: '/wallet-tracker',
} as const;

export const STORAGE_KEYS = {
  THEME: 'theme',
  LANGUAGE: 'language',
} as const;

export const TESTIMONIALS_DATA = [
  {
    id: 1,
    name: "Thomas Philip",
    image: IMAGES.img14,
    text: "This platform is a game changer! The real-time insights and clear categorization of wallets have completely transformed my trading strategy.",
    rating: 5
  },
  {
    id: 2,
    name: "Thomas Philip",
    image: IMAGES.img11,
    text: "This platform is a game changer! The real-time insights and clear categorization of wallets have completely transformed my trading strategy.",
    rating: 5
  },
  {
    id: 3,
    name: "Thomas Philip",
    image: IMAGES.img12,
    text: "This platform is a game changer! The real-time insights and clear categorization of wallets have completely transformed my trading strategy.",
    rating: 5
  },
];

export const TOKEN_ADDRESSES = [
  {
    rank: 1,
    address: "0×12A3...9FCD",
    pnl: "+$120.50",
    winRate: "75%",
    tokens: 35,
    portfolio: "+$120,500",
  },
  {
    rank: 2,
    address: "cryptoWhale.eth",
    pnl: "+$75,300",
    winRate: "70%",
    tokens: 112,
    portfolio: "+$75,300",
  },
  {
    rank: 3,
    address: "0×98BC...4E72",
    pnl: "+$210,000",
    winRate: "68%",
    tokens: 68,
    portfolio: "+$210,000",
  },
  {
    rank: 4,
    address: "defiMaster.eth",
    pnl: "+$8,900",
    winRate: "50%",
    tokens: 50,
    portfolio: "+$8,900",
  },
  {
    rank: 5,
    address: "0xAB45...C901",
    pnl: "+$1,500",
    winRate: "39%",
    tokens: 390,
    portfolio: "+$1,500",
  },
]

export const SAVED_WALLETS = [
  {
    rank: 1,
    address: "0×12A3...9FCD",
    pnl: "+$120.50",
    winRate: "75%",
    tokens: 35,
    portfolio: "+$120,500",
  },
  {
    rank: 2,
    address: "cryptoWhale.eth",
    pnl: "+$75,300",
    winRate: "70%",
    tokens: 112,
    portfolio: "+$75,300",
  },
  {
    rank: 3,
    address: "0×98BC...4E72",
    pnl: "+$210,000",
    winRate: "68%",
    tokens: 68,
    portfolio: "+$210,000",
  },
  {
    rank: 4,
    address: "defiMaster.eth",
    pnl: "+$8,900",
    winRate: "50%",
    tokens: 50,
    portfolio: "+$8,900",
  },
  {
    rank: 5,
    address: "0xAB45...C901",
    pnl: "+$1,500",
    winRate: "39%",
    tokens: 390,
    portfolio: "+$1,500",
  },
]