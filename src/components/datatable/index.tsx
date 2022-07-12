import axios from "axios";
import Pagination from "components/pagination";
import { useState, useEffect } from "react";
import { StockPage } from "types/stock";
import { BASE_URL } from "utils/requests";

const DataTable = () => {

  const [activePage, setActivePage] = useState(1);


  const [page, setPage] = useState<StockPage>({
    first: true,
    last: true,
    number: 0,
    totalElements: 0,
    totalPages: 0
  });

  useEffect(() => {
    axios.get(`${BASE_URL}/dividends/api?page=${activePage}&size=5`)
      .then(response => {
        setPage(response.data);
      })
  }, [activePage]);

  const changePage = (index:number) =>{
    setActivePage(index);
  }

  return (
    <>
    <Pagination page={page} onPageChange={changePage} /> 
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th className="d-none d-sm-table-cell" >Nome</th>
              <th className="d-none d-sm-table-cell" >Setor</th>
              <th>Sigla</th>
              <th>Dividend yield %</th>
              <th>Preço </th>
            </tr>
          </thead>
          <tbody>

            {
              page.content?.map(x => (
                <tr key={x.id}>
                  <td className="d-none d-sm-table-cell" >{x.name} </td>
                  <td  className="d-none d-sm-table-cell" >{x.sector} </td>
                  <td> {x.abbreviation} </td>
                  <td> {x.dy.toFixed(2)} </td>
                  <td> R$ {x.price.toFixed(2)} </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </>
  );
}

export default DataTable;