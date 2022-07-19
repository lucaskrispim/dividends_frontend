import axios from "axios";
import React, { useEffect, useState } from "react";
import Chart from 'react-apexcharts';
import { CompaniesStockDividends } from "types/company";
import { useSearchParams } from 'react-router-dom';
import { BASE_URL } from "utils/requests";
import { formatLocalDate } from "utils/format";

type SeriesData = {
  name: string;
  data: number[];
}

// type Period = {
//   id: number;
//   label: string;
//   value: number;
//   prop: string;
// }


type ChartData = {
  labels: {
    categories: string[];
  }
  series: SeriesData[];
}

const StockBarchart = () => {

  const [searchParams, setSearchParams] = useSearchParams();

  const [stock, setStock] = useState<string>(`${searchParams.get("stock")}`);

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

  // const periods = [
  //   {
  //     id: 1,
  //     label: "5 anos",
  //     value: 5,
  //     prop: "dy5"
  //   },
  //   {
  //     id: 2,
  //     label: "3 anos",
  //     value: 3,
  //     prop: "dy3"
  //   },
  //   {
  //     id: 3,
  //     label: "1 anos",
  //     value: 1,
  //     prop: "dy1"
  //   }
  // ]

  // const [pzero, setPeriod] = useState<Period>(periods[0])

  useEffect(() => {
    axios.get(`${BASE_URL}/dividends/api/dividendsbystock?stock=${stock}`).then((response) => {
      const data = response.data as CompaniesStockDividends[];
      
      const myLabels = data.map((x) => 
       formatLocalDate(x.data.split("T")[0],'dd/MM/yyyy')
      )
      const mySeries = data.map(x => parseFloat(x.Dividends.toFixed(2)));

      setChartData({
        labels: {
          categories: myLabels
        },
        series: [
          {
            name: "% DY " + 0,
            data: mySeries
          }
        ]
      });
    });
  }, [stock]);

  const options = {
    plotOptions: {
      bar: {
        horizontal: false,
      }
    },
  };

  // const onChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   // usar mapa
  //   if (event.target.value === "1") {
  //     setPeriod(periods[2])
  //   } else if (event.target.value === "3") {
  //     setPeriod(periods[1])
  //   } else {
  //     setPeriod(periods[0])
  //   }

  // }

  return (
    <>
      <div className="card h-100">
        <div className="card-body">
          <div className="row">
            <div className="col-sm-12"><h5 className="text-center text-secondary">Dividendos do último ano %</h5></div>
          </div>
          <div className="row px-2  justify-content-end">
            <div className="col-sm-3">
              {/* <select className="form-control" onChange={e => onChangeSelect(e)}>

                {periods.map((period) => (
                  <option key={`${period.id}`} value={period.value}>{period.label}</option>
                ))}

              </select> */}



            </div>
          </div>


          <Chart
            options={{ ...options, xaxis: chartData.labels }}
            series={chartData.series}
            type="bar"
            height="240"
          />
        </div>
      </div>
    </>
  );
}

export default StockBarchart;