"use client";
import Button from "@/components/Button";
import ChartSkeleton from "@/components/Charts/ChartSkeleton";
import ColumnChart from "@/components/Charts/ColumnChart";
import LineChart from "@/components/Charts/LineChart";
import Container from "@/components/Container";
import FilterItem from "@/components/FilterItem";
import Loading from "@/components/Loading";
import Logo from "@/components/Logo/Logo";
import Select from "@/components/Select";
import { transformChartData } from "@/lib/utils";
import dayjs, { Dayjs } from "dayjs";
import Head from "next/head";
import React, { useCallback, useEffect, useState } from "react";
import {
  UseQueryResult,
  useQueries,
  useQuery,
  useQueryClient,
} from "react-query";
import { SingleValue } from "react-select";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";

type Props = {};

const intervalFilters: FilterOption[] = [
  {
    label: "Monthly",
    value: "month",
  },
  {
    label: "Quarterly",
    value: "quarter",
  },
  {
    label: "Yearly",
    value: "year",
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

const countries = [
  {
    id: 1,
    name: "KSA",
  },
  {
    id: 2,
    name: "USA",
  },
  {
    id: 3,
    name: "Lebanon",
  },
];

const fetcher = (url: string) =>
  fetch(`${process.env.BASE_URL}/api${url}`).then((res) => res.json());

const Page = (props: Props) => {
  const [dateValue, setDateValue] = useState<DateValueType>({
    startDate: "2024-01-01",
    endDate: dayjs().format("YYYY-MM-DD"),
  });

  const [interval, setInterval] = useState<FilterOption | null>(null);

  const [chartRenderType, setChartRenderType] = useState<FilterOption | null>(
    null
  );

  const [selectedCountry, setSelectedCountry] = useState<FilterOption | null>(
    null
  );

  useEffect(() => {
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
    enabled: !!dateValue?.startDate && !!dateValue?.endDate,
  });

  const results = useQueries(
    (typesData || []).map((type: ChartType) => ({
      queryKey: ["Chart", type.id, dateValue, interval],
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

  console.log(results);

  // const results = useQueries({
  //   queries: (typesData || []).map((type: ChartType) => ({
  //     queryKey: ["Chart", type.id, dateValue, interval],
  //     queryFn: () =>
  //       fetcher(
  //         `/data?type=${type.id}&from=${dayjs(dateValue?.startDate).format(
  //           "YYYY-MM-DD"
  //         )}&to=${dayjs(dateValue?.endDate).format("YYYY-MM-DD")}&filter=${
  //           interval?.value
  //         }`
  //       ),
  //     staleTime: Infinity,
  //     refetchOnWindowFocus: false,
  //     enabled: typesData && !typesDataLoading,
  //   })),
  // });

  // const queryClient = useQueryClient();
  // useEffect(() => {
  //   queryClient.invalidateQueries();
  // }, [dateValue, interval]);

  const handleValueChange = (newValue: DateValueType) => {
    setDateValue(newValue);
  };

  const RenderDatePicker = useCallback(
    () => (
      <Datepicker
        displayFormat="MMM D, YYYY"
        primaryColor="red"
        showShortcuts={false}
        value={dateValue}
        onChange={handleValueChange}
      />
    ),
    [dateValue]
  );

  console.log(results);
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

          <div className="w-[200px]">
            <Select
              options={[
                { label: "All", value: null },
                ...countries.map((c) => ({ label: c.name, value: c.id })),
              ]}
              value={selectedCountry}
              onChange={(value: SingleValue<FilterOption>) => {
                setSelectedCountry(value);
              }}
            />
          </div>
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
        {!!dateValue?.startDate && !!dateValue.endDate ? (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 xl:gap-10">
            {results.length > 0 &&
            !typesDataLoading &&
            results.every((res) => res.isSuccess) ? (
              <>
                {results.every((res) => res.data.data.length < 1) ? (
                  <div className="text-center text-3xl col-span-full">
                    No charts available
                  </div>
                ) : (
                  <>
                    {
                      <>
                        {results.map((obj, idx) => {
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
                                <LineChart
                                  vAxisTitle={chartData.unit}
                                  data={transformChartData(chartData)}
                                />
                              ) : (
                                <ColumnChart
                                  vAxisTitle={chartData.unit}
                                  data={transformChartData(chartData)}
                                />
                              )}
                            </div>
                          );
                        })}
                      </>
                    }
                  </>
                )}
              </>
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
        ) : (
          <div className="text-3xl text-center">Please select a date</div>
        )}
      </div>
    </Container>
  );
};

export default Page;
