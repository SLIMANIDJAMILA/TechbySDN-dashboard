
import { Priority, Status } from './types';

export const PRIORITY_COLORS: Record<Priority, string> = {
  [Priority.High]: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  [Priority.Medium]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  [Priority.Low]: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
};

export const STATUS_COLORS: Record<Status, string> = {
  [Status.ToDo]: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
  [Status.InProgress]: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  [Status.Done]: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
};

export const ChartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M3 3v18h18"/><path d="M18.7 8a6 6 0 0 0-6 6"/><path d="M13 13a2 2 0 0 0 2 2"/></svg>
);

export const ListIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18"y2="18"/></svg>
);

export const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/></svg>
);
