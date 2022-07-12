import { Link } from "react-router-dom"

const Home = () => {

  const getTo = (toName: string) => {
    return window.location.pathname === toName ? true : false
  }


  return (
    <>
      <div className="card mb-2">
        <div className="card-body">      
              <Link className={getTo('/magic') ?  'd-inline btn btn-dark m-2': 'd-inline btn btn-outline-dark m-2' } to={getTo('/magic') ?  '#': '/magic' }>Magic Formula</Link>
            
              <Link className={getTo('/') ?  'd-inline btn btn-dark m-2': 'd-inline btn btn-outline-dark m-2' } to={getTo('/') ? '#':'/'}>Dividends</Link>
          
        </div>
      </div>
    </>
  );
}

export default Home;