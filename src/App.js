import React, { useEffect, useState } from 'react';
import './App.css';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import XCounterABI from './XCounterABI.json';
import {ethers} from 'ethers';

import io from 'socket.io-client';
import { toast } from 'react-toastify';
import { explorerURL } from './Services/helper';
const socket = io.connect("http://localhost:4001");

const config = {
  "sendUniversalPacket": {
    "optimism": {
      "portAddr": "0x736eC61687461aA78E7242b9410e199293221b38",
      "channelId": "channel-16",
      "timeout": 36000,
      "explorerUrl": "https://optimism-sepolia.blockscout.com/"
    },
    "base": {
      "portAddr": "0xb749B3389bDFFA53eE71a646D27E82C709654D41",
      "channelId": "channel-17",
      "timeout": 36000,
      "explorerUrl": "https://base-sepolia.blockscout.com/"
    }
  }
}

const contracts = {
  BASEOPTIMISM: {
    address: '0xb749B3389bDFFA53eE71a646D27E82C709654D41'
  },
  OPTIMISMBASE: {
    address: '0x736eC61687461aA78E7242b9410e199293221b38'
  }
}

function App() {

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [duration, setDuration] = useState('N/A');
  const [direction, setDirection] = useState('N/A');
  const { address } = useAccount()
  const [from, setFrom] = useState('NONE');
  const [to, setTo] = useState('NONE');
  const { data: hash, error, isPending, writeContract } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
      useWaitForTransactionReceipt({
        hash,
      });

  useEffect(() => {
    const onConnect = () => {
      console.log('connected');
      setIsConnected(true);
    }

    const onDisconnect = () => {
      setIsConnected(false);
    }

    const onDuration = (data) => {
      setDuration(data);
    }

    const onDirection = (data) => {
      const d = data.split('-').join(' to ');
      toast.success('Next Challenge live!');
      setDirection(d)
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('duration-countdown', onDuration);
    socket.on('direction-ping', onDirection);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('duration-countdown', onDuration);
      socket.off('direction-ping', onDirection);
    };
  }, []);

  const onClickBridge = () => {
    if (from == to || from == 'NONE' || to == 'NONE') {
      toast.error('Please choose the diffrent chains in from and to');
      return
    }
    const pair = `${from}${to}`;
    const functionName = 'sendUniversalPacket';

    const submit = () => {
      writeContract({
        address: contracts[pair].address,
        abi: XCounterABI,
        functionName: functionName,
        args: [config[functionName][to.toLowerCase()]['portAddr'], ethers.encodeBytes32String(config[functionName][from.toLowerCase()]['channelId']), config[functionName][from.toLowerCase()]['timeout']],
      })
    }
    submit();
  }

  return (
    <div className="App flex gap-x-[20px] w-[100%] items-center justify-around relative">
      <div  className="absolute top-[20px] right-[20px]">
        <ConnectButton />
      </div>
      <div className='Form flex flex-col w-[40%] gap-y-[30px] p-[20px] border-[1px] border-solid border-slate-500 rounded-xl'>
        <div className='Direction flex flex-row w-[100%] gap-x-[20px] justify-between'>
          <div className='From flex flex-col w-[40%] gap-y-[20px]'>
            <label className='text-xl'>From:</label>
            <select className='text-xl p-[10px] border-[1px] border-solid border-slate-500 rounded-xl'
               onChange={(event) => {setFrom(event.target.value)}} value={from}
            >
              <option value='None'>Select from chain</option>
              <option value='SOLANA'>SOLANA</option>
              <option value='ETHERIUM'>ETH</option>
              <option value='OPTIMISM'>OP</option>
              <option value='BASE'>BASE</option>
              <option value='POLYCHAIN'>POLYCHAIN</option>
              <option value='AVAX'>AVAX</option>
            </select>
          </div>
          <div className='From flex flex-col w-[40%] gap-y-[20px]'>
            <label className='text-xl'>To:</label>
            <select className='text-xl p-[10px] border-[1px] border-solid border-slate-500 rounded-xl'
              onChange={(event) => {setTo(event.target.value)}} value={to}
            >
              <option value='None'>Select target chain</option>
              <option value='POLYCHAIN'>POLYCHAIN</option>
              <option value='OPTIMISM'>OP</option>
              <option value='SOLANA'>SOLANA</option>
              <option value='ETHERIUM'>ETH</option>
              <option value='AVAX'>AVAX</option>
              <option value='BASE'>BASE</option>
            </select>
          </div>
        </div>
        <button className='Bridge px-[10px] py-[14px] text-base font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 active:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed'
          disabled={address == null}
          onClick={onClickBridge}
        >
          {address != null ? 'Bridge' : 'Connect Wallet'}
        </button>
        {hash && <a target="_blank" href={explorerURL({txSignature: hash, baseExplorerUrl: config['sendUniversalPacket'][from.toLowerCase()]['explorerUrl']})}>Transaction Hash (click here)</a>}
        {isConfirming && <div>Waiting for confirmation...</div>}
        {isConfirmed && <div>Transaction confirmed.</div>}
        {error && (
          <div>Error: {error.shortMessage || error.message}</div>
        )}
      </div>
      <div className='LeaderBoard flex flex-col w-[40%] gap-y-[20px]'>
        <div className='Notification flex flex-col gap-y-[10px]'>
          <label className='Time'>
            <span className='font-bold'>Next announcement is in: </span>{duration}
          </label>
          <label className='AnnouncementDirection'>
            <span className='font-bold'>Current Direction is: </span>{direction}
          </label>
        </div>
        {/* <div className='LeaderBoardTable flex flex-col gap-y-[10px]'>
          <label className='Title font-bold text-4xl'>
            LeaderBoard
          </label>
          <div className='TableContainer flex flex-col gap-y-[10px]'>
            <div className='Item flex flex-row justify-between gap-y-[10px]'>
              <div className='Left font-bold'>Wallet</div>
              <div className='Right w-[120px] text-center font-bold'>Bridge Count</div>
            </div>
            <div className='Item flex flex-row justify-between gap-y-[10px]'>
              <div className='Left'>0xabc...123</div>
              <div className='Right w-[120px] flex justify-center'>3</div>
            </div>
            <div className='Item flex flex-row justify-between gap-y-[10px]'>
              <div className='Left'>0xdef...432</div>
              <div className='Right w-[120px] flex justify-center'>3</div>
            </div>
            <div className='Item flex flex-row justify-between gap-y-[10px]'>
              <div className='Left'>0xqwe...221</div>
              <div className='Right w-[120px] flex justify-center'>3</div>
            </div>
            <div className='Item flex flex-row justify-between gap-y-[10px]'>
              <div className='Left'>0xdsa...234</div>
              <div className='Right w-[120px] flex justify-center'>3</div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default App;
