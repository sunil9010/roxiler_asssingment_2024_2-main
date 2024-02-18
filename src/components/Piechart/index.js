import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const generateUniqueKey = () =>
  `pie-${Math.random().toString(36).substring(2)}`;

const PieChartComponent = ({ chartData }) => {
  const convertedData = Object.keys(chartData).map((category) => ({
    name: category,
    value: chartData[category],
    id: generateUniqueKey(),
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <PieChart width={400} height={400}>
      <Pie
        data={convertedData}
        dataKey="value"
        cx={200}
        cy={200}
        outerRadius={80}
        fill="#8884d8"
        label
      >
        {convertedData.map((entry) => (
          <Cell
            key={entry.id}
            fill={COLORS[convertedData.indexOf(entry) % COLORS.length]}
          />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default PieChartComponent;
