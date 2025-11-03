
import React from 'react';
import { NavLink } from 'react-router-dom';
import { ChartIcon, ListIcon, PlusIcon } from '../constants';

interface HeaderProps {
  onAddTask: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onAddTask }) => {
  const linkClass = "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors";
  const activeLinkClass = "bg-blue-100 text-primary dark:bg-gray-700";
  const inactiveLinkClass = "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800";

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white/80 px-4 backdrop-blur-md dark:bg-gray-900/80 dark:border-gray-800 sm:px-6">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">TaskDash</h1>
        <nav className="hidden md:flex items-center gap-2">
          <NavLink to="/" className={({ isActive }) => `${linkClass} ${isActive ? activeLinkClass : inactiveLinkClass}`}>
            <ChartIcon /> Dashboard
          </NavLink>
          <NavLink to="/tasks" className={({ isActive }) => `${linkClass} ${isActive ? activeLinkClass : inactiveLinkClass}`}>
            <ListIcon /> All Tasks
          </NavLink>
        </nav>
      </div>
      <button
        onClick={onAddTask}
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-white hover:bg-primary/90 h-10 px-4 py-2"
      >
        <PlusIcon /> <span className="ml-2 hidden sm:inline">Add Task</span>
      </button>
    </header>
  );
};
