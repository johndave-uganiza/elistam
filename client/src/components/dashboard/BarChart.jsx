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
import helperFunctions from "../../utilities/helperFunctions";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

function BarChart({ monthlyFinancials = [] }) {
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

  const monthlyData = new Map(
    monthlyFinancials.map((financial) => [financial.month, financial]),
  );
  const revenue = months.map(
    (_, index) => monthlyData.get(index + 1)?.revenue ?? 0,
  );
  const cogs = months.map((_, index) => monthlyData.get(index + 1)?.cogs ?? 0);
  const opex = months.map(
    (_, index) => monthlyData.get(index + 1)?.operatingExpenses ?? 0,
  );

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
              return `${helperFunctions.formatCurrencyToPHP(value / 1000)}k`;
            }

            return `${helperFunctions.formatCurrencyToPHP(value)}`;
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
            `${context.dataset.label}: ${helperFunctions.formatCurrencyToPHP(context.raw)}`,

          afterBody: (items) => {
            if (!items.length) return "";

            const index = items[0].dataIndex;

            const monthlyRevenue = Number(data.datasets[0].data[index]) || 0;
            const monthlyCogs = Number(data.datasets[1].data[index]) || 0;
            const monthlyOpex = Number(data.datasets[2].data[index]) || 0;

            const grossProfit = monthlyRevenue - monthlyCogs;

            const netProfit = monthlyRevenue - monthlyCogs - monthlyOpex;

            return [
              "",
              `Gross Profit: ${helperFunctions.formatCurrencyToPHP(grossProfit)}`,
              `Net Profit: ${helperFunctions.formatCurrencyToPHP(netProfit)}`,
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
