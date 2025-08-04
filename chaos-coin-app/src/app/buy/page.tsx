'use client';

import { useState, useEffect } from "react";
import { fetchChaosPrice } from "@/lib/newsApi";

export default function BuyPage() {
  const [priceData, setPriceData] = useState({ price: 0.001, change24h: 0, volume24h: 0 });
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  useEffect(() => {
    const loadPrice = async () => {
      try {
        const result = await fetchChaosPrice();
        setPriceData(result);
        setLastUpdate(new Date());
      } catch (error) {
        console.error('Error fetching price:', error);
      }
    };

    loadPrice();
    const interval = setInterval(loadPrice, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
          Buy CHAOS Tokens
        </h1>
        <p className="text-gray-400 text-lg">
          Purchase CHAOS tokens with 50+ payment methods
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Purchase Interface */}
        <div className="space-y-6">
          {/* Current Price Display */}
          <div className="defi-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">Current Price</h3>
              <span className="text-xs text-gray-400">
                Last updated: {lastUpdate.toLocaleTimeString()}
              </span>
            </div>
            
            <div className="text-center space-y-2">
              <p className="text-4xl font-bold text-white">
                ${priceData.price.toFixed(6)}
              </p>
              <p className={`text-lg font-semibold ${priceData.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {priceData.change24h >= 0 ? '+' : ''}{priceData.change24h.toFixed(2)}% (24h)
              </p>
            </div>
          </div>

          {/* ThirdWeb Pay Integration */}
          <div className="defi-card">
            <h3 className="text-xl font-semibold text-white mb-4">Purchase CHAOS</h3>
            <div className="bg-slate-700/50 rounded-lg p-4 mb-4">
              <iframe
                src={`https://embed.thirdweb.com/checkout?clientId=${process.env.NEXT_PUBLIC_TW_CLIENT_ID}&checkoutId=d62cbbba-24b1-4ac0-b048-7781605867e4&theme=dark`}
                width="100%"
                height="600"
                style={{ border: 'none', borderRadius: '8px' }}
                title="ThirdWeb Pay Checkout"
              />
            </div>
          </div>
        </div>

        {/* Right Column - Information */}
        <div className="space-y-6">
          {/* Security Features */}
          <div className="defi-card">
            <h3 className="text-xl font-semibold text-white mb-4">Security Features</h3>
            <div className="space-y-3">
              {[
                "🔒 Secure payment processing",
                "⚡ Instant token delivery",
                "🛡️ Price manipulation protection",
                "💳 50+ payment networks supported",
                "🔐 Non-custodial transactions",
                "📱 Mobile-friendly interface"
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <span className="text-lg">{feature.split(' ')[0]}</span>
                  <span className="text-gray-300">{feature.split(' ').slice(1).join(' ')}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Token Information */}
          <div className="defi-card">
            <h3 className="text-xl font-semibold text-white mb-4">Token Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Token Name</span>
                <span className="text-white">Chaos Coin (CHAOS)</span>
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
                <span className="text-gray-400">Contract</span>
                <span className="text-white text-xs">
                  {process.env.NEXT_PUBLIC_CHAOS_COIN_ADDRESS}
                </span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-700">
              <a
                href={`https://snowtrace.io/token/${process.env.NEXT_PUBLIC_CHAOS_COIN_ADDRESS}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary w-full text-center"
              >
                View on Snowtrace
              </a>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="defi-card">
            <h3 className="text-xl font-semibold text-white mb-4">Supported Payment Methods</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {[
                "Credit Card", "Debit Card", "Bank Transfer", "Apple Pay",
                "Google Pay", "PayPal", "Crypto Wallets", "Wire Transfer"
              ].map((method, index) => (
                <div key={index} className="bg-slate-700/50 p-3 rounded-lg text-center text-gray-300">
                  {method}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}