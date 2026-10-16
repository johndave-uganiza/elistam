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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

function BarChart() {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const revenue = [
    45000, 52000, 48000, 60000, 65000, 58000, 72000, 68000, 75000, 80000, 85000,
    92000,
  ];

  const cogs = [
    22000, 26000, 24000, 30000, 32000, 29000, 36000, 34000, 37000, 40000, 42000,
    45000,
  ];

  const opex = [
    10000, 11000, 10500, 12000, 13000, 12500, 14000, 13500, 15000, 15500, 16000,
    17000,
  ];

  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);

  const data = {
    labels: months,

    datasets: [
      {
        label: "Revenue",
        data: revenue,
        backgroundColor: "#198754",
        borderRadius: 5,
        borderSkipped: false,
        maxBarThickness: 24,
        categoryPercentage: 0.7,
        barPercentage: 0.85,
      },
      {
        label: "COGS",
        data: cogs,
        backgroundColor: "#fd7e14",
        borderRadius: 5,
        borderSkipped: false,
        maxBarThickness: 24,
        categoryPercentage: 0.7,
        barPercentage: 0.85,
      },
      {
        label: "Opex",
        data: opex,
        backgroundColor: "#0d6efd",
        borderRadius: 5,
        borderSkipped: false,
        maxBarThickness: 24,
        categoryPercentage: 0.7,
        barPercentage: 0.85,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    animation: {
      duration: 500,
    },

    interaction: {
      mode: "index",
      intersect: false,
    },

    layout: {
      padding: {
        top: 4,
        right: 8,
        bottom: 4,
        left: 4,
      },
    },

    scales: {
      x: {
        stacked: false,

        border: {
          display: false,
        },

        grid: {
          display: false,
        },

        ticks: {
          color: "#6c757d",
          padding: 8,
          font: {
            size: 11,
            weight: "500",
          },
        },
      },

      y: {
        beginAtZero: true,

        border: {
          display: false,
          dash: [4, 4],
        },

        grid: {
          color: "#edf0f2",
          drawTicks: false,
        },

        ticks: {
          color: "#8a939b",
          padding: 10,
          maxTicksLimit: 6,

          font: {
            size: 11,
          },

          callback: (value) => {
            if (value >= 1000) {
              return `$${value / 1000}k`;
            }

            return `$${value}`;
          },
        },
      },
    },

    plugins: {
      legend: {
        display: true,
        position: "top",
        align: "start",

        labels: {
          color: "#495057",
          usePointStyle: true,
          pointStyle: "rectRounded",
          boxWidth: 8,
          boxHeight: 8,
          padding: 16,

          font: {
            size: 11,
            weight: "500",
          },
        },
      },

      // The dashboard already has a card header,
      // so don't render another Chart.js title.
      title: {
        display: false,
      },

      tooltip: {
        backgroundColor: "#212529",
        titleColor: "#fff",
        bodyColor: "#fff",
        padding: 10,
        cornerRadius: 8,
        displayColors: true,

        callbacks: {
          label: (context) =>
            `${context.dataset.label}: ${formatCurrency(context.raw)}`,

          afterBody: (items) => {
            if (!items.length) return "";

            const index = items[0].dataIndex;

            const monthlyRevenue = revenue[index];
            const monthlyCogs = cogs[index];
            const monthlyOpex = opex[index];

            const grossProfit = monthlyRevenue - monthlyCogs;

            const netProfit = monthlyRevenue - monthlyCogs - monthlyOpex;

            return [
              "",
              `Gross Profit: ${formatCurrency(grossProfit)}`,
              `Net Profit: ${formatCurrency(netProfit)}`,
            ];
          },
        },
      },
    },
  };

  return (
    <div
      className="w-100 h-100"
      style={{
        minHeight: "280px",
      }}
    >
      <Bar options={options} data={data} />
    </div>
  );
}

export default BarChart;
