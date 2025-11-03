
import React, { useState, useMemo, ChangeEvent, useRef } from 'react';
import { useTasks } from '../context/TaskContext';
import { TaskCard } from '../components/TaskCard';
import { Task, Status, Priority } from '../types';

interface TasksListProps {
  onEditTask: (task: Task) => void;
}

export const TasksList: React.FC<TasksListProps> = ({ onEditTask }) => {
  const { tasks, importTasks } = useTasks();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<Status | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<Priority | 'all'>('all');
  const [sortBy, setSortBy] = useState<'dueDate' | 'priority'>('dueDate');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredAndSortedTasks = useMemo(() => {
    let filtered = tasks
      .filter(task => task.title.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter(task => statusFilter === 'all' || task.status === statusFilter)
      .filter(task => priorityFilter === 'all' || task.priority === priorityFilter);

    if (sortBy === 'dueDate') {
      filtered.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
    } else if (sortBy === 'priority') {
      const priorityOrder = { [Priority.High]: 1, [Priority.Medium]: 2, [Priority.Low]: 3 };
      filtered.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    }
    
    return filtered;
  }, [tasks, searchTerm, statusFilter, priorityFilter, sortBy]);

  const handleImport = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result;
          if (typeof content === 'string') {
            const imported = JSON.parse(content);
            importTasks(imported);
            alert('Tasks imported successfully!');
          }
        } catch (error) {
          alert('Failed to import tasks. Please check the file format.');
          console.error(error);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(tasks, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'tasks.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };


  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">All Tasks ({tasks.length})</h1>
         <div className="flex gap-2">
            <button onClick={handleExport} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600">
              Export JSON
            </button>
            <input type="file" ref={fileInputRef} onChange={handleImport} accept=".json" className="hidden" />
            <button onClick={() => fileInputRef.current?.click()} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600">
              Import JSON
            </button>
        </div>
      </div>
      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          />
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value as Status | 'all')} className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary">
            <option value="all">All Statuses</option>
            {Object.values(Status).map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select value={priorityFilter} onChange={e => setPriorityFilter(e.target.value as Priority | 'all')} className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary">
            <option value="all">All Priorities</option>
            {Object.values(Priority).map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          <select value={sortBy} onChange={e => setSortBy(e.target.value as 'dueDate' | 'priority')} className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary">
            <option value="dueDate">Sort by Due Date</option>
            <option value="priority">Sort by Priority</option>
          </select>
        </div>
      </div>

      {/* Task Grid */}
      {filteredAndSortedTasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedTasks.map(task => (
            <TaskCard key={task.id} task={task} onEdit={onEditTask} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">No tasks found</h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400">Try adjusting your filters or add a new task.</p>
        </div>
      )}
    </div>
  );
};
