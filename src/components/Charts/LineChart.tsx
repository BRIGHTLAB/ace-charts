import React from "react";
import { Chart } from "react-google-charts";
import Loading from "../Loading";

interface props {
  vAxisTitle: string;
  data: (string | number)[][];
}

export default function LineChart(props: props) {
  const options = {
    curveType: "function",
    legend: { position: "top", alignment: "end" },
    animation: {
      startup: true,
      easing: "inAndOut",
      duration: 300, // Animation duration in milliseconds
    },
    chartArea: { width: "80%", height: "80%" },
    vAxis: {
      title: `${props.vAxisTitle || ""}`,
      viewWindow: {
        min: 0, // Set the minimum value of the y-axis to 0
      },
    },
  };
  return (
    <Chart
      chartType="LineChart"
      width="100%"
      height="90%"
      data={props.data}
      loader={<Loading />}
      options={options}
    />
  );
}
