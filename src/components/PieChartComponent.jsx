import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartComponent = ({ data }) => {
  const chartData = {
    labels: ["Open", "In Progress", "Completed", "Cancelled"],
    datasets: [
      {
        label: "Tasks",
        data: [
          data.open,
          data.in_progress,
          data.completed,
          data.cancelled,
        ],
        backgroundColor: ["#cbd5e1", "#fde68a", "#86efac", "#fca5a5"],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 12,
          padding: 10,
        },
      },
    },
  };

  return (
    <div className="w-[300px] h-[300px] ">
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default PieChartComponent;
