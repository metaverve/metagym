import Web3 from 'web3';
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletImage } from '../../assets/image';

const web3 = new Web3();

export const injected = new InjectedConnector({
  supportedChainIds: [1, 56, 97, 61, 820, 20729],
});

export const connectors = [
  {
    title: 'Metamask',
    connectorId: 'injected',
    icon: WalletImage.MetaMask,
    priority: 1,
  },
  {
    title: 'WalletConnect',
    connectorId: 'walletconnect',
    icon: WalletImage.WalletConnect,
    priority: 2,
  },
  {
    title: 'Trust Wallet',
    connectorId: 'injected',
    icon: WalletImage.TrustWallet,
    priority: 3,
  },
];

export const chains = {
  ETH: {
    chainName: 'Ethereum Mainnet',
    chainId: web3.utils.toHex(1),
    nativeCurrency: { name: 'Ethereum', decimals: 18, symbol: 'ETH' },
    rpcUrls: ['https://mainnet.infura.io/v3/'],
  },
  BSC: {
    chainName: 'Binance Smart Chain Mainnet',
    chainId: web3.utils.toHex(56),
    nativeCurrency: { name: 'BNB', decimals: 18, symbol: 'BNB' },
    rpcUrls: ['https://bsc-dataseed1.binance.org'],
  },
  ETC: {
    chainName: 'Ethereum Classic Mainnet',
    chainId: web3.utils.toHex(61),
    nativeCurrency: { name: 'Ethereum Classic', decimals: 18, symbol: 'ETC' },
    rpcUrls: ['https://www.ethercluster.com/etc'],
  },
};
