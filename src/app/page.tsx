"use client";
import Button from "@/components/Button";
import LineChart from "@/components/Charts/LineChart";
import Container from "@/components/Container";
import Loading from "@/components/Loading";
import Logo from "@/components/Logo/Logo";
import React, { useState } from "react";

type Props = {};

type StatisticsData = {
  title: string;
  data: {
    [year: string]: {
      [month: string]: Array<[country: string, votes: number]>;
    };
  };
};

const data: StatisticsData[] = [
  {
    title: "President Votes",
    data: {
      "2024": {
        January: [
          ["Lebanon", 20],
          ["Jordan", 50],
          ["Venus", 100],
        ],
        February: [
          ["Lebanon", 10],
          ["Jordan", 250],
          ["Venus", 450],
        ],
      },
    },
  },
  {
    title: "Students Votes",
    data: {
      "2024": {
        January: [
          ["Lebanon", 60],
          ["Jordan", 120],
          ["Venus", 1780],
        ],
        February: [
          ["Lebanon", 123],
          ["Jordan", 453],
          ["Venus", 1],
        ],
      },
    },
  },
];

const transformData = (data: StatisticsData): any[][] => {
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

const Page = (props: Props) => {
  return (
    <Container>
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-center">
          <Logo />
        </div>
        <div className="flex items-center">
          <div className="w-[6rem] h-12 self-end">
            <Button variant={"secondary"} rounded="none" disabled={false}>
              Monthly
            </Button>
          </div>
          <div className="w-[6rem] h-12 self-end mr-auto">
            <Button variant={"secondary"} rounded="none" disabled={true}>
              Yearly
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 xl:gap-10">
          {data.map((obj, idx) => (
            <div
              className="w-full h-[20.6rem] rounded-2xl bg-white p-6 shadow-md"
              key={idx}
            >
              <span className="text-2xl font-semibold">{obj.title}</span>

              <LineChart data={transformData(obj)} />
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Page;
