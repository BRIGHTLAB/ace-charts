import React from "react";
import { Chart } from "react-google-charts";
import Loading from "../Loading";

interface props {
  vAxisTitle: string;
  data: (string | number)[][];
}

export default function ColumnChart(props: props) {
  const options = {
    bars: "vertical",
    legend: { position: "top", alignment: "end" },
    animation: {
      startup: true,
      easing: "inAndOut",
      duration: 300, // Animation duration in milliseconds
    },
    vAxis: {
      title: `${props.vAxisTitle || ""}`,
      format: "short", // Use 'short' format for abbreviated numbers
      viewWindow: {
        min: 0, // Set the minimum value of the y-axis to 0
      },
    },
    chartArea: { width: "80%", height: "80%" },
    bar: { groupWidth: "20%" }, // width of bars here
  };

  return (
    <Chart
      chartType="ColumnChart"
      width="100%"
      height="90%"
      loader={<Loading />}
      options={options}
      data={props.data}
    />
  );
}
