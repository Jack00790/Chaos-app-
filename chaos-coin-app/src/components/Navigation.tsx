'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Home', icon: 'icon-home' },
  { href: '/buy', label: 'Buy', icon: 'icon-buy' },
  { href: '/swap', label: 'Swap', icon: 'icon-swap' },
  { href: '/news', label: 'News', icon: 'icon-news' },
  { href: '/wallet', label: 'Wallet', icon: 'icon-wallet' },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <div className="mobile-nav md:hidden">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors ${
                isActive
                  ? 'text-green-400'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <div className={`nav-icon ${item.icon}`} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}