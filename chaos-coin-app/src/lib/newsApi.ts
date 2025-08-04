// News aggregation from multiple sources
export interface NewsItem {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  source: string;
  thumbnail?: string;
}

// Fetch crypto news from RSS2JSON service
export const fetchCryptoNews = async (): Promise<NewsItem[]> => {
  const sources = [
    {
      name: 'CoinTelegraph',
      url: 'https://cointelegraph.com/rss'
    },
    {
      name: 'CoinDesk',
      url: 'https://www.coindesk.com/arc/outboundfeeds/rss/'
    }
  ];

  const allNews: NewsItem[] = [];

  for (const source of sources) {
    try {
      const response = await fetch(
        `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(source.url)}&api_key=yourapikey&count=10`
      );
      
      if (response.ok) {
        const data = await response.json();
        const news = data.items?.map((item: any) => ({
          title: item.title,
          description: item.description?.replace(/<[^>]*>/g, '').slice(0, 150) + '...',
          link: item.link,
          pubDate: item.pubDate,
          source: source.name,
          thumbnail: item.thumbnail || item.enclosure?.link
        })) || [];
        
        allNews.push(...news);
      }
    } catch (error) {
      console.error(`Error fetching news from ${source.name}:`, error);
    }
  }

  // Sort by date and return latest
  return allNews.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()).slice(0, 20);
};

// Fetch market data from CoinGecko
export const fetchMarketMovers = async () => {
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=percent_change_24h_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h'
    );
    
    if (response.ok) {
      const data = await response.json();
      return {
        gainers: data.slice(0, 5),
        losers: data.slice(-5).reverse()
      };
    }
  } catch (error) {
    console.error('Error fetching market movers:', error);
  }
  
  return { gainers: [], losers: [] };
};

// Fetch CHAOS token price from DexScreener
export const fetchChaosPrice = async (): Promise<{ price: number; change24h: number; volume24h: number }> => {
  try {
    const response = await fetch(
      `https://api.dexscreener.com/latest/dex/tokens/${process.env.NEXT_PUBLIC_CHAOS_COIN_ADDRESS}`
    );
    
    if (response.ok) {
      const data = await response.json();
      const pair = data.pairs?.[0];
      
      if (pair) {
        return {
          price: parseFloat(pair.priceUsd) || 0.001,
          change24h: parseFloat(pair.priceChange?.h24) || 0,
          volume24h: parseFloat(pair.volume?.h24) || 0
        };
      }
    }
  } catch (error) {
    console.error('Error fetching CHAOS price:', error);
  }
  
  // Fallback price
  return {
    price: 0.001,
    change24h: 0,
    volume24h: 0
  };
};