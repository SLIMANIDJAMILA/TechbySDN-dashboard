
import React, { useState, useEffect, useRef } from 'react';
import { useTasks } from '../context/TaskContext';
import { Task, Status, Priority } from '../types';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskToEdit?: Task | null;
}

export const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, taskToEdit }) => {
  const { addTask, updateTask } = useTasks();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<Priority>(Priority.Medium);
  const [status, setStatus] = useState<Status>(Status.ToDo);
  const [tags, setTags] = useState('');
  const [error, setError] = useState('');

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setDueDate(taskToEdit.dueDate);
      setPriority(taskToEdit.priority);
      setStatus(taskToEdit.status);
      setTags(taskToEdit.tags.join(', '));
    } else {
      // Reset form for new task
      setTitle('');
      setDescription('');
      setDueDate(new Date().toISOString().split('T')[0]);
      setPriority(Priority.Medium);
      setStatus(Status.ToDo);
      setTags('');
    }
    setError('');
  }, [taskToEdit, isOpen]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onClose]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !dueDate) {
      setError('Title and Due Date are required.');
      return;
    }

    const taskData = {
      title,
      description,
      dueDate,
      priority,
      status,
      tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
    };

    if (taskToEdit) {
      updateTask({ ...taskToEdit, ...taskData });
    } else {
      addTask(taskData);
    }
    onClose();
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity">
      <div ref={modalRef} className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-lg m-4 transform transition-all max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 border-b dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {taskToEdit ? 'Edit Task' : 'Add New Task'}
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">{error}</div>}
          
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
            <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" required />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
            <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Due Date</label>
              <input type="date" id="dueDate" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" required />
            </div>
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Priority</label>
              <select id="priority" value={priority} onChange={(e) => setPriority(e.target.value as Priority)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
                {Object.values(Priority).map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>
          
          {taskToEdit && (
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
              <select id="status" value={status} onChange={(e) => setStatus(e.target.value as Status)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
                {Object.values(Status).map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          )}

          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tags (comma-separated)</label>
            <input type="text" id="tags" value={tags} onChange={(e) => setTags(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
          </div>
        </form>
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900 border-t dark:border-gray-700 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600">Cancel</button>
          <button type="submit" onClick={handleSubmit} className="px-4 py-2 bg-primary text-white border border-transparent rounded-md hover:bg-primary/90">{taskToEdit ? 'Save Changes' : 'Create Task'}</button>
        </div>
      </div>
    </div>
  );
};
