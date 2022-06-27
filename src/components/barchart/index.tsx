import axios from "axios";
import React, { useEffect, useState } from "react";
import Chart from 'react-apexcharts';
import { CompaniesAndDyByPeriod } from "types/company";
import { BASE_URL } from "utils/requests";

type SeriesData = {
  name: string;
  data: number[];
}

type Period = {
  id: number;
  label: string;
  value: number;
  prop: string;
}


type ChartData = {
  labels: {
    categories: string[];
  }
  series: SeriesData[];
}

const Barchart = () => {

  const [chartData, setChartData] = useState<ChartData>(

    {
      labels: {
        categories: []
      },
      series: [
        {
          name: " ",
          data: []
        }
      ]
    }

  );

  const periods = [
    {
      id: 1,
      label: "5 anos",
      value: 5,
      prop: "dy5"
    },
    {
      id: 2,
      label: "3 anos",
      value: 3,
      prop: "dy3"
    },
    {
      id: 3,
      label: "1 anos",
      value: 1,
      prop: "dy1"
    }
  ]

  const [pzero, setPeriod] = useState<Period>(periods[0])

  useEffect(() => {
    axios.get(`${BASE_URL}/dividends/api/companiesanddividendsbyperiod?page=1&size=5&period=${pzero.value}y`).then((response) => {
      const data = response.data as CompaniesAndDyByPeriod[];

      const myLabels = data.map(x => x.abbreviation);

      let mySeries = data.map(x => x.dy5);

      if (pzero.prop === "dy1") {
        mySeries = data.map(x => x.dy1);
      } else if (pzero.prop === 'dy3') {
        mySeries = data.map(x => x.dy3);
      }


      setChartData({
        labels: {
          categories: myLabels
        },
        series: [
          {
            name: "% DY "+ pzero.value,
            data: mySeries
          }
        ]
      });
    });
  }, [pzero]);

  const options = {
    plotOptions: {
      bar: {
        horizontal: false,
      }
    },
  };

  const onChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // usar mapa
    if (event.target.value === "1") {
      setPeriod(periods[2])
    } else if (event.target.value === "3") {
      setPeriod(periods[1])
    } else {
      setPeriod(periods[0])
    }

  }

  return (
    <>
      <div className="row px-3">
        <div className="col-sm-12"><h5 className="text-center text-secondary">Dividendos dos últimos {pzero.value} anos %</h5></div>
      </div>
      <div className="row px-3  justify-content-end">
        <div className="col-sm-3">
          <select className="form-control" onChange={e => onChangeSelect(e)}>

            {periods.map((period) => (
              <option key={`${period.id}`} value={period.value}>{period.label}</option>
            ))}

          </select>



        </div>
      </div>
      <Chart
        options={{ ...options, xaxis: chartData.labels }}
        series={chartData.series}
        type="bar"
        height="240"
      />
    </>
  );
}

export default Barchart;