type StatisticsData = {
  title: string;
  data: {
    [year: string]: {
      [month: string]: Array<[country: string, votes: number]>;
    };
  };
};

type ChartType = {
  id: number;
  name: string;
};

type FilterOption = {
  label: string;
  value: number | string;
};

type IntervalFilterOption = FilterOption & {
  min_date: Date;
  max_date: Date;
};
