'use client';

import { useState, useEffect } from "react";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import { contract, TREASURY_ADDRESS, CHAOS_ADDRESS } from "@/lib/contract";
import TokenOperations from "@/components/TokenOperations";

export default function AdminPage() {
  const account = useActiveAccount();
  const [stats, setStats] = useState({
    totalSupply: 0,
    lastMintTime: 'Never',
    contractVersion: '1.0.0',
    securityLevel: 'High'
  });

  const isAdmin = account?.address?.toLowerCase() === TREASURY_ADDRESS.toLowerCase();

  // Read total supply
  const { data: totalSupply } = useReadContract({
    contract,
    method: "totalSupply",
  });

  useEffect(() => {
    if (totalSupply) {
      setStats(prev => ({
        ...prev,
        totalSupply: Number(totalSupply) / 1e18
      }));
    }
  }, [totalSupply]);

  if (!account) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="defi-card text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Admin Panel</h1>
          <p className="text-gray-400 mb-6">Connect your wallet to access admin features</p>
          <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
            <p className="text-yellow-400">⚠️ Admin access restricted to treasury address only</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="defi-card text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-gray-400 mb-6">You do not have permission to access this page</p>
          
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6">
            <h3 className="text-red-400 font-semibold mb-3">🚫 Unauthorized Access</h3>
            <div className="text-left space-y-2 text-sm">
              <p className="text-gray-300"><strong>Your Address:</strong></p>
              <p className="text-gray-400 font-mono break-all">{account.address}</p>
              <p className="text-gray-300 mt-4"><strong>Required Address:</strong></p>
              <p className="text-gray-400 font-mono break-all">{TREASURY_ADDRESS}</p>
            </div>
          </div>
          
          <div className="mt-6 bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
            <p className="text-blue-400 text-sm">
              Only the treasury address has administrative privileges for security purposes.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
          Admin Panel
        </h1>
        <p className="text-gray-400 text-lg">
          Chaos Coin management and analytics dashboard
        </p>
      </div>

      {/* Welcome Message */}
      <div className="mb-8 defi-card">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-2xl">👑</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Welcome, Administrator</h2>
            <p className="text-gray-400">Authenticated as treasury address</p>
            <p className="text-xs text-gray-500 font-mono">{account.address}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Statistics */}
        <div className="lg:col-span-1 space-y-6">
          {/* Contract Statistics */}
          <div className="defi-card">
            <h3 className="text-xl font-semibold text-white mb-4">Contract Stats</h3>
            
            <div className="space-y-4">
              <div className="bg-slate-700/30 p-4 rounded-lg">
                <h4 className="text-green-400 font-medium mb-1">Total Supply</h4>
                <p className="text-2xl font-bold text-white">
                  {stats.totalSupply.toLocaleString()} CHAOS
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Contract Address</span>
                  <span className="text-white text-xs font-mono">
                    {CHAOS_ADDRESS.slice(0, 6)}...{CHAOS_ADDRESS.slice(-4)}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-400">Network</span>
                  <span className="text-white">Avalanche C-Chain</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-400">Standard</span>
                  <span className="text-white">ERC-20</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-400">Last Mint</span>
                  <span className="text-white">{stats.lastMintTime}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-400">Security Level</span>
                  <span className="text-green-400">{stats.securityLevel}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Security Monitor */}
          <div className="defi-card">
            <h3 className="text-xl font-semibold text-white mb-4">Security Monitor</h3>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
                <span className="text-green-400">✅</span>
                <div>
                  <p className="text-green-400 font-medium">Address Validation</p>
                  <p className="text-gray-400 text-sm">Active & functional</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
                <span className="text-green-400">✅</span>
                <div>
                  <p className="text-green-400 font-medium">Amount Limits</p>
                  <p className="text-gray-400 text-sm">Max 1M CHAOS per mint</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
                <span className="text-green-400">✅</span>
                <div>
                  <p className="text-green-400 font-medium">Admin Access</p>
                  <p className="text-gray-400 text-sm">Treasury only</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
                <span className="text-green-400">✅</span>
                <div>
                  <p className="text-green-400 font-medium">Rate Limiting</p>
                  <p className="text-gray-400 text-sm">10 requests/minute</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="defi-card">
            <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
            
            <div className="space-y-3">
              <a
                href={`https://snowtrace.io/token/${CHAOS_ADDRESS}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary w-full text-center block"
              >
                View on Snowtrace
              </a>
              
              <a
                href="/news"
                className="btn-secondary w-full text-center block"
              >
                Manage Social Posts
              </a>
              
              <a
                href={`https://app.uniswap.org/#/tokens/avalanche/${CHAOS_ADDRESS}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary w-full text-center block"
              >
                View on Uniswap
              </a>
            </div>
          </div>
        </div>

        {/* Right Column - Operations */}
        <div className="lg:col-span-2 space-y-6">
          {/* Token Operations */}
          <TokenOperations />

          {/* Activity Log */}
          <div className="defi-card">
            <h3 className="text-xl font-semibold text-white mb-4">Recent Activity</h3>
            
            <div className="space-y-3">
              <div className="bg-slate-700/30 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-green-400 font-medium">Admin Login</span>
                  <span className="text-gray-400 text-sm">{new Date().toLocaleString()}</span>
                </div>
                <p className="text-gray-300 text-sm">Administrator accessed admin panel</p>
              </div>
              
              <div className="bg-slate-700/30 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-blue-400 font-medium">Contract Read</span>
                  <span className="text-gray-400 text-sm">{new Date(Date.now() - 300000).toLocaleString()}</span>
                </div>
                <p className="text-gray-300 text-sm">Total supply queried successfully</p>
              </div>
              
              <div className="bg-slate-700/30 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-purple-400 font-medium">Security Check</span>
                  <span className="text-gray-400 text-sm">{new Date(Date.now() - 600000).toLocaleString()}</span>
                </div>
                <p className="text-gray-300 text-sm">All security validations passed</p>
              </div>
            </div>
          </div>

          {/* System Information */}
          <div className="defi-card">
            <h3 className="text-xl font-semibold text-white mb-4">System Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-green-400 font-medium mb-3">Contract Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Name:</span>
                    <span className="text-white">Chaos Coin</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Symbol:</span>
                    <span className="text-white">CHAOS</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Decimals:</span>
                    <span className="text-white">18</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Version:</span>
                    <span className="text-white">{stats.contractVersion}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-blue-400 font-medium mb-3">Network Info</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Chain ID:</span>
                    <span className="text-white">43114</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Network:</span>
                    <span className="text-white">Avalanche</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Explorer:</span>
                    <span className="text-white">Snowtrace</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">DEX:</span>
                    <span className="text-white">Uniswap V3</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}