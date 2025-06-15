import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Search, User, Mail, LogOut, Settings } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  const navigate = useNavigate();

  const handleMailboxClick = () => {
    // Navigate to communications/mailbox
    console.log('Navigate to mailbox');
  };

  const handleAccountClick = () => {
    // Navigate to account settings
    console.log('Navigate to account settings');
  };

  const handleSettingsClick = () => {
    // Navigate to admin settings
    navigate('/settings');
  };

  const handleLogoutClick = () => {
    // Handle logout
    console.log('Logout user');
  };

  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">{title}</h1>
          {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="block w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-coral-500 focus:border-coral-500 text-sm"
            />
          </div>
          
          <button 
            onClick={handleMailboxClick}
            className="relative p-2 text-gray-400 hover:text-gray-500 transition-colors"
            title="Mailbox"
          >
            <Mail className="h-5 w-5" />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-aqua-400 ring-2 ring-white" />
          </button>
          
          <button className="relative p-2 text-gray-400 hover:text-gray-500 transition-colors" title="Notifications">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-coral-400 ring-2 ring-white" />
          </button>

          <button 
            onClick={handleSettingsClick}
            className="p-2 text-gray-400 hover:text-gray-500 transition-colors" 
            title="Admin Settings"
          >
            <Settings className="h-5 w-5" />
          </button>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={handleAccountClick}
              className="flex items-center space-x-3 hover:bg-gray-50 rounded-lg p-2 transition-colors"
              title="Account Settings"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-coral-400 to-pink-400 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <div className="hidden md:block text-left">
                <div className="text-sm font-medium text-gray-900">Admin User</div>
                <div className="text-xs text-gray-500">admin@cakeflow.com</div>
              </div>
            </button>
            
            <button
              onClick={handleLogoutClick}
              className="p-2 text-gray-400 hover:text-gray-500 transition-colors"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;