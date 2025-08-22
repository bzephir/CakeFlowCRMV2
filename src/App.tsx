import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import OrderDetail from './pages/OrderDetail';
import CreateOrder from './pages/CreateOrder';
import CustomerDetail from './pages/CustomerDetail';
import Customers from './pages/Customers';
import Recipes from './pages/Recipes';
import RecipeDetail from './pages/RecipeDetail';
import RecipeMarginReport from './pages/RecipeMarginReport';
import {InquiryProvider} from './context/InquiryContext';
import InquiryForm from './pages/InquiryForm';
import Inquiries from './pages/Inquiries';
import InquiryDetail from './pages/InquiryDetail';
import Invoice from './pages/Invoice';
import Invoices from './pages/Invoices';
import Quotes from './pages/Quotes';
import QuoteDetail from './pages/QuoteDetail';
import CreateQuote from './pages/CreateQuote';
import CalendarPage from './pages/CalendarPage';
import Tasks from './pages/Tasks';
import Settings from './pages/Settings';
import Reports from './pages/Reports';
import FormsModule from './pages/Forms';
import FormDetail from './pages/FormDetail';
import Venues from './pages/Venues';
import VenueDetail from './pages/VenueDetail';
import Communication from './pages/Communication';
import Notifications from './pages/Notifications';
import EmailBox from './pages/EmailBox';

// Placeholder components for other routes

const Production = () => <div className="p-6"><h1 className="text-2xl font-bold">Production</h1><p>Production management coming soon...</p></div>;
const Packages = () => <div className="p-6"><h1 className="text-2xl font-bold">Packages</h1><p>Package management coming soon...</p></div>;
const Inventory = () => <div className="p-6"><h1 className="text-2xl font-bold">Inventory</h1><p>Inventory management coming soon...</p></div>;
const InventoryTracking = () => <div className="p-6"><h1 className="text-2xl font-bold">Inventory Tracking</h1><p>Inventory tracking coming soon...</p></div>;
//const Venues = () => <div className="p-6"><h1 className="text-2xl font-bold">Venues</h1><p>Venue database coming soon...</p></div>;
const Workflows = () => <div className="p-6"><h1 className="text-2xl font-bold">Workflows</h1><p>Workflow automation coming soon...</p></div>;
const Import = () => <div className="p-6"><h1 className="text-2xl font-bold">Data Import</h1><p>Data import tools coming soon...</p></div>;
const Vendors = () => <div className="p-6"><h1 className="text-2xl font-bold">Vendors</h1><p>Vendor management coming soon...</p></div>;
const Users = () => <div className="p-6"><h1 className="text-2xl font-bold">User Management</h1><p>User management coming soon...</p></div>;

function App() {
  return (
    <InquiryProvider>
      <Router>
        <div className="flex h-screen bg-gray-50">
          <Sidebar />
          <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
            <div className="flex-1 overflow-y-auto">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/schedule" element={<CalendarPage />} />
                <Route path="/inquiries" element={<Inquiries />} />
                <Route path="/inquiries/:id" element={<InquiryDetail />} />
                <Route path="/inquiry-form" element={<InquiryForm />} />
                <Route path="/quotes" element={<Quotes />} />
                <Route path="/quotes/:id" element={<QuoteDetail />} />
                <Route path="/quotes/new" element={<CreateQuote />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/orders/:id" element={<OrderDetail />} />
                <Route path="/orders/new" element={<CreateOrder />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/invoice/:id" element={<Invoice />} />
                <Route path="/invoice/new" element={<Invoice />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/production" element={<Production />} />
                <Route path="/recipes" element={<Recipes />} />
                <Route path="/recipes/:id" element={<RecipeDetail />} />
                <Route path="/recipes/margin-report" element={<RecipeMarginReport />} />
                <Route path="/packages" element={<Packages />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/inventory-tracking" element={<InventoryTracking/>} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/customers/:id" element={<CustomerDetail />} />
                <Route path="/forms" element={<FormsModule />} />
                <Route path="/forms/mock/:id" element={<FormDetail isAdminView={true} />} />
                <Route path="/venues" element={<Venues />} />
                <Route path="/venues/:id" element={<VenueDetail />} />
                <Route path="/communication" element={<Communication />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/email" element={<EmailBox />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/workflows" element={<Workflows />} />
                <Route path="/import" element={<Import />} />
                <Route path="/vendors" element={<Vendors />} />
                <Route path="/users" element={<Users />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/reports" element={<Reports />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </InquiryProvider>
  );
}

export default App;