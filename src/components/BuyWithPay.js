import React from "react";
import { ConnectWallet, useAddress, useBalance } from "@thirdweb-dev/react";

const CHAOS_TOKEN_ADDRESS = "0xAafE46fB108dbf914C10005b0Cb1997c8C27a99d";

export default function WalletConnect() {
  const address = useAddress();
  const { data: balance, isLoading } = useBalance(CHAOS_TOKEN_ADDRESS);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
      <h2 className="text-xl font-semibold mb-4">Connect Your Wallet</h2>
      <ConnectWallet theme="dark" />
      {address && (
        <div className="mt-4">
          <p className="text-sm font-mono break-all">Wallet: {address}</p>
          <p className="text-lg mt-2">
            CHAOS Balance:{" "}
            {isLoading ? "Loading..." : `${balance?.displayValue} CHAOS`}
          </p>
        </div>
      )}
    </div>
  );
}
