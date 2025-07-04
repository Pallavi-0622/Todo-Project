import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ weeklyStats = [] }) => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const data = {
    labels: days,
    datasets: [
      {
        label: "Completed",
        data: weeklyStats.map((d) => d.completed || 0),
        backgroundColor: "#3b82f6", // Tailwind blue-500
        barThickness: 20,
        borderRadius: 4,
      },
      {
        label: "Incomplete",
        data: weeklyStats.map((d) => d.incomplete || 0),
        backgroundColor: "#ef4444", // Tailwind red-500
        barThickness: 20,
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#374151", // gray-700
          boxWidth: 12,
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#6b7280", // gray-500
        },
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          color: "#6b7280",
        },
        grid: {
          color: "#e5e7eb", // gray-200
        },
      },
    },
  };

  return (
    <div className="w-full">
      <Bar data={data} options={options} height={200} />
    </div>
  );
};

export default BarChart;
