import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Admin from './Admin/Admin';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
const queryClient = new QueryClient();

const BASESepoliaTestnet = {
  id: 84532,
  name: 'BASE Sepolia',
  nativeCurrency: { name: 'Base', symbol: 'BASE', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://rpc.notadegen.com/base/sepolia'] },
  }
}

const OPSepoliaTestnet = {
  id: 11155420,
  name: 'Optimism Sepolia',
  nativeCurrency: { name: 'Optimism', symbol: 'OP', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://optimism-sepolia.blockpi.network/v1/rpc/public'] },
  }
}

const config = getDefaultConfig({
  appName: 'My App',
  projectId: 'fba08911e2aad64000d0adf60fc08652',
  chains: [BASESepoliaTestnet, OPSepoliaTestnet],
  ssr: false, // If your dApp uses server side rendering (SSR)
});

const axiosConfig = () => {
  axios.defaults.baseURL = 'http://localhost:4001';
  axios.defaults.timeout = 15000;
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
};
axiosConfig();

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider>
              <ToastContainer
                position='top-right'
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
                pauseOnHover
                theme='light'
              />
              <Outlet />
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </>
    ),
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/admin",
        element: <Admin />
      }
    ]
  }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
