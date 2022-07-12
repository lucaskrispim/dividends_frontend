import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import DataTable from "../../components/datatable";
import Barchart from "../../components/barchart";
import DonutChart from "../../components/donutchart";
import NavigationRow from "../../components/navigationrow"

const DashBoard = () => {
  return (
    <>
      <Navbar title="Dividends Ranking"/>
      <div className="container">
        <NavigationRow />
        <div className="row ">

          <div className="col-sm-6 mb-2">
            <Barchart />
          </div>
          <div className="col-sm-6 mb-2">
            <DonutChart />

          </div>
        </div>

        <DataTable />
      </div>
      <Footer />
    </>
  );
}

export default DashBoard;
