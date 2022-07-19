import axios from "axios";
import React, { useEffect, useState } from "react";
import Chart from 'react-apexcharts';
import { CompaniesRsi } from "types/company";
import { useSearchParams } from 'react-router-dom';
import { BASE_URL } from "utils/requests";
import { formatLocalDate } from "utils/format";

type SeriesData = {
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
    axios.get(`${BASE_URL}/dividends/api/indicatorbystock?stock=${stock}`).then((response) => {
      const data = response.data as CompaniesRsi[];
      
      const myLabels = data.map((item) => 
       formatLocalDate(item.x.split("T")[0],'dd/MM/yyyy')
      )
      const mySeries = data.map(x => parseFloat(x.rsi.toFixed(2)));

      setChartData({
        labels: {
          categories: myLabels
        },
        series: [
          {
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
            <div className="col-sm-12"><h5 className="text-center text-secondary">Índice de Força Relativa</h5></div>
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
            type="line"
            height="240"
          />
        </div>
      </div>
    </>
  );
}

export default StockBarchart;