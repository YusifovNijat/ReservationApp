
import {Link} from "react-router-dom";

import "./App.css";

import AppHeader from "../AppHeader/AppHeader";
import ReservationsTable from "../ReservationsTable/ReservationsTable";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';


function App() {

    return (
      <div className="App">
        <h1>Your Reservations</h1>
        <Link to="/reservation">
          <FontAwesomeIcon className="add" icon={faSquarePlus} />
        </Link>
        <AppHeader/>
        <ReservationsTable/>
      </div>
    );
  }

export default App;
