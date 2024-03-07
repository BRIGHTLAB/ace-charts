"use client";
import Button from "@/components/Button";
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

type FilterOptions = {
  label: string;
  value: DateFilter;
  min_date: Date;
  max_date: Date;
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

const filters: FilterOptions[] = [
  {
    label: "Daily",
    value: "day",
    min_date: dayjs().toDate(),
    max_date: dayjs().add(10, "day").toDate(),
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

const fetcher = (url: string) =>
  fetch(`${process.env.BASE_URL}/api${url}`).then((res) => res.json());

type DateFilter = "month" | "year" | "day" | "week" | "quarter";

const Page = (props: Props) => {
  const [dateValue, setDateValue] = useState<DateValueType>({
    startDate: filters[2].min_date,
    endDate: filters[2].max_date,
  });

  const [selectedFilter, setSelectedFilter] = useState<FilterOptions>(
    filters[2]
  );

  const {
    isLoading: typesDataLoading,
    error: typesDataError,
    data: typesData,
  } = useQuery<ChartType[]>({
    queryKey: ["types"],
    queryFn: () => fetcher("/types"),
    refetchOnWindowFocus: false,
  });

  console.log(typesData);
  const results = useQueries<StatisticsData[]>(
    (typesData || []).map((type: ChartType) => ({
      queryKey: ["Chart", type.id, dateValue],
      queryFn: () =>
        fetcher(
          `/data?type=${type.id}&from=${dayjs(dateValue?.startDate).format(
            "YYYY-MM-DD"
          )}&to=${dayjs(dateValue?.endDate).format("YYYY-MM-DD")}&filter=${
            selectedFilter.value
          }`
        ),
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      enabled: typesData && !typesDataLoading,
    }))
  );

  useEffect(() => {
    if (!selectedFilter) return;
    setDateValue({
      startDate: selectedFilter.min_date,
      endDate: selectedFilter.max_date,
    });
  }, [selectedFilter]);

  const handleValueChange = (newValue: DateValueType) => {
    setDateValue(newValue);
  };

  const RenderDatePicker = () => (
    <Datepicker
      minDate={selectedFilter.min_date}
      maxDate={selectedFilter.max_date}
      displayFormat="MM-DD-YYYY"
      showShortcuts={true}
      value={dateValue}
      onChange={handleValueChange}
    />
  );
  return (
    <Container>
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-center">
          <Logo />
        </div>
        <div className="flex items-center justify-between h-full gap-5 flex-wrap">
          <div className="w-[280px] h-full">
            <RenderDatePicker />
          </div>
          <div className="flex flex-wrap">
            {filters.map((filter, idx) => (
              <div className="w-[6rem]" key={idx}>
                <FilterItem
                  key={idx}
                  selected={selectedFilter.value === filter.value}
                  onClick={() => setSelectedFilter(filter)}
                >
                  {filter.label}
                </FilterItem>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 xl:gap-10">
          {results.map((obj, idx) => {
            console.log(obj);
            if (!obj.data) return;
            const chartData = obj.data as StatisticsData;
            return (
              <div
                className="w-full h-[20.6rem] rounded-2xl bg-white p-6 shadow-md"
                key={idx}
              >
                <span className="text-2xl font-semibold">
                  {chartData.title}
                </span>

                {Object.keys(chartData.data).length > 0 ? (
                  <LineChart data={transformChartData(chartData)} />
                ) : (
                  <></>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
};

export default Page;
