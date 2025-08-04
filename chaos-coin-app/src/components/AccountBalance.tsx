'use client';

import { useReadContract, useActiveAccount } from "thirdweb/react";
import { contract } from "@/lib/contract";
import { useState, useEffect } from "react";
import { fetchChaosPrice } from "@/lib/newsApi";

export default function AccountBalance() {
  const account = useActiveAccount();
  const [price, setPrice] = useState(0.001);
  const [loading, setLoading] = useState(true);

  // Read CHAOS balance
  const { data: balance, isLoading: balanceLoading } = useReadContract({
    contract,
    method: "balanceOf",
    params: [account?.address || ""],
  });

  // Fetch current price
  useEffect(() => {
    const loadPrice = async () => {
      try {
        const priceData = await fetchChaosPrice();
        setPrice(priceData.price);
      } catch (error) {
        console.error('Error fetching price:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPrice();
    const interval = setInterval(loadPrice, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  if (!account) {
    return (
      <div className="defi-card">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-300 mb-2">Connect Wallet</h3>
          <p className="text-gray-400">Connect your wallet to view your CHAOS balance</p>
        </div>
      </div>
    );
  }

  const chaosBalance = balance ? Number(balance) / 1e18 : 0;
  const usdValue = chaosBalance * price;

  return (
    <div className="defi-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Your Balance</h3>
        {loading && <div className="animate-pulse-custom text-green-400">●</div>}
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-gray-400">CHAOS Tokens</span>
          <span className="text-xl font-bold text-white">
            {balanceLoading ? (
              <div className="animate-pulse bg-gray-600 h-6 w-20 rounded"></div>
            ) : (
              chaosBalance.toLocaleString(undefined, { maximumFractionDigits: 2 })
            )}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-gray-400">USD Value</span>
          <span className="text-lg font-semibold text-green-400">
            {balanceLoading ? (
              <div className="animate-pulse bg-gray-600 h-5 w-16 rounded"></div>
            ) : (
              `$${usdValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
            )}
          </span>
        </div>
        
        <div className="pt-3 border-t border-gray-700">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Current Price</span>
            <span className="text-white">
              ${price.toFixed(6)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}