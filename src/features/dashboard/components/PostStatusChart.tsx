import { useState } from "react";
import Chart from "react-apexcharts";
import Skeleton from "../../../lib/Skeleton";
import StatCard2 from "../../../lib/StatCard2";

const PostStatusChart = ({
  data,
  isLoading,
}: {
  data: { label: string; count: number; color: string }[];
  isLoading: boolean;
}) => {
  const categories = data.map((item) => item.label);
  const seriesData = data.map((item) => item.count);
  const colors = data.map((item) => item.color);
  const [state] = useState({
    series: seriesData,
    options: {
      categories,
      chart: {
        type: "polarArea" as "polarArea",
      },
      stroke: {
        colors: ["#fff"],
        width: 2,
      },
      fill: {
        opacity: 0.8,
      },
      labels: categories,
      colors: colors,
    },
  });
  return (
    <div className=" flex flex-col gap-2  bg-grey8 shadow-lg rounded-lg p-4 w-full text-grey2    dark:bg-slate-800 ">
      <span className="text-sm font-semibold dark:text-white">
        Posts By Status
      </span>

      {isLoading && <Skeleton />}
      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.map((item, index) => (
            <StatCard2
              key={index}
              title={item.label}
              value={item.count.toString()}
            />
          ))}
        </div>
        <div className="shadow-lg p-1">
          <Chart
            height={420}
            options={state.options}
            type="polarArea"
            series={state.series}
          />
        </div>
      </div>
    </div>
  );
};

export default PostStatusChart;
