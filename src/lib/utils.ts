import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const transformChartData = (data: StatisticsData): any[][] => {
  const transformedData: any[][] = [["Month"]];
  const countries: string[] = [];
  const years = Object.keys(data.data);
  years.forEach((year) => {
    const months = data.data[year];
    Object.keys(months).forEach((month) => {
      const votes = months[month];
      votes.forEach(([country, voteCount]: [string, number]) => {
        if (!countries.includes(country)) {
          countries.push(country);
        }
      });
    });
  });
  transformedData[0] = transformedData[0].concat(countries);
  years.forEach((year, index) => {
    const months = data.data[year];
    Object.keys(months).forEach((month, monthIndex) => {
      const votes = months[month];
      transformedData[monthIndex + 1] = transformedData[monthIndex + 1] || [];
      transformedData[monthIndex + 1][0] = `${month} ${year}`;
      votes.forEach(([country, voteCount]: [string, number]) => {
        const countryIndex = countries.indexOf(country);
        transformedData[monthIndex + 1][countryIndex + 1] = voteCount;
      });
    });
  });

  return transformedData;
};
