import React, { useState } from 'react';
import Header from '../components/Header';
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  CheckCircle2,
  Clock,
  AlertCircle,
  Calendar,
  User,
  Flag,
  MoreHorizontal,
  Trash2,
  Archive,
  Play,
  Pause
} from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'overdue';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignedTo: string;
  dueDate: string;
  createdAt: string;
  category: string;
  relatedOrder?: string;
  relatedCustomer?: string;
  estimatedTime?: number; // in minutes
  completedAt?: string;
}

const Tasks: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [assigneeFilter, setAssigneeFilter] = useState('all');
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock tasks data
  const tasks: Task[] = [
    {
      id: 'T-001',
      title: 'Prepare wedding cake ingredients',
      description: 'Gather and measure all ingredients for Sarah Johnson\'s wedding cake',
      status: 'pending',
      priority: 'high',
      assignedTo: 'Chef Maria',
      dueDate: '2025-01-17',
      createdAt: '2025-01-15',
      category: 'Production',
      relatedOrder: 'O-202501-0001',
      relatedCustomer: 'Sarah Johnson',
      estimatedTime: 30
    },
    {
      id: 'T-002',
      title: 'Update inventory - flour shortage',
      description: 'Reorder all-purpose flour and update inventory system',
      status: 'overdue',
      priority: 'urgent',
      assignedTo: 'Admin',
      dueDate: '2025-01-16',
      createdAt: '2025-01-14',
      category: 'Inventory',
      estimatedTime: 15
    },
    {
      id: 'T-003',
      title: 'Follow up with Emma Davis quote',
      description: 'Call customer to discuss corporate event quote and answer questions',
      status: 'pending',
      priority: 'medium',
      assignedTo: 'Sales Team',
      dueDate: '2025-01-18',
      createdAt: '2025-01-15',
      category: 'Sales',
      relatedCustomer: 'Emma Davis',
      estimatedTime: 20
    },
    {
      id: 'T-004',
      title: 'Prepare delivery route',
      description: 'Plan optimal delivery route for today\'s orders',
      status: 'in-progress',
      priority: 'high',
      assignedTo: 'Delivery Team',
      dueDate: '2025-01-17',
      createdAt: '2025-01-17',
      category: 'Logistics',
      estimatedTime: 45
    },
    {
      id: 'T-005',
      title: 'Clean and sanitize equipment',
      description: 'Deep clean all baking equipment and prep areas',
      status: 'completed',
      priority: 'medium',
      assignedTo: 'Kitchen Staff',
      dueDate: '2025-01-16',
      createdAt: '2025-01-15',
      category: 'Maintenance',
      estimatedTime: 60,
      completedAt: '2025-01-16'
    },
    {
      id: 'T-006',
      title: 'Update website with new cake designs',
      description: 'Upload photos and descriptions of latest cake designs to website',
      status: 'pending',
      priority: 'low',
      assignedTo: 'Marketing',
      dueDate: '2025-01-20',
      createdAt: '2025-01-15',
      category: 'Marketing',
      estimatedTime: 90
    },
    {
      id: 'T-007',
      title: 'Prepare invoice for completed order',
      description: 'Generate and send invoice for Lisa Park\'s completed order',
      status: 'pending',
      priority: 'medium',
      assignedTo: 'Admin',
      dueDate: '2025-01-18',
      createdAt: '2025-01-16',
      category: 'Finance',
      relatedOrder: 'O-202412-0026',
      relatedCustomer: 'Lisa Park',
      estimatedTime: 10
    },
    {
      id: 'T-008',
      title: 'Schedule cake tasting appointment',
      description: 'Coordinate with David Thompson for anniversary cake tasting',
      status: 'overdue',
      priority: 'high',
      assignedTo: 'Sales Team',
      dueDate: '2025-01-16',
      createdAt: '2025-01-12',
      category: 'Sales',
      relatedCustomer: 'David Thompson',
      estimatedTime: 15
    }
  ];

  const assignees = [...new Set(tasks.map(task => task.assignedTo))];
  const categories = [...new Set(tasks.map(task => task.category))];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-mint-100 text-mint-800';
      case 'in-progress': return 'bg-aqua-100 text-aqua-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="h-4 w-4 mr-1" />;
      case 'in-progress': return <Play className="h-4 w-4 mr-1" />;
      case 'pending': return <Clock className="h-4 w-4 mr-1" />;
      case 'overdue': return <AlertCircle className="h-4 w-4 mr-1" />;
      default: return <Clock className="h-4 w-4 mr-1" />;
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent': return <Flag className="h-3 w-3 mr-1 text-red-500" />;
      case 'high': return <Flag className="h-3 w-3 mr-1 text-orange-500" />;
      case 'medium': return <Flag className="h-3 w-3 mr-1 text-yellow-500" />;
      case 'low': return <Flag className="h-3 w-3 mr-1 text-green-500" />;
      default: return null;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatTime = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes}m`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  };

  const handleViewTask = (taskId: string) => {
    console.log('View task:', taskId);
    // In a real app, this would open a task details modal or navigate to task detail page
    alert(`View task details for ${taskId}`);
  };

  const handleEditTask = (taskId: string) => {
    console.log('Edit task:', taskId);
    // In a real app, this would open an edit task modal
    alert(`Edit task ${taskId}`);
  };

  const handleCompleteTask = (taskId: string) => {
    console.log('Complete task:', taskId);
    // In a real app, this would update the task status to completed
    alert(`Mark task ${taskId} as completed`);
  };

  const handleDeleteTask = (taskId: string) => {
    console.log('Delete task:', taskId);
    // In a real app, this would delete the task
    alert(`Delete task ${taskId}`);
  };

  const handleCreateTask = () => {
    console.log('Create new task');
    // In a real app, this would open a create task modal
    alert('Create new task functionality would be implemented here');
  };

  const handleBulkAction = (action: 'complete' | 'delete' | 'archive') => {
    if (selectedTasks.length === 0) {
      alert('Please select at least one task');
      return;
    }

    console.log(`Bulk ${action} for tasks:`, selectedTasks);
    alert(`${action.charAt(0).toUpperCase() + action.slice(1)} ${selectedTasks.length} selected tasks`);
  };

  const toggleSelectTask = (taskId: string) => {
    if (selectedTasks.includes(taskId)) {
      setSelectedTasks(selectedTasks.filter(id => id !== taskId));
    } else {
      setSelectedTasks([...selectedTasks, taskId]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedTasks.length === filteredTasks.length) {
      setSelectedTasks([]);
    } else {
      setSelectedTasks(filteredTasks.map(task => task.id));
    }
  };

  // Filter tasks based on search term and filters
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    const matchesAssignee = assigneeFilter === 'all' || task.assignedTo === assigneeFilter;
    return matchesSearch && matchesStatus && matchesPriority && matchesAssignee;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Calculate summary stats
  const pendingTasks = tasks.filter(t => t.status === 'pending').length;
  const overdueTasks = tasks.filter(t => t.status === 'overdue').length;
  const inProgressTasks = tasks.filter(t => t.status === 'in-progress').length;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;

  return (
    <div className="flex-1 overflow-hidden">
      <Header title="Tasks" />
      
      <div className="p-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center">
                  <Clock className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Pending</p>
                <p className="text-lg font-semibold text-gray-900">{pendingTasks}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-r from-red-400 to-red-500 rounded-full flex items-center justify-center">
                  <AlertCircle className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Overdue</p>
                <p className="text-lg font-semibold text-gray-900">{overdueTasks}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-r from-aqua-400 to-aqua-500 rounded-full flex items-center justify-center">
                  <Play className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">In Progress</p>
                <p className="text-lg font-semibold text-gray-900">{inProgressTasks}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-r from-mint-400 to-mint-500 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Completed</p>
                <p className="text-lg font-semibold text-gray-900">{completedTasks}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full sm:w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-coral-500 focus:border-coral-500 text-sm"
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-4 w-4 text-gray-400" />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="block w-full sm:w-40 pl-10 pr-8 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500 text-sm"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>

            <div className="relative">
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="block w-full sm:w-36 pr-8 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500 text-sm"
              >
                <option value="all">All Priority</option>
                <option value="urgent">Urgent</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            <div className="relative">
              <select
                value={assigneeFilter}
                onChange={(e) => setAssigneeFilter(e.target.value)}
                className="block w-full sm:w-40 pr-8 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500 text-sm"
              >
                <option value="all">All Assignees</option>
                {assignees.map(assignee => (
                  <option key={assignee} value={assignee}>{assignee}</option>
                ))}
              </select>
            </div>
          </div>
          
          <button 
            onClick={handleCreateTask}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-coral-400 to-pink-400 hover:from-coral-500 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500 transition-all"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Task
          </button>
        </div>

        {/* Bulk Actions */}
        {selectedTasks.length > 0 && (
          <div className="mb-4 flex items-center gap-2">
            <span className="text-sm text-gray-500">
              {selectedTasks.length} selected
            </span>
            <button 
              onClick={() => handleBulkAction('complete')}
              className="inline-flex items-center px-3 py-1 border border-gray-300 text-xs font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500 transition-colors"
            >
              <CheckCircle2 className="h-3 w-3 mr-1" />
              Complete
            </button>
            <button 
              onClick={() => handleBulkAction('archive')}
              className="inline-flex items-center px-3 py-1 border border-gray-300 text-xs font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500 transition-colors"
            >
              <Archive className="h-3 w-3 mr-1" />
              Archive
            </button>
            <button 
              onClick={() => handleBulkAction('delete')}
              className="inline-flex items-center px-3 py-1 border border-gray-300 text-xs font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500 transition-colors"
            >
              <Trash2 className="h-3 w-3 mr-1" />
              Delete
            </button>
          </div>
        )}

        {/* Tasks Table */}
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-2 py-1 text-left">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedTasks.length === filteredTasks.length && filteredTasks.length > 0}
                        onChange={toggleSelectAll}
                        className="h-4 w-4 text-coral-600 focus:ring-coral-500 border-gray-300 rounded"
                      />
                    </div>
                  </th>
                  <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Task
                  </th>
                  <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assigned To
                  </th>
                  <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-2 py-1 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentTasks.map((task) => (
                  <tr key={task.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-2 py-1 whitespace-nowrap">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedTasks.includes(task.id)}
                          onChange={() => toggleSelectTask(task.id)}
                          className="h-4 w-4 text-coral-600 focus:ring-coral-500 border-gray-300 rounded"
                        />
                      </div>
                    </td>
                    <td className="px-2 py-1">
                      <div className="max-w-xs">
                        <div className="text-sm font-medium text-gray-900 truncate">{task.title}</div>
                        <div className="text-xs text-gray-500 truncate">{task.description}</div>
                        {task.estimatedTime && (
                          <div className="text-xs text-gray-400 mt-1">
                            Est. {formatTime(task.estimatedTime)}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-2 py-1 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                        {getPriorityIcon(task.priority)}
                        <span className="capitalize">{task.priority}</span>
                      </span>
                    </td>
                    <td className="px-2 py-1 whitespace-nowrap">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2 text-gray-400" />
                        <div className="text-sm text-gray-900">{task.assignedTo}</div>
                      </div>
                    </td>
                    <td className="px-2 py-1 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(task.dueDate)}</div>
                      {task.status === 'overdue' && (
                        <div className="text-xs text-red-600 font-medium">Overdue</div>
                      )}
                    </td>
                    <td className="px-2 py-1 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{task.category}</div>
                      {task.relatedCustomer && (
                        <div className="text-xs text-gray-500">{task.relatedCustomer}</div>
                      )}
                    </td>
                    <td className="px-2 py-1 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                        {getStatusIcon(task.status)}
                        <span className="capitalize">{task.status.replace('-', ' ')}</span>
                      </span>
                    </td>
                    <td className="px-2 py-1 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button 
                          onClick={() => handleViewTask(task.id)}
                          className="text-aqua-600 hover:text-aqua-900 transition-colors"
                          title="View"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleEditTask(task.id)}
                          className="text-coral-600 hover:text-coral-900 transition-colors"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        {task.status !== 'completed' && (
                          <button 
                            onClick={() => handleCompleteTask(task.id)}
                            className="text-mint-600 hover:text-mint-900 transition-colors"
                            title="Mark Complete"
                          >
                            <CheckCircle2 className="h-4 w-4" />
                          </button>
                        )}
                        <button 
                          onClick={() => handleDeleteTask(task.id)}
                          className="text-pink-600 hover:text-pink-900 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* No Results */}
        {filteredTasks.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No tasks found</div>
            <div className="text-gray-400 text-sm mt-2">
              {searchTerm || statusFilter !== 'all' || priorityFilter !== 'all' || assigneeFilter !== 'all'
                ? 'Try adjusting your search or filter criteria'
                : 'Get started by creating your first task'
              }
            </div>
          </div>
        )}

        {/* Pagination */}
        {filteredTasks.length > 0 && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-500">
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredTasks.length)} of {filteredTasks.length} tasks
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 border rounded-md text-sm ${
                  currentPage === 1
                    ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`px-3 py-1 border rounded-md text-sm ${
                    currentPage === number
                      ? 'bg-coral-100 border-coral-500 text-coral-600'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {number}
                </button>
              ))}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 border rounded-md text-sm ${
                  currentPage === totalPages
                    ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tasks;