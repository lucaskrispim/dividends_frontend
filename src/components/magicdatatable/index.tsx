import axios from "axios";
import Pagination from "components/pagination";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { MagicStockPage } from "types/stock";
import {MagicStock} from "types/stock";
import { BASE_URL } from "utils/requests";

const MagicDataTable = () => {

  const navigate = useNavigate();

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

  const onClickAbbreviation = (x:MagicStock) => {
    navigate({
     pathname:"stocks",
     search: `stock=${x.abbreviation}`
    });
  }

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
              <th className="d-none d-sm-table-cell" >Nome</th>
              <th className="d-none d-sm-table-cell" >Setor</th>
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
                  <td className="d-none d-sm-table-cell" >{x.name} </td>
                  <td className="d-none d-sm-table-cell" >{x.sector} </td>
                  <td onClick={ () => onClickAbbreviation(x)} style={{cursor: "pointer"}}> {x.abbreviation} </td>
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