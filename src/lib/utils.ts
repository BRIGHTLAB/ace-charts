import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const transformChartData = (
  data: StatisticsData
): (string | number)[][] => {
  const transformedData: any[][] = [["Month"]];
  const countries: string[] = [];

  // add countries
  // [0] = ["KSA","LEBANON","USA"]
  Object.entries(data.data).forEach(([year, yearData]) => {
    Object.entries(yearData).forEach(([month, monthData]) => {
      monthData.forEach(([country]) => {
        if (!countries.includes(country)) {
          countries.push(country);
        }
      });
    });
  });

  // add all values
  // ["2024",12,12,12]
  Object.entries(data.data).forEach(([year, yearData]) => {
    Object.entries(yearData).forEach(([month, monthData]) => {
      const monthYear = `${month}`;
      transformedData.push([monthYear]);
      countries.forEach((country) => {
        const voteCount = monthData.find(([c]) => c === country);
        transformedData[transformedData.length - 1].push(
          voteCount ? voteCount[1] : 0
        );
      });
    });
  });

  transformedData[0].push(...countries);
  return transformedData;
};
