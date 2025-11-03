
import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Task, Status } from '../../types';

interface ProductivityAreaChartProps {
  tasks: Task[];
}

export const ProductivityAreaChart: React.FC<ProductivityAreaChartProps> = ({ tasks }) => {
  const data = useMemo(() => {
    const completedTasksByDate: { [key: string]: number } = {};
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    tasks
      .filter(task => task.status === Status.Done && task.completedAt && new Date(task.completedAt) >= thirtyDaysAgo)
      .forEach(task => {
        const date = new Date(task.completedAt!).toISOString().split('T')[0];
        completedTasksByDate[date] = (completedTasksByDate[date] || 0) + 1;
      });

    const chartData = [];
    for (let i = 29; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dateKey = d.toISOString().split('T')[0];
        chartData.push({
            date: dateKey,
            completed: completedTasksByDate[dateKey] || 0,
        });
    }

    return chartData.map(d => ({
        ...d,
        date: new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }));

  }, [tasks]);

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{
            top: 10, right: 30, left: 0, bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Area type="monotone" dataKey="completed" name="Tasks Completed" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
