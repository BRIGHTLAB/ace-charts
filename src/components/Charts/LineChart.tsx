import React from "react";
import { Chart } from "react-google-charts";
import Loading from "../Loading";

interface props {
  data: (string | number)[][];
}

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
    viewWindow: {
      min: 0, // Set the minimum value of the y-axis to 0
    },
  },
};

export default function LineChart(props: props) {
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
