import Footer from "../../components/footer";
import Navbar from "../../components/navbar";

import SeriesChart from "components/serieschart";
import NavigationRow from "../../components/navigationrow"
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import StockBarchart from "components/stockbarchart";
import RsiChart from "components/rsichart";

const MagicStock = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const [stock, setStock] = useState<String>("");

  useEffect(() => {

    setStock(`${searchParams.get("stock")}`)

  }, [searchParams])

  return (
    <>
      <Navbar title={`${stock}`} />
      <div className="container">
        <NavigationRow />
        <div className="row ">

          <div className="col-sm-6 mb-2">
            <SeriesChart />
          </div>
          <div className="col-sm-6 mb-2">
            <StockBarchart />
          </div>
        </div>

        <div className="row ">

          <div className="col-sm-6 mb-2">
            <RsiChart />
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
}

export default MagicStock;
