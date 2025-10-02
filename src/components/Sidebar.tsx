import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useInquiryContext } from '../context/InquiryContext';
import Logo from './Logo';
import { Home, DollarSign, FileText, Receipt, BarChart3, Factory, ChefHat, Package, ShoppingCart, Archive, Users, MessageSquare, MapPin, Ligature as FileSignature, FilePen, Settings, UserCheck, Calendar, Upload, Truck, Cog, Mail, ChevronLeft, ChevronRight } from 'lucide-react';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { newInquiriesCount } = useInquiryContext();
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebarCollapsed');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

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
        { name: 'Forms', href: '/forms', icon: FileSignature },
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
    <div className={`flex flex-col bg-white shadow-lg h-screen transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="flex items-center justify-center h-12 bg-gradient-to-r from-coral-400 to-pink-400 relative">
        {isCollapsed ? (
          <Logo className="text-white" size="sm" />
        ) : (
          <div className="flex items-center space-x-2">
            <Logo className="text-white" size="sm" />
            <span className="text-lg font-semibold text-white tracking-tight">CakeFlow CRM</span>
          </div>
        )}
      </div>
      
      <nav className="mt-2 flex-1 px-2 pb-2 space-y-0.5 overflow-y-auto">
        {navigation.map((item) => (
          <div key={item.name}>
            {item.href ? (
              <Link
                to={item.href}
                title={isCollapsed ? item.name : ''}
                className={`group flex items-center ${isCollapsed ? 'justify-center px-2' : 'px-2'} py-1.5 text-xs font-medium rounded-md transition-colors ${
                  item.current
                    ? 'bg-coral-100 text-coral-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <div className="relative">
                  <item.icon
                    className={`${isCollapsed ? '' : 'mr-2.5'} h-4 w-4 transition-colors ${
                      item.current ? 'text-coral-500' : 'text-gray-400 group-hover:text-gray-500'
                    }`}
                  />
                  {item.badge && isCollapsed && (
                    <span className="absolute -top-1 -right-1 h-2 w-2 bg-coral-500 rounded-full"></span>
                  )}
                </div>
                {!isCollapsed && (
                  <>
                    <span className="flex-1">{item.name}</span>
                    {item.badge && (
                      <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-coral-500 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </Link>
            ) : (
              <div>
                {!isCollapsed && (
                  <div className="px-2 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    {item.name}
                  </div>
                )}
                {item.children?.map((child) => (
                  <Link
                    key={child.name}
                    to={child.href}
                    title={isCollapsed ? child.name : ''}
                    className={`group flex items-center ${isCollapsed ? 'justify-center px-2' : 'px-2 pl-6'} py-1 text-xs font-medium rounded-md transition-colors ${
                      location.pathname === child.href
                        ? 'bg-coral-100 text-coral-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <child.icon
                      className={`${isCollapsed ? '' : 'mr-2'} h-3.5 w-3.5 transition-colors ${
                        location.pathname === child.href ? 'text-coral-500' : 'text-gray-400 group-hover:text-gray-500'
                      }`}
                    />
                    {!isCollapsed && child.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      <div className="p-1.5 border-t border-gray-200">
        <button
          onClick={toggleSidebar}
          className="w-full flex items-center justify-center p-1.5 text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <>
              <ChevronLeft className="h-4 w-4 mr-1.5" />
              <span className="text-xs font-medium">Collapse</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;