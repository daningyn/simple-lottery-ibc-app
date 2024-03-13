import React, { useEffect, useState } from "react";
import "./App.css";

import io from "socket.io-client";
import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
} from "@thirdweb-dev/react";
import { ConnectWallet } from "@thirdweb-dev/react";
const socket = io.connect("http://localhost:4001");

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [duration, setDuration] = useState("N/A");

  useEffect(() => {
    const onConnect = () => {
      console.log("connected");
      setIsConnected(true);
    };

    const onDisconnect = () => {
      setIsConnected(false);
    };

    const onDuration = (data) => {
      setDuration(data);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("duration-countdown", onDuration);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("duration-countdown", onDuration);
    };
  }, []);

  return (
    <ThirdwebProvider
      supportedWallets={[
        metamaskWallet({
          recommended: true,
        }),
        coinbaseWallet(),
        walletConnect(),
      ]}
      clientId="<your_client_id>"
    >
      <div className="App flex gap-x-[20px] w-[100%] items-center justify-around">
        <div className="Form flex flex-col w-[40%] gap-y-[30px] p-[20px] border-[1px] border-solid border-slate-500 rounded-xl">
          <div className="Direction flex flex-row w-[100%] gap-x-[20px] justify-between">
            <div className="From flex flex-col w-[40%] gap-y-[20px]">
              <label className="text-xl">From:</label>
              <select className="text-xl p-[10px] border-[1px] border-solid border-slate-500 rounded-xl">
                <option value="None">Select from chain</option>
                <option value="OP">OP</option>
                <option value="BASE">BASE</option>
              </select>
            </div>
            <div className="From flex flex-col w-[40%] gap-y-[20px]">
              <label className="text-xl">To:</label>
              <select className="text-xl p-[10px] border-[1px] border-solid border-slate-500 rounded-xl">
                <option value="None">Select target chain</option>
                <option value="OP">OP</option>
                <option value="BASE">BASE</option>
              </select>
            </div>
          </div>
          <div>
            <ConnectWallet />
          </div>
          <button className="Bridge px-[10px] py-[14px] text-base font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 active:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed">
            Bridge
          </button>
        </div>
        <div className="LeaderBoard flex flex-col w-[40%] gap-y-[20px]">
          <div className="Notification flex flex-col gap-y-[10px]">
            <label className="Time">
              <span className="font-bold">Next announcement is in: </span>
              {duration}
            </label>
            <label className="AnnouncementDirection">
              <span className="font-bold">Current Direction is: </span>
              {duration}
            </label>
          </div>
          <div className="LeaderBoardTable flex flex-col gap-y-[10px]">
            <label className="Title font-bold text-4xl">LeaderBoard</label>
            <div className="TableContainer flex flex-col gap-y-[10px]">
              <div className="Item flex flex-row justify-between gap-y-[10px]">
                <div className="Left font-bold">Wallet</div>
                <div className="Right w-[120px] text-center font-bold">
                  Bridge Count
                </div>
              </div>
              <div className="Item flex flex-row justify-between gap-y-[10px]">
                <div className="Left">0xabc...123</div>
                <div className="Right w-[120px] flex justify-center">3</div>
              </div>
              <div className="Item flex flex-row justify-between gap-y-[10px]">
                <div className="Left">0xdef...432</div>
                <div className="Right w-[120px] flex justify-center">3</div>
              </div>
              <div className="Item flex flex-row justify-between gap-y-[10px]">
                <div className="Left">0xqwe...221</div>
                <div className="Right w-[120px] flex justify-center">3</div>
              </div>
              <div className="Item flex flex-row justify-between gap-y-[10px]">
                <div className="Left">0xdsa...234</div>
                <div className="Right w-[120px] flex justify-center">3</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThirdwebProvider>
  );
}

export default App;
