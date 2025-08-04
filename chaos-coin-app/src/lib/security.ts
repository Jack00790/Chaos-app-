// Address validation
export const validateAddress = (address: string): boolean => {
  const addressRegex = /^0x[a-fA-F0-9]{40}$/;
  return addressRegex.test(address);
};

// Amount validation
export const validateAmount = (amount: number): boolean => {
  return amount > 0 && amount <= 1000000;
};

// Price manipulation protection
export const validatePriceData = (newPrice: number, oldPrice: number): boolean => {
  if (oldPrice === 0) return true;
  const changePercent = Math.abs((newPrice - oldPrice) / oldPrice);
  return changePercent < 0.5; // Max 50% change
};

// Sanitize content for XSS prevention
export const sanitizeContent = (content: string): string => {
  return content
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

// Rate limiting store
const rateLimitStore = new Map<string, { count: number; lastReset: number }>();

export const checkRateLimit = (key: string, maxRequests: number = 10, windowMs: number = 60000): boolean => {
  const now = Date.now();
  const entry = rateLimitStore.get(key);
  
  if (!entry || now - entry.lastReset > windowMs) {
    rateLimitStore.set(key, { count: 1, lastReset: now });
    return true;
  }
  
  if (entry.count >= maxRequests) {
    return false;
  }
  
  entry.count++;
  return true;
};