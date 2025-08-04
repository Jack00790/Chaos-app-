'use client';

import { useState } from "react";
import { useActiveAccount } from "thirdweb/react";
import AccountBalance from "@/components/AccountBalance";
import { CHAOS_ADDRESS } from "@/lib/contract";

export default function WalletPage() {
  const account = useActiveAccount();
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Mock transaction history
  const transactionHistory = [
    {
      id: '1',
      type: 'buy',
      amount: '1,000',
      value: '$10.50',
      date: '2024-01-15',
      status: 'completed',
      hash: '0x1234...5678'
    },
    {
      id: '2',
      type: 'sell',
      amount: '500',
      value: '$5.25',
      date: '2024-01-14',
      status: 'completed',
      hash: '0x8765...4321'
    },
    {
      id: '3',
      type: 'swap',
      amount: '2,000',
      value: '$21.00',
      date: '2024-01-13',
      status: 'pending',
      hash: '0x9999...1111'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
          Your Wallet
        </h1>
        <p className="text-gray-400 text-lg">
          Manage your CHAOS tokens and view transaction history
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Account Balance */}
          <AccountBalance />

          {/* Transaction History */}
          <div className="defi-card">
            <h3 className="text-xl font-semibold text-white mb-6">Transaction History</h3>
            
            {account ? (
              <div className="space-y-4">
                {transactionHistory.map((tx) => (
                  <div key={tx.id} className="bg-slate-700/30 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          tx.type === 'buy' ? 'bg-green-900/30 text-green-400' :
                          tx.type === 'sell' ? 'bg-red-900/30 text-red-400' :
                          'bg-blue-900/30 text-blue-400'
                        }`}>
                          {tx.type.toUpperCase()}
                        </span>
                        <span className="text-white font-medium">{tx.amount} CHAOS</span>
                      </div>
                      <span className="text-gray-400 text-sm">{tx.date}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">{tx.value}</span>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs ${
                          tx.status === 'completed' ? 'bg-green-900/30 text-green-400' :
                          'bg-yellow-900/30 text-yellow-400'
                        }`}>
                          {tx.status}
                        </span>
                        <button
                          onClick={() => copyToClipboard(tx.hash)}
                          className="text-blue-400 hover:text-blue-300 text-xs"
                        >
                          {tx.hash}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-400">Connect your wallet to view transaction history</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Token Import Instructions */}
          <div className="defi-card">
            <h3 className="text-xl font-semibold text-white mb-4">Add CHAOS to MetaMask</h3>
            
            <div className="space-y-4">
              <div className="bg-slate-700/30 p-4 rounded-lg">
                <h4 className="text-green-400 font-medium mb-2">Contract Address</h4>
                <div className="flex items-center justify-between bg-slate-800 p-3 rounded">
                  <span className="text-white text-sm font-mono break-all">{CHAOS_ADDRESS}</span>
                  <button
                    onClick={() => copyToClipboard(CHAOS_ADDRESS)}
                    className="btn-secondary text-xs ml-2"
                  >
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Token Symbol:</span>
                  <span className="text-white">CHAOS</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Decimals:</span>
                  <span className="text-white">18</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Network:</span>
                  <span className="text-white">Avalanche C-Chain</span>
                </div>
              </div>
            </div>
          </div>

          {/* MetaMask Tutorial */}
          <div className="defi-card">
            <h3 className="text-xl font-semibold text-white mb-4">MetaMask Tutorial</h3>
            
            <div className="bg-slate-700/30 rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="200"
                src="https://www.youtube.com/embed/6Gf_kRE4MJU"
                title="MetaMask Tutorial"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              />
            </div>
            
            <div className="mt-4 space-y-2">
              <h4 className="text-green-400 font-medium">Quick Steps:</h4>
              <ol className="text-gray-300 text-sm space-y-1 pl-4">
                <li>1. Open MetaMask extension</li>
                <li>2. Click "Import tokens"</li>
                <li>3. Paste CHAOS contract address</li>
                <li>4. Token details will auto-fill</li>
                <li>5. Click "Add Custom Token"</li>
              </ol>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="defi-card">
            <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
            
            <div className="space-y-3">
              <a
                href="/buy"
                className="btn-primary w-full text-center block"
              >
                Buy CHAOS
              </a>
              <a
                href="/swap"
                className="btn-secondary w-full text-center block"
              >
                Swap Tokens
              </a>
              <a
                href={`https://snowtrace.io/token/${CHAOS_ADDRESS}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary w-full text-center block"
              >
                View on Explorer
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}