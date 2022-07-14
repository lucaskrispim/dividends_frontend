import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import NavigationRow from "../../components/navigationrow"
import MagicDataTable from "../../components/magicdatatable"
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "utils/requests";

const MagicStock = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const [stock,setStock] = useState<String>("");
  
  useEffect(() => {
    
    setStock(`${searchParams.get("stock")}`)

    axios.get(`${BASE_URL}/dividends/api/magicstocks?stock=${stock}`)
    .then(response => {
      
    })

  },[searchParams])
  
  return (
    <>
      <Navbar title={`${stock}`}/>
      <div className="container">
      <NavigationRow />
        <MagicDataTable />
      </div>
      <Footer />
    </>
  );
}

export default MagicStock;
