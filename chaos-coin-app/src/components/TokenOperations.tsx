'use client';

import { useState } from "react";
import { useActiveAccount, TransactionButton } from "thirdweb/react";
import { prepareContractCall } from "thirdweb";
import { contract, TREASURY_ADDRESS } from "@/lib/contract";
import { validateAddress, validateAmount } from "@/lib/security";

export default function TokenOperations() {
  const account = useActiveAccount();
  const [mintAddress, setMintAddress] = useState("");
  const [mintAmount, setMintAmount] = useState("");
  const [error, setError] = useState("");
  
  const isAdmin = account?.address?.toLowerCase() === TREASURY_ADDRESS.toLowerCase();

  const handleMint = () => {
    setError("");
    
    if (!validateAddress(mintAddress)) {
      setError("Invalid address format");
      return;
    }
    
    const amount = parseFloat(mintAmount);
    if (!validateAmount(amount)) {
      setError("Amount must be between 0 and 1,000,000");
      return;
    }
    
    return prepareContractCall({
      contract,
      method: "mintTo",
      params: [mintAddress, BigInt(amount * 1e18)],
    });
  };

  if (!account) {
    return (
      <div className="defi-card">
        <h3 className="text-lg font-semibold text-white mb-4">Token Operations</h3>
        <p className="text-gray-400">Connect your wallet to access token operations</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="defi-card">
        <h3 className="text-lg font-semibold text-white mb-4">Token Operations</h3>
        <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
          <p className="text-red-400 text-sm">
            Access restricted to treasury address only
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="defi-card">
      <h3 className="text-lg font-semibold text-white mb-4">Admin Token Operations</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Mint To Address
          </label>
          <input
            type="text"
            value={mintAddress}
            onChange={(e) => setMintAddress(e.target.value)}
            placeholder="0x..."
            className="defi-input w-full"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Amount (CHAOS)
          </label>
          <input
            type="number"
            value={mintAmount}
            onChange={(e) => setMintAmount(e.target.value)}
            placeholder="0.0"
            min="0"
            max="1000000"
            step="0.01"
            className="defi-input w-full"
          />
        </div>
        
        {error && (
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}
        
        <TransactionButton
          transaction={handleMint}
          onTransactionSent={(result) => {
            console.log("Transaction sent:", result.transactionHash);
          }}
          onTransactionConfirmed={(receipt) => {
            console.log("Transaction confirmed:", receipt.transactionHash);
            setMintAddress("");
            setMintAmount("");
            setError("");
          }}
          onError={(error) => {
            console.error("Transaction error:", error);
            setError("Transaction failed. Please try again.");
          }}
          className="btn-primary w-full"
        >
          Mint Tokens
        </TransactionButton>
        
        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
          <h4 className="font-semibold text-blue-400 mb-2">Security Features</h4>
          <ul className="text-sm text-blue-300 space-y-1">
            <li>• Address validation with regex check</li>
            <li>• Amount bounds (0 < amount ≤ 1,000,000)</li>
            <li>• Admin-only access control</li>
            <li>• Transaction logging</li>
          </ul>
        </div>
      </div>
    </div>
  );
}