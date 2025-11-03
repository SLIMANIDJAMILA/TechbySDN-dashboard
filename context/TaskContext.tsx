
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Task, Status, Priority } from '../types';

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'status'>) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  importTasks: (tasks: Task[]) => void;
  loading: boolean;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  const [loading, setLoading] = useState(true);

  const loadInitialData = useCallback(async () => {
    // Check if tasks already exist in localStorage
    const storedTasks = window.localStorage.getItem('tasks');
    if (!storedTasks || JSON.parse(storedTasks).length === 0) {
      try {
        const response = await fetch('./data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const sampleTasks: Task[] = await response.json();
        setTasks(sampleTasks);
      } catch (error) {
        console.error("Could not load sample tasks:", error);
        // Set empty array if fetch fails to avoid breaking the app
        setTasks([]); 
      }
    }
    setLoading(false);
  }, [setTasks]);


  useEffect(() => {
    loadInitialData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addTask = (task: Omit<Task, 'id' | 'createdAt' | 'status'>) => {
    const newTask: Task = {
      ...task,
      id: `task-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: Status.ToDo,
    };
    setTasks(prev => [...prev, newTask]);
  };

  const updateTask = (updatedTask: Task) => {
    setTasks(prev => prev.map(task => task.id === updatedTask.id ? {
      ...updatedTask,
      completedAt: updatedTask.status === Status.Done && !task.completedAt ? new Date().toISOString() : task.completedAt
    } : task));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };
  
  const importTasks = (importedTasks: Task[]) => {
    // A simple validation
    if (Array.isArray(importedTasks) && importedTasks.every(t => t.id && t.title)) {
      setTasks(importedTasks);
    } else {
      alert("Invalid JSON file format for tasks.");
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, importTasks, loading }}>
      {children}
    </TaskContext.Provider>
  );
};
