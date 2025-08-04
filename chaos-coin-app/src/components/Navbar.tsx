'use client';

import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { client } from "@/lib/client";
import { avalanche } from "thirdweb/chains";

export default function Navbar() {
  const account = useActiveAccount();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="text-xl font-bold text-white">Chaos Coin</span>
          </div>

          {/* Wallet Connection */}
          <div className="flex items-center space-x-4">
            {account && (
              <div className="hidden sm:flex items-center space-x-2 px-3 py-2 bg-slate-800 rounded-lg">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm text-gray-300">
                  {account.address.slice(0, 6)}...{account.address.slice(-4)}
                </span>
              </div>
            )}
            <ConnectButton
              client={client}
              chain={avalanche}
              connectButton={{
                label: "Connect Wallet",
                className: "btn-primary"
              }}
              detailsButton={{
                className: "btn-secondary"
              }}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}