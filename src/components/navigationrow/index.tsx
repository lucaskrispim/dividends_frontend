import { Link } from "react-router-dom"

const Home = () => {
  return (
    <>
      <div className="card mb-2">
        <div className="card-body">      
              <Link className="d-inline btn btn-outline-dark m-2" to="/magic">Magic Formula</Link>
            
              <Link className="d-inline  btn btn-outline-dark m-2" to="/">Dividends</Link>
          
        </div>
      </div>
    </>
  );
}

export default Home;