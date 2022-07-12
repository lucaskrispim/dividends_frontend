import Dashboard from "pages/dashboard_dividends";
import MagicTable from "pages/magic_formula";
import { BrowserRouter,Routes,Route} from "react-router-dom";

const Paths = () => {
  return (
    <BrowserRouter >
      <Routes>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/magic" element={<MagicTable/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default Paths;