
import React from 'react';
import { Task } from '../types';
import { PRIORITY_COLORS, STATUS_COLORS } from '../constants';
import { useTasks } from '../context/TaskContext';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit }) => {
  const { deleteTask } = useTasks();
  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'Done';

  const CalendarIcon = () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-1.5"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-4 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
      <div>
        <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1">{task.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{task.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${STATUS_COLORS[task.status]}`}>{task.status}</span>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${PRIORITY_COLORS[task.priority]}`}>{task.priority} Priority</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {task.tags.map(tag => (
            <span key={tag} className="px-2 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300">
              #{tag}
            </span>
          ))}
        </div>
        <div className={`flex items-center text-sm ${isOverdue ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`}>
          <CalendarIcon />
          <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button onClick={() => onEdit(task)} className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">Edit</button>
        <button onClick={() => deleteTask(task.id)} className="text-sm font-medium text-red-600 dark:text-red-400 hover:underline">Delete</button>
      </div>
    </div>
  );
};
