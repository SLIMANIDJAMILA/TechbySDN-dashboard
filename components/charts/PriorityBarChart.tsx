
import React, { useMemo } from 'react';
// Fix: Import `Cell` from recharts.
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Task, Priority } from '../../types';

interface PriorityBarChartProps {
  tasks: Task[];
}

export const PriorityBarChart: React.FC<PriorityBarChartProps> = ({ tasks }) => {
  const data = useMemo(() => {
    const priorityCounts = tasks.reduce((acc, task) => {
      acc[task.priority] = (acc[task.priority] || 0) + 1;
      return acc;
    }, {} as Record<Priority, number>);
    
    return [
        { name: 'High', count: priorityCounts.High || 0 },
        { name: 'Medium', count: priorityCounts.Medium || 0 },
        { name: 'Low', count: priorityCounts.Low || 0 },
    ];

  }, [tasks]);

  const COLORS: Record<Priority, string> = {
    [Priority.High]: '#EF4444', // Red
    [Priority.Medium]: '#F59E0B', // Yellow
    [Priority.Low]: '#10B981', // Green
  };

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" name="Tasks" fill="#8884d8">
             {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[entry.name as Priority]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};