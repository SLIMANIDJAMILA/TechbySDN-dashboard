
import React, { useMemo } from 'react';
import { useTasks } from '../context/TaskContext';
import { StatCard } from '../components/StatCard';
import { Task, Status } from '../types';
import { CompletionPieChart } from '../components/charts/CompletionPieChart';
import { PriorityBarChart } from '../components/charts/PriorityBarChart';
import { ProductivityAreaChart } from '../components/charts/ProductivityAreaChart';

const TasksIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-blue-600"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>);
const CheckCircleIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-green-600"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>);
const AlertTriangleIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-red-600"><path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>);
const ClockIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-yellow-600"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>);


export const Dashboard: React.FC = () => {
  const { tasks } = useTasks();

  const stats = useMemo(() => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.status === Status.Done).length;
    const overdueTasks = tasks.filter(
      task => new Date(task.dueDate) < new Date() && task.status !== Status.Done
    ).length;
    const inProgressTasks = tasks.filter(task => task.status === Status.InProgress).length;

    return { totalTasks, completedTasks, overdueTasks, inProgressTasks };
  }, [tasks]);

  if (tasks.length === 0) {
    return (
        <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">No tasks yet!</h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400">Add a new task to see your dashboard.</p>
        </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
      
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Tasks" value={stats.totalTasks} icon={<TasksIcon />} color="bg-blue-100 dark:bg-blue-900" />
        <StatCard title="Completed" value={stats.completedTasks} icon={<CheckCircleIcon />} color="bg-green-100 dark:bg-green-900" />
        <StatCard title="In Progress" value={stats.inProgressTasks} icon={<ClockIcon/>} color="bg-yellow-100 dark:bg-yellow-900" />
        <StatCard title="Overdue" value={stats.overdueTasks} icon={<AlertTriangleIcon />} color="bg-red-100 dark:bg-red-900" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Task Completion</h2>
          <CompletionPieChart tasks={tasks} />
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Tasks by Priority</h2>
          <PriorityBarChart tasks={tasks} />
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Productivity Trend (Last 30 days)</h2>
        <ProductivityAreaChart tasks={tasks} />
      </div>
    </div>
  );
};
