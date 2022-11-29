import React from 'react';
import Web3 from 'web3';
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector';
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';
import { UserRejectedRequestError as UserRejectedRequestErrorFrame } from '@web3-react/frame-connector';
import { injected, connectors } from './connectors';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Button, Typography, Box, Alert } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useEagerConnect, useInactiveListener } from '../../hooks/wallet-connect';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content',
  },
  avatar: {
    width: 64,
    height: 64,
    fontSize: '3rem',
  },
  name: {
    marginTop: '15px',
  },
}));

const ConnectWallet = ({ className, showAvatar = false, user, ...restOfProps }) => {
  const classes = useStyles();

  const triedEager = useEagerConnect();
  useInactiveListener(!triedEager);

  const { activate, account, chainId, error } = useWeb3React();
  const [network, setNetwork] = React.useState('');
  const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };


  React.useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('networkChanged', () => {
        handleConnectWallet();
      });
    }
  });

  React.useEffect(() => {
    switch (chainId) {
      case 1:
        setNetwork('ETH');
        break;
      case 56:
        setNetwork('BSC');
        break;
      case 97:
        setNetwork('BSC');
        break;
      default:
        break;
    }
  }, [chainId]);

  React.useEffect(() => {
    async function getBalances() {
      window.web3 = new Web3(window.ethereum);
      await window.web3.eth.getBalance(account);
    }

    if (account) {
      getBalances();
    }
  }, [account, network]);

  const handleConnectWallet = async () => {
    await activate(injected);
    handleClose();
  };

  const getErrorMessage = (error) => {
    if (error instanceof NoEthereumProviderError) {
      return 'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.';
    } else if (error instanceof UnsupportedChainIdError) {
      return "You're connected to an unsupported network.";
    } else if (error instanceof UserRejectedRequestErrorInjected || error instanceof UserRejectedRequestErrorFrame) {
      return 'Please authorize this website to access your account.';
    } else {
      console.error(error);
      return 'An unknown error occurred. Check the console for more details.';
    }
  };

  return (
    <div {...restOfProps} className={clsx(classes.root, className)}>
      <Box p={1} height={`100%`}>
        {account ? (
          <Box
            height={`100%`}
            display={`flex`}
            flexDirection={`column`}
            alignItems={`center`}
            justifyContent={`center`}
            gap={3}
          >
            <Box display={`flex`} flexDirection={`column`} alignItems={`center`}>
              {`${account.substring(0, 6)} ... ${account.substring(account.length - 4)}`}
            </Box>
          </Box>
        ) : (
          <Box onClick={handleConnectWallet} style={{ cursor: "pointer" }}>
            {`Connect Wallet`}
          </Box>
        )}
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <Box
            height={`100%`}
            display={`flex`}
            flexDirection={`column`}
            alignItems={`center`}
            justifyContent={`center`}
            gap={3}
          >
            <Typography variant={`h4`}>Select Wallet</Typography>
            {connectors.map((connector) => {
              return (
                <Button
                  key={connector.title}
                  variant={`outlined`}
                  onClick={handleConnectWallet}
                  style={{ textTransform: 'none', width: '300px', display: 'flex', justifyContent: 'space-between' }}
                >
                  <img src={connector.icon} alt={`metamask`} width={70} />
                  <Typography variant={`h5`}>{connector.title}</Typography>
                </Button>
              );
            })}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>




      {error && (
        <Alert severity="error" style={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
          {getErrorMessage(error)}
        </Alert>
      )}
    </div>
  );
};

ConnectWallet.propTypes = {
  className: PropTypes.string,
  showAvatar: PropTypes.bool,
  user: PropTypes.shape({
    name: PropTypes.string,
    nameFirst: PropTypes.string,
    nameLast: PropTypes.string,
    avatar: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
  }),
};

export default ConnectWallet;
