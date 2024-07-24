type StatisticsData = {
  title: string;
  unit: string;
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
  value: number | string | null;
};

type Country = {
  id: number;
  name: string;
};
