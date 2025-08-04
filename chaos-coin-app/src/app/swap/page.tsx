'use client';

import { CHAOS_ADDRESS } from "@/lib/contract";

export default function SwapPage() {
  const uniswapUrl = `https://app.uniswap.org/#/swap?exactField=input&exactAmount=1&inputCurrency=0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7&outputCurrency=${CHAOS_ADDRESS}&chain=avalanche`;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
          Swap Tokens
        </h1>
        <p className="text-gray-400 text-lg">
          Trade AVAX for CHAOS tokens via Uniswap V3
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Column - Information */}
        <div className="lg:col-span-1 space-y-6">
          {/* Trading Information */}
          <div className="defi-card">
            <h3 className="text-xl font-semibold text-white mb-4">Trading Info</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Exchange</span>
                <span className="text-white">Uniswap V3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Network</span>
                <span className="text-white">Avalanche</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Base Token</span>
                <span className="text-white">AVAX</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Quote Token</span>
                <span className="text-white">CHAOS</span>
              </div>
            </div>
          </div>

          {/* Trade Features */}
          <div className="defi-card">
            <h3 className="text-xl font-semibold text-white mb-4">Features</h3>
            <div className="space-y-3">
              {[
                "🔄 Instant swaps",
                "💧 Deep liquidity",
                "📊 Real-time prices",
                "⚡ Low slippage",
                "🔒 Secure trading",
                "📱 Mobile optimized"
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <span className="text-lg">{feature.split(' ')[0]}</span>
                  <span className="text-gray-300 text-sm">{feature.split(' ').slice(1).join(' ')}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Token Details */}
          <div className="defi-card">
            <h3 className="text-xl font-semibold text-white mb-4">Token Details</h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray-400">CHAOS Contract:</span>
                <p className="text-white break-all mt-1">{CHAOS_ADDRESS}</p>
              </div>
              <div className="pt-2">
                <span className="text-gray-400">AVAX Contract:</span>
                <p className="text-white break-all mt-1">0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Uniswap Interface */}
        <div className="lg:col-span-3">
          <div className="defi-card h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">Uniswap Interface</h3>
              <a
                href={uniswapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-sm"
              >
                Open in New Tab
              </a>
            </div>
            
            <div className="bg-slate-700/30 rounded-lg p-4">
              <iframe
                src={uniswapUrl}
                width="100%"
                height="600"
                style={{ 
                  border: 'none', 
                  borderRadius: '8px',
                  minHeight: '600px'
                }}
                title="Uniswap V3 Interface"
                allow="web3"
              />
            </div>
            
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-700/30 p-4 rounded-lg text-center">
                <h4 className="text-green-400 font-semibold mb-1">Low Fees</h4>
                <p className="text-gray-300 text-sm">Optimized for cost efficiency</p>
              </div>
              <div className="bg-slate-700/30 p-4 rounded-lg text-center">
                <h4 className="text-blue-400 font-semibold mb-1">Fast Execution</h4>
                <p className="text-gray-300 text-sm">Near-instant transactions</p>
              </div>
              <div className="bg-slate-700/30 p-4 rounded-lg text-center">
                <h4 className="text-purple-400 font-semibold mb-1">Best Prices</h4>
                <p className="text-gray-300 text-sm">Optimal routing algorithm</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trading Tips */}
      <div className="mt-8 defi-card">
        <h3 className="text-xl font-semibold text-white mb-4">Trading Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-green-400 font-medium mb-2">Best Practices</h4>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Check slippage tolerance before trading</li>
              <li>• Monitor gas fees during peak hours</li>
              <li>• Use limit orders for better execution</li>
              <li>• Always verify token addresses</li>
            </ul>
          </div>
          <div>
            <h4 className="text-blue-400 font-medium mb-2">Safety Reminders</h4>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Only connect trusted wallets</li>
              <li>• Double-check transaction details</li>
              <li>• Keep private keys secure</li>
              <li>• Use hardware wallets for large amounts</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}