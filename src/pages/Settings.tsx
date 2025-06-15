import React, { useState } from 'react';
import Header from '../components/Header';
import { 
  Settings as SettingsIcon,
  Building2,
  Palette,
  Globe,
  CreditCard,
  Mail,
  Plug,
  Globe2,
  User,
  Bell,
  DollarSign,
  Users,
  Save,
  Upload,
  Eye,
  EyeOff,
  Check,
  X,
  Info,
  AlertCircle,
  ChevronRight
} from 'lucide-react';

const Settings: React.FC = () => {
  const [activeSection, setActiveSection] = useState('general');
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    marketing: true,
    orderUpdates: true,
    paymentReminders: true
  });

  // Branding Settings sections
  const brandingSections = [
    { id: 'general', name: 'General', icon: Building2, description: 'Business info, logo upload, color customization' },
    { id: 'dashboard', name: 'Dashboard', icon: SettingsIcon, description: 'Widget preferences and customization' },
    { id: 'international', name: 'International', icon: Globe, description: 'Currency, timezone, date format, language' },
    { id: 'payments', name: 'Payments', icon: CreditCard, description: 'Stripe, PayPal, Square integration setup' },
    { id: 'email', name: 'Email', icon: Mail, description: 'SMTP server configuration' },
    { id: 'integrations', name: 'Integrations', icon: Plug, description: 'Google Calendar, QuickBooks, Mailchimp' },
    { id: 'domain', name: 'Domain Names', icon: Globe2, description: 'Custom domain setup with DNS instructions' },
    { id: 'custom-fields', name: 'Custom Mapped Fields', icon: SettingsIcon, description: 'Auto-populate functionality setup' },
    { id: 'general-settings', name: 'General Settings', icon: SettingsIcon, description: 'App-wide preferences' }
  ];

  // Account Settings sections
  const accountSections = [
    { id: 'login', name: 'Login Settings', icon: User, description: 'Email, password, 2FA configuration' },
    { id: 'billing', name: 'Billing', icon: DollarSign, description: 'Subscription details, payment methods' },
    { id: 'notifications', name: 'Notifications', icon: Bell, description: 'Email, SMS, marketing preferences' },
    { id: 'affiliate', name: 'Affiliate Dashboard', icon: Users, description: 'Referral program management' }
  ];

  const allSections = [
    { category: 'Branding Settings', sections: brandingSections },
    { category: 'Account Settings', sections: accountSections }
  ];

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Business Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
            <input
              type="text"
              defaultValue="Sweet Delights Bakery"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Business Email</label>
            <input
              type="email"
              defaultValue="orders@sweetdelights.com"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              defaultValue="(555) 987-6543"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
            <input
              type="url"
              defaultValue="https://sweetdelights.com"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Business Address</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
            <input
              type="text"
              defaultValue="123 Frosting Lane"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
            <input
              type="text"
              defaultValue="Sugarville"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">State/Province</label>
            <input
              type="text"
              defaultValue="CA"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">ZIP/Postal Code</label>
            <input
              type="text"
              defaultValue="90210"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
            <select className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500">
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="UK">United Kingdom</option>
              <option value="AU">Australia</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Logo & Branding</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Business Logo</label>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-coral-400 to-pink-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-semibold text-lg">SD</span>
              </div>
              <div>
                <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload New Logo
                </button>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 2MB. Recommended: 200x200px</p>
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Brand Colors</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Primary</label>
                <div className="flex items-center space-x-2">
                  <input type="color" defaultValue="#ff7f7f" className="w-8 h-8 border border-gray-300 rounded" />
                  <input type="text" defaultValue="#ff7f7f" className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Secondary</label>
                <div className="flex items-center space-x-2">
                  <input type="color" defaultValue="#3dc2f0" className="w-8 h-8 border border-gray-300 rounded" />
                  <input type="text" defaultValue="#3dc2f0" className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Accent</label>
                <div className="flex items-center space-x-2">
                  <input type="color" defaultValue="#4ade80" className="w-8 h-8 border border-gray-300 rounded" />
                  <input type="text" defaultValue="#4ade80" className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Text</label>
                <div className="flex items-center space-x-2">
                  <input type="color" defaultValue="#1f2937" className="w-8 h-8 border border-gray-300 rounded" />
                  <input type="text" defaultValue="#1f2937" className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCustomFields = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <Info className="h-5 w-5 text-blue-400 mt-0.5 mr-3" />
          <div>
            <h4 className="text-sm font-medium text-blue-800">Custom Mapped Fields</h4>
            <p className="text-sm text-blue-700 mt-1">
              Configure automatic data population from external sources like Google Sheets, CRM systems, or API endpoints.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Field Mappings</h3>
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-900">Customer Information Auto-Fill</h4>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-coral-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-coral-600"></div>
              </label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Source Field</label>
                <select className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                  <option>Google Sheets - Customer Database</option>
                  <option>CRM - Contact Records</option>
                  <option>API Endpoint</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Target Field</label>
                <select className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                  <option>Customer Name</option>
                  <option>Email Address</option>
                  <option>Phone Number</option>
                  <option>Address</option>
                </select>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-900">Order Details Auto-Population</h4>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-coral-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-coral-600"></div>
              </label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Source Field</label>
                <select className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                  <option>Recipe Database</option>
                  <option>Pricing Sheet</option>
                  <option>Inventory System</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Target Field</label>
                <select className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                  <option>Item Description</option>
                  <option>Unit Price</option>
                  <option>Preparation Time</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">API Configuration</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">API Endpoint URL</label>
            <input
              type="url"
              placeholder="https://api.example.com/data"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Authentication Token</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter API token or key"
                className="block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sync Frequency</label>
            <select className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500">
              <option>Real-time</option>
              <option>Every 15 minutes</option>
              <option>Hourly</option>
              <option>Daily</option>
              <option>Manual only</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderGeneralSettingsSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Application Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Auto-save drafts</h4>
              <p className="text-sm text-gray-500">Automatically save form data as you type</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-coral-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-coral-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Email notifications</h4>
              <p className="text-sm text-gray-500">Receive email alerts for important events</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-coral-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-coral-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Dark mode</h4>
              <p className="text-sm text-gray-500">Use dark theme for the interface</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-coral-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-coral-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Compact view</h4>
              <p className="text-sm text-gray-500">Show more items per page in lists</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-coral-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-coral-600"></div>
            </label>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Data & Privacy</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Analytics tracking</h4>
              <p className="text-sm text-gray-500">Help improve the app by sharing usage data</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-coral-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-coral-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Data export</h4>
              <p className="text-sm text-gray-500">Allow data export in various formats</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-coral-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-coral-600"></div>
            </label>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Performance</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Items per page</label>
            <select className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500">
              <option value="10">10 items</option>
              <option value="25" selected>25 items</option>
              <option value="50">50 items</option>
              <option value="100">100 items</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Auto-refresh interval</label>
            <select className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500">
              <option value="0">Never</option>
              <option value="30">30 seconds</option>
              <option value="60" selected>1 minute</option>
              <option value="300">5 minutes</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Email Notifications</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Order Updates</h4>
              <p className="text-sm text-gray-500">Get notified when orders are created or updated</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={notifications.orderUpdates}
                onChange={(e) => handleNotificationChange('orderUpdates', e.target.checked)}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-coral-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-coral-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Payment Reminders</h4>
              <p className="text-sm text-gray-500">Reminders for overdue payments</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={notifications.paymentReminders}
                onChange={(e) => handleNotificationChange('paymentReminders', e.target.checked)}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-coral-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-coral-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Marketing Emails</h4>
              <p className="text-sm text-gray-500">Product updates and promotional content</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={notifications.marketing}
                onChange={(e) => handleNotificationChange('marketing', e.target.checked)}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-coral-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-coral-600"></div>
            </label>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">SMS Notifications</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Urgent Alerts</h4>
              <p className="text-sm text-gray-500">Critical system alerts via SMS</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={notifications.sms}
                onChange={(e) => handleNotificationChange('sms', e.target.checked)}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-coral-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-coral-600"></div>
            </label>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Schedule</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Quiet Hours Start</label>
            <input
              type="time"
              defaultValue="22:00"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Quiet Hours End</label>
            <input
              type="time"
              defaultValue="08:00"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'general':
        return renderGeneralSettings();
      case 'custom-fields':
        return renderCustomFields();
      case 'general-settings':
        return renderGeneralSettingsSection();
      case 'notifications':
        return renderNotifications();
      case 'dashboard':
        return (
          <div className="text-center py-12">
            <SettingsIcon className="h-12 w-12 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Dashboard Settings</h3>
            <p className="text-gray-500">Dashboard customization options coming soon...</p>
          </div>
        );
      case 'international':
        return (
          <div className="text-center py-12">
            <Globe className="h-12 w-12 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">International Settings</h3>
            <p className="text-gray-500">Currency, timezone, and language settings coming soon...</p>
          </div>
        );
      case 'payments':
        return (
          <div className="text-center py-12">
            <CreditCard className="h-12 w-12 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Payment Integration</h3>
            <p className="text-gray-500">Payment gateway configuration coming soon...</p>
          </div>
        );
      case 'email':
        return (
          <div className="text-center py-12">
            <Mail className="h-12 w-12 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Email Configuration</h3>
            <p className="text-gray-500">SMTP server settings coming soon...</p>
          </div>
        );
      case 'integrations':
        return (
          <div className="text-center py-12">
            <Plug className="h-12 w-12 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Third-party Integrations</h3>
            <p className="text-gray-500">Integration settings coming soon...</p>
          </div>
        );
      case 'domain':
        return (
          <div className="text-center py-12">
            <Globe2 className="h-12 w-12 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Custom Domain</h3>
            <p className="text-gray-500">Domain configuration coming soon...</p>
          </div>
        );
      case 'login':
        return (
          <div className="text-center py-12">
            <User className="h-12 w-12 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Login Settings</h3>
            <p className="text-gray-500">Authentication settings coming soon...</p>
          </div>
        );
      case 'billing':
        return (
          <div className="text-center py-12">
            <DollarSign className="h-12 w-12 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Billing & Subscription</h3>
            <p className="text-gray-500">Billing management coming soon...</p>
          </div>
        );
      case 'affiliate':
        return (
          <div className="text-center py-12">
            <Users className="h-12 w-12 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Affiliate Program</h3>
            <p className="text-gray-500">Referral program settings coming soon...</p>
          </div>
        );
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="flex-1 overflow-hidden">
      <Header title="Admin Settings" subtitle="Configure your application settings and preferences" />
      
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-6">
            {allSections.map((category) => (
              <div key={category.category} className="mb-8">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  {category.category}
                </h3>
                <div className="space-y-1">
                  {category.sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors group ${
                        activeSection === section.id
                          ? 'bg-coral-100 text-coral-900'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <div className="flex items-center">
                        <section.icon
                          className={`mr-3 h-4 w-4 transition-colors ${
                            activeSection === section.id ? 'text-coral-500' : 'text-gray-400 group-hover:text-gray-500'
                          }`}
                        />
                        <div className="flex-1">
                          <div className="font-medium">{section.name}</div>
                          <div className="text-xs text-gray-500 mt-0.5">{section.description}</div>
                        </div>
                        <ChevronRight className={`h-4 w-4 transition-colors ${
                          activeSection === section.id ? 'text-coral-500' : 'text-gray-400'
                        }`} />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            <div className="max-w-4xl">
              {renderContent()}
              
              {/* Save Button */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex justify-end">
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-coral-400 to-pink-400 hover:from-coral-500 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500 transition-all">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;