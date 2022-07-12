
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import MagicDataTable from "../../components/magicdatatable";
import NavigationRow from "../../components/navigationrow"

const MagicTable = () => {
  return (
    <>
      <Navbar title="Magic Formula"/>
      <div className="container">
      <NavigationRow />
        <MagicDataTable />
      </div>
      <Footer />
    </>
  );
}

export default MagicTable;