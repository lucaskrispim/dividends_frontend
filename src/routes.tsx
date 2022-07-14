import Dashboard from "pages/dashboard_dividends";
import MagicTable from "pages/magic_formula";
import MagicStock from "pages/magic_stock";
import { BrowserRouter,Routes,Route} from "react-router-dom";

const Paths = () => {
  return (
    <BrowserRouter >
      <Routes>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/magic" element={<MagicTable/>}/>
          <Route path="/magic/stocks" element={<MagicStock/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default Paths;