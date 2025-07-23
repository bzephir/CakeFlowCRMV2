import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useInquiryContext } from '../context/InquiryContext';
import Logo from './Logo';
import {
  Home,
  DollarSign,
  FileText,
  Receipt,
  BarChart3,
  ChartBar,
  Factory,
  ChefHat,
  Package,
  ShoppingCart,
  Archive,
  Users,
  MessageSquare,
  MapPin,
  FileSignature,
  Settings,
  UserCheck,
  Calendar,
  Upload,
  Truck,
  Cog,
  Mail
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { newInquiriesCount } = useInquiryContext();

  const navigation = [
    {
      name: 'Dashboard',
      href: '/',
      icon: Home,
      current: location.pathname === '/'
    },
    {
      name: 'Calendar',
      href: '/schedule',
      icon: Calendar,
      current: location.pathname === '/schedule'
    },
    {
      name: 'Inquiries',
      href: '/inquiries',
      icon: Mail,
      current: location.pathname.startsWith('/inquiries'),
      badge: newInquiriesCount > 0 ? newInquiriesCount : undefined
    },
    {
      name: 'Finance',
      children: [
        { name: 'Quotes', href: '/quotes', icon: Receipt },
        { name: 'Orders', href: '/orders', icon: FileText },
        { name: 'Invoices', href: '/invoices', icon: DollarSign },
        { name: 'Reports', href: '/reports', icon: BarChart3 },
 
      ]
    },
    {
      name: 'Production',
      children: [
        { name: 'Production', href: '/production', icon: Factory },
        { name: 'Recipes', href: '/recipes', icon: ChefHat },
        { name: 'Packages', href: '/packages', icon: Package },
        { name: 'Ingredients & Materials', href: '/inventory', icon: ShoppingCart },
        { name: 'Inventory', href: '/inventory-tracking', icon: Archive },
      ]
    },
    {
      name: 'Customers',
      children: [
        { name: 'Customers', href: '/customers', icon: Users },
        { name: 'Contracts', href: '/contracts', icon: FileSignature },
        { name: 'Venues', href: '/venues', icon: MapPin },
        { name: 'Communication', href: '/communication', icon: MessageSquare },
      ]
    },
    {
      name: 'Operations',
      children: [
        { name: 'Workflows', href: '/workflows', icon: Settings },
        { name: 'Data Import', href: '/import', icon: Upload },
        { name: 'Vendors', href: '/vendors', icon: Truck },
      ]
    },
    {
      name: 'Administration',
      children: [
        { name: 'User Management', href: '/users', icon: UserCheck },
        { name: 'Admin Settings', href: '/settings', icon: Cog },
      ]
    },
  ];

  return (
    <div className="flex flex-col w-64 bg-white shadow-lg h-screen">
      <div className="flex items-center justify-center h-16 bg-gradient-to-r from-coral-400 to-pink-400">
        <div className="flex items-center space-x-3">
          <Logo className="text-white" size="md" />
          <span className="text-xl font-semibold text-white tracking-tight">CakeFlow CRM</span>
        </div>
      </div>
      
      <nav className="mt-5 flex-1 px-2 pb-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => (
          <div key={item.name}>
            {item.href ? (
              <Link
                to={item.href}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                  item.current
                    ? 'bg-coral-100 text-coral-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 transition-colors ${
                    item.current ? 'text-coral-500' : 'text-gray-400 group-hover:text-gray-500'
                  }`}
                />
                <span className="flex-1">{item.name}</span>
                {item.badge && (
                  <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-coral-500 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            ) : (
              <div>
                <div className="px-2 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {item.name}
                </div>
                {item.children?.map((child) => (
                  <Link
                    key={child.name}
                    to={child.href}
                    className={`group flex items-center px-2 py-2 pl-8 text-sm font-medium rounded-md transition-colors ${
                      location.pathname === child.href
                        ? 'bg-coral-100 text-coral-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <child.icon
                      className={`mr-3 h-4 w-4 transition-colors ${
                        location.pathname === child.href ? 'text-coral-500' : 'text-gray-400 group-hover:text-gray-500'
                      }`}
                    />
                    {child.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;