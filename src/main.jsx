import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThirdwebProvider, metamaskWallet, coinbaseWallet, walletConnect } from "@thirdweb-dev/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThirdwebProvider
      activeChain="avalanche"
      clientId="1e60faa32aa9f5e06a9fb8afdb3a02c8"
      supportedWallets={[
        metamaskWallet(),
        coinbaseWallet(),
        walletConnect(),
      ]}
    >
      <App />
    </ThirdwebProvider>
  </React.StrictMode>
);
