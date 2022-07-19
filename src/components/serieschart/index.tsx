import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from 'react-router-dom';
import Chart from 'react-apexcharts';
import { CompaniesStock } from "types/company";
import { BASE_URL } from "utils/requests";
import {formatLocalDate} from "utils/format";

type SeriesData = {
  data: CompaniesStock[];
}

type ChartData = {
  series: SeriesData[];
}

const Serieschart = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const [stock, setStock] = useState<string>(`${searchParams.get("stock")}`);
  

  const [chartData, setChartData] = useState<ChartData>(
    {
      series: [
        {
          data: []
        }
      ]
    }
  );

  useEffect(() => {

    axios.get(`${BASE_URL}/dividends/api/candlestickbystock?stock=${stock}`).then((response) => {
      response.data.map((item:CompaniesStock) => {
        item.x = formatLocalDate(item.x.split("T")[0],'dd/MM/yyyy')
      })
      const data = response.data as CompaniesStock[];

      setChartData({
        series: [
          {
            data: data
          }
        ]
      });

    });
  }, [stock]);

  const options = {
    plotOptions: {
      candlestick: {
        wick: {
          useFillColor: true,
        }
      }
    }
  };

  return (
    <>
      <div className="card h-100">
        <div className="card-body">
          <div className="row">
            <div className="col-sm-12"><h5 className="text-center text-secondary">{stock}</h5></div>
          </div>
          <Chart
            options={{ ...options, xaxis: {
                type: 'category',
                //categories: chartData.labels.categories,     
                tickAmount: 4,           
              }, }}
            series={chartData.series}
            type="candlestick"
            height="240"
          />
        </div>
      </div>
    </>
  );
}

export default Serieschart;