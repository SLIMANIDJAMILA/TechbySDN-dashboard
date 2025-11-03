
import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Task, Status } from '../../types';

interface CompletionPieChartProps {
  tasks: Task[];
}

export const CompletionPieChart: React.FC<CompletionPieChartProps> = ({ tasks }) => {
  const data = useMemo(() => {
    const statusCounts = tasks.reduce((acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1;
      return acc;
    }, {} as Record<Status, number>);

    return Object.entries(statusCounts).map(([name, value]) => ({ name, value }));
  }, [tasks]);

  const COLORS: Record<Status, string> = {
    [Status.ToDo]: '#9CA3AF', // Gray
    [Status.InProgress]: '#3B82F6', // Blue
    [Status.Done]: '#8B5CF6', // Purple
  };

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[entry.name as Status]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
