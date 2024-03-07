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
