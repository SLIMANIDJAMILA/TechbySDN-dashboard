
import React, { useState, useCallback } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { TaskProvider, useTasks } from './context/TaskContext';
import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';
import { TasksList } from './pages/TasksList';
import { TaskModal } from './components/TaskModal';
import { Task } from './types';

const AppContent: React.FC = () => {
    const { loading } = useTasks();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

    const handleAddTask = useCallback(() => {
        setTaskToEdit(null);
        setIsModalOpen(true);
    }, []);

    const handleEditTask = useCallback((task: Task) => {
        setTaskToEdit(task);
        setIsModalOpen(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false);
        setTaskToEdit(null);
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-light dark:bg-gray-900">
                <div className="text-xl font-semibold text-gray-700 dark:text-gray-300">Loading Tasks...</div>
            </div>
        )
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header onAddTask={handleAddTask} />
            <main className="flex-1 bg-gray-50 dark:bg-gray-900/95">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/tasks" element={<TasksList onEditTask={handleEditTask} />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </main>
            <TaskModal isOpen={isModalOpen} onClose={handleCloseModal} taskToEdit={taskToEdit} />
        </div>
    );
};


const App: React.FC = () => {
  return (
    <TaskProvider>
        <HashRouter>
            <AppContent />
        </HashRouter>
    </TaskProvider>
  );
};

export default App;
