import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
// import faker from "faker";

function BarChart() {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  );

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          color: "#000", // x-axis labels
        },
        title: {
          display: false,
          color: "#000",
        },
      },
      y: {
        min: 0,
        max: 50000,
        ticks: {
          color: "#000", // y-axis labels
        },
        beginAtZero: true,
        title: {
          display: false,
          color: "#000",
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#000", // legend text
        },
      },
      title: {
        display: true,
        text: "2026 Stocks vs. Profit",
        color: "#000", // title text
      },
      tooltip: {
        titleColor: "#000",
        bodyColor: "#000",
      },
    },
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const data = {
    labels: months,
    datasets: [
      {
        label: "Stocks",
        data: [10000, 20000, 30000],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Profit",
        data: [10000 * 0.2, 20000 * 0.3, 30000 * 0.4],
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return <Bar options={options} data={data} />;
}

export default BarChart;
