import Footer from "components/footer";
import Navbar from "components/navbar";
import DataTable from "components/datatable";
import Barchart from "components/barchart";
import DonutChart from "components/donutchart";

const App = () => {
  return (
    <>
      <Navbar />
      <div className="container">

        <div className="row px-3">
          <div className="col-sm-6">
            <Barchart />
          </div>
          <div className="col-sm-6">
            <DonutChart />
          </div>
        </div>

        <DataTable />
      </div>
      <Footer />
    </>
  );
}

export default App;
