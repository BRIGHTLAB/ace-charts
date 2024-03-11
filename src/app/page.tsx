"use client";
import Button from "@/components/Button";
import ChartSkeleton from "@/components/Charts/ChartSkeleton";
import ColumnChart from "@/components/Charts/ColumnChart";
import LineChart from "@/components/Charts/LineChart";
import Container from "@/components/Container";
import FilterItem from "@/components/FilterItem";
import Loading from "@/components/Loading";
import Logo from "@/components/Logo/Logo";
import { transformChartData } from "@/lib/utils";
import dayjs, { Dayjs } from "dayjs";
import React, { useEffect, useState } from "react";
import { UseQueryResult, useQueries, useQuery } from "react-query";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";

type Props = {};

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

const intervalFilters: IntervalFilterOption[] = [
  {
    label: "Daily",
    value: "day",
    min_date: dayjs().toDate(),
    max_date: dayjs().add(5, "day").toDate(),
  },
  {
    label: "Weekly",
    value: "week",
    min_date: dayjs().toDate(),
    max_date: dayjs().add(10, "week").toDate(),
  },
  {
    label: "Monthly",
    value: "month",
    min_date: dayjs().toDate(),
    max_date: dayjs().add(10, "month").toDate(),
  },
  {
    label: "Quarterly",
    value: "quarter",
    min_date: dayjs().toDate(),
    max_date: dayjs().add(10, "year").toDate(),
  },
  {
    label: "Yearly",
    value: "year",
    min_date: dayjs().toDate(),
    max_date: dayjs().add(4, "year").toDate(),
  },
];

const chartRenderTypes: FilterOption[] = [
  {
    value: 0,
    label: "Bars",
  },
  {
    value: 1,
    label: "Lines",
  },
];

const fetcher = (url: string) =>
  fetch(`${process.env.BASE_URL}/api${url}`).then((res) => res.json());

const Page = (props: Props) => {
  const [dateValue, setDateValue] = useState<DateValueType | null>(null);

  const [interval, setInterval] = useState<IntervalFilterOption | null>(null);

  const [chartRenderType, setChartRenderType] = useState<FilterOption | null>(
    null
  );

  useEffect(() => {
    setDateValue({
      startDate: intervalFilters[0].min_date,
      endDate: intervalFilters[0].max_date,
    });
    setInterval(intervalFilters[0]);
    setChartRenderType(chartRenderTypes[0]);
  }, []);

  const {
    isLoading: typesDataLoading,
    error: typesDataError,
    data: typesData,
  } = useQuery<ChartType[]>({
    queryKey: ["types"],
    queryFn: () => fetcher("/types"),
    refetchOnWindowFocus: false,
  });

  const results = useQueries<StatisticsData[]>(
    (typesData || []).map((type: ChartType) => ({
      queryKey: ["Chart", type.id, dateValue],
      queryFn: () =>
        fetcher(
          `/data?type=${type.id}&from=${dayjs(dateValue?.startDate).format(
            "YYYY-MM-DD"
          )}&to=${dayjs(dateValue?.endDate).format("YYYY-MM-DD")}&filter=${
            interval?.value
          }`
        ),
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      enabled: typesData && !typesDataLoading,
    }))
  );

  useEffect(() => {
    if (!interval) return;
    setDateValue({
      startDate: interval.min_date,
      endDate: interval.max_date,
    });
  }, [interval]);

  const handleValueChange = (newValue: DateValueType) => {
    setDateValue(newValue);
  };

  const RenderDatePicker = () => (
    <Datepicker
      minDate={interval?.min_date}
      maxDate={interval?.max_date}
      displayFormat="MMM D, YYYY"
      showShortcuts={true}
      value={dateValue}
      onChange={handleValueChange}
    />
  );
  return (
    <Container>
      <div className="flex flex-col gap-5 xl:gap-20">
        <div className="flex items-center justify-center">
          <Logo />
        </div>
        <div className="flex items-center justify-between h-full gap-5 flex-wrap">
          <div className="w-[280px] h-full">
            <RenderDatePicker />
          </div>
          {/* interval filters */}

          <div className="flex flex-wrap">
            {intervalFilters.map((filter, idx) => (
              <div className="w-[6rem]" key={idx}>
                <FilterItem
                  key={idx}
                  selected={interval?.value === filter.value}
                  onClick={() => setInterval(filter)}
                >
                  {filter.label}
                </FilterItem>
              </div>
            ))}
          </div>
          {/* chart rendering type filters */}

          <div className="flex flex-wrap">
            {chartRenderTypes.map((filter, idx) => (
              <div className="w-[6rem]" key={idx}>
                <FilterItem
                  key={idx}
                  selected={chartRenderType?.value === filter.value}
                  onClick={() => setChartRenderType(filter)}
                >
                  {filter.label}
                </FilterItem>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 xl:gap-10">
          {results.length > 0 && !typesDataLoading ? (
            results.map((obj, idx) => {
              if (!obj.data) return;
              const chartData = obj.data as StatisticsData;
              if (Object.keys(chartData.data).length < 1) return;
              return (
                <div
                  className="w-full h-[20.6rem] rounded-2xl bg-white p-6 shadow-md"
                  key={idx}
                >
                  <span className="text-2xl font-semibold">
                    {chartData.title}
                  </span>
                  {chartRenderType?.value === 1 ? (
                    <LineChart data={transformChartData(chartData)} />
                  ) : (
                    <ColumnChart data={transformChartData(chartData)} />
                  )}
                </div>
              );
            })
          ) : (
            <>
              <div className="w-full h-[20.6rem] rounded-2xl bg-white p-6 shadow-md">
                <ChartSkeleton />
              </div>
              <div className="w-full h-[20.6rem] rounded-2xl bg-white p-6 shadow-md">
                <ChartSkeleton />
              </div>
              <div className="w-full h-[20.6rem] rounded-2xl bg-white p-6 shadow-md">
                <ChartSkeleton />
              </div>
            </>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Page;
