import axios from "axios";
import Pagination from "components/pagination";
import { useState, useEffect } from "react";
import { MagicStockPage } from "types/stock";
import { BASE_URL } from "utils/requests";

const MagicDataTable = () => {

  const [activePage, setActivePage] = useState(1);


  const [page, setPage] = useState<MagicStockPage>({
    first: true,
    last: true,
    number: 0,
    totalElements: 0,
    totalPages: 0
  });

  useEffect(() => {
    axios.get(`${BASE_URL}/dividends/api/companiesmagicformula?page=${activePage}&size=10`)
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
              <th>Posição</th>
              <th>Nome</th>
              <th>Setor</th>
              <th>Sigla</th>
              <th>EV/EBITDA %</th>
              <th>ROIC %</th>
            </tr>
          </thead>
          <tbody>

            {
              page.content?.map(x => (
                <tr key={x.id}>
                  <td>{x.posicao} </td>
                  <td>{x.name} </td>
                  <td>{x.sector} </td>
                  <td> {x.abbreviation} </td>
                  <td> {x.ev} </td>
                  <td> {x.roic} </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </>
  );
}

export default MagicDataTable;