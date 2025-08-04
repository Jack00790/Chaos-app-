'use client';

import { useState, useEffect } from "react";
import AccountBalance from "@/components/AccountBalance";
import { fetchChaosPrice, fetchMarketMovers, fetchCryptoNews } from "@/lib/newsApi";

export default function Home() {
  const [priceData, setPriceData] = useState({ price: 0.001, change24h: 0, volume24h: 0 });
  const [marketData, setMarketData] = useState({ gainers: [], losers: [] });
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [priceResult, marketResult, newsResult] = await Promise.all([
          fetchChaosPrice(),
          fetchMarketMovers(),
          fetchCryptoNews()
        ]);
        
        setPriceData(priceResult);
        setMarketData(marketResult);
        setNews(newsResult.slice(0, 5));
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
    const interval = setInterval(loadData, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
          Welcome to Chaos Coin
        </h1>
        <p className="text-gray-400 text-lg">
          Your gateway to DeFi trading on Avalanche
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Portfolio Overview */}
          <AccountBalance />

          {/* Market Statistics */}
          <div className="defi-card">
            <h3 className="text-xl font-semibold text-white mb-6">CHAOS Market Data</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-gray-400 text-sm mb-1">Current Price</p>
                <p className="text-2xl font-bold text-white">
                  ${priceData.price.toFixed(6)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-gray-400 text-sm mb-1">24h Change</p>
                <p className={`text-2xl font-bold ${priceData.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {priceData.change24h >= 0 ? '+' : ''}{priceData.change24h.toFixed(2)}%
                </p>
              </div>
              <div className="text-center">
                <p className="text-gray-400 text-sm mb-1">24h Volume</p>
                <p className="text-2xl font-bold text-white">
                  ${priceData.volume24h.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="defi-card">
            <h3 className="text-xl font-semibold text-white mb-4">Join Our Community</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { name: 'Discord', url: 'https://discord.com/channels/1398769618088231042/1398769618692345918', color: 'bg-indigo-600' },
                { name: 'Twitter', url: 'https://twitter.com/ChaosCoin_', color: 'bg-blue-500' },
                { name: 'Telegram', url: 'https://t.me/chaoscoin', color: 'bg-blue-400' },
                { name: 'Instagram', url: 'https://www.instagram.com/Chaos_Coin_/', color: 'bg-pink-500' },
                { name: 'TikTok', url: 'https://www.tiktok.com/@ChaosCoin_', color: 'bg-gray-800' }
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${social.color} text-white text-center py-3 px-4 rounded-lg font-medium hover:opacity-80 transition-opacity`}
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Market Movers */}
          <div className="defi-card">
            <h3 className="text-lg font-semibold text-white mb-4">Market Movers</h3>
            
            {loading ? (
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="animate-pulse bg-gray-700 h-12 rounded"></div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <h4 className="text-green-400 font-medium mb-2">Top Gainers</h4>
                  {marketData.gainers.slice(0, 3).map((coin: any) => (
                    <div key={coin.id} className="flex justify-between items-center py-2">
                      <span className="text-white text-sm">{coin.symbol.toUpperCase()}</span>
                      <span className="text-green-400 text-sm">+{coin.price_change_percentage_24h?.toFixed(1)}%</span>
                    </div>
                  ))}
                </div>
                
                <div>
                  <h4 className="text-red-400 font-medium mb-2">Top Losers</h4>
                  {marketData.losers.slice(0, 3).map((coin: any) => (
                    <div key={coin.id} className="flex justify-between items-center py-2">
                      <span className="text-white text-sm">{coin.symbol.toUpperCase()}</span>
                      <span className="text-red-400 text-sm">{coin.price_change_percentage_24h?.toFixed(1)}%</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Latest News */}
          <div className="defi-card">
            <h3 className="text-lg font-semibold text-white mb-4">Crypto News</h3>
            
            {loading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-700 h-4 rounded mb-2"></div>
                    <div className="bg-gray-700 h-3 rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {news.map((item: any, index) => (
                  <a
                    key={index}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:bg-slate-700/50 p-3 rounded-lg transition-colors"
                  >
                    <h4 className="text-white text-sm font-medium mb-1 line-clamp-2">
                      {item.title}
                    </h4>
                    <p className="text-gray-400 text-xs">
                      {item.source} • {new Date(item.pubDate).toLocaleDateString()}
                    </p>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
