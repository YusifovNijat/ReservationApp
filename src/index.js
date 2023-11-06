import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/App';
import ReservationForm from './components/ReservationForm/ReservationForm';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import EditReservation from './components/EditReservation/EditReservation';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App/>}/>
        <Route path="/reservation" element={<ReservationForm/>}/>
        <Route path='/edit/:id' element={<EditReservation/>}/>
      </Routes>
    </Router>
  </React.StrictMode>
);
