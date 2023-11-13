import React, {useState} from 'react'
import './ReservationForm.css'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {Link, useNavigate} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';

function ReservationForm() {
    const navigate = useNavigate();

    const [arrivalDate, setArrivalDate] = useState(new Date());
    const [departureDate, setDepartureDate] = useState(new Date());
    const [hotelName, setHotelName] = useState("");
    const [price, setPrice] = useState("");
    const [guests, setGuests] = useState("");
    const [room, setRoom] = useState("Single");

    const [hotelNameError, setHotelNameError] = useState('');
    const [priceError, setPriceError] = useState('');
    const [guestsError, setGuestsError] = useState('');
    const [dateError, setDateError] = useState('');

    const saveReservation = () => {
        fetch(process.env.REACT_APP_API_KEY,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                arrival: arrivalDate,
                departure: departureDate,
                hotel_name: hotelName,
                price: price,
                guestsNumber: guests,
                typeOfRoom: room,
            }),
        })
        .then((res)=>{if(res.ok){res.json()}; navigate('/');})
        .catch((err)=>console.log("error"))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        clearValidationErrors();

        if (!hotelName.trim()) {
            setHotelNameError('Hotel name cannot be empty.');
            return;
          }
      
          if (!price.trim() || price === "0") {
            setPriceError('Price cannot be empty or zero.');
            return;
          }
      
          if (!guests.trim() || guests === "0") {
            setGuestsError('Guests number cannot be empty or zero.');
            return;
          }
      
          if (departureDate < arrivalDate) {
            setDateError('Departure date cannot be earlier than arrival date.');
            return;
          }
        saveReservation();    
    }

    const clearValidationErrors = () => {
        setHotelNameError('');
        setPriceError('');
        setGuestsError('');
        setDateError('');
      };

    const handleHotelName = (value) =>{
        setHotelName(value);
    }

    const handlePrice = (value) =>{
        setPrice(value);
    }

    const handleArrivalDate = (value) =>{
        setArrivalDate(value);
    }

    const handleDepartureDate = (value) =>{
        setDepartureDate(value);
    }

    const handleGuests = (value) =>{
        setGuests(value);
    }

    const handleRoom = (value) =>{
        setRoom(value);
    }
  return (
    <div className="reserv-form">

        <h1>RESERVATION</h1>

        <form onSubmit={handleSubmit}>
            <label>Hotel name</label>
            <input type="text" onChange={(i)=>handleHotelName(i.target.value)}/>
            <span className="error">{hotelNameError}</span>
            
            <div className='date-container'>
                <label>Arrival</label>
                <div className="date">
                    <DatePicker
                        selected={arrivalDate}
                        onChange={(date)=>handleArrivalDate(date)}
                        dateFormat="dd/MM/yyyy"
                    />
                    <FontAwesomeIcon icon={faCalendar}/>
                </div>
                <label>Departure</label>
                <div className="date">
                
                    <DatePicker
                        selected={departureDate}
                        onChange={(date)=>handleDepartureDate(date)}
                        dateFormat="dd/MM/yyyy"
                    />
                    <FontAwesomeIcon icon={faCalendar}/>
                    <span className="error-dt">{dateError}</span>
                </div>
            </div>
            
            
            
            <label>Room type</label>
            <select onChange={(i)=>handleRoom(i.target.value)}>
                <option value="Single">Single</option>
                <option value="Double">Double</option>
                <option value="Suit">Suit</option>
            </select>
            
            
            <label>Guests number</label>
            <input type='number' onChange={(i)=>handleGuests(i.target.value)}/>
            <span className="error">{guestsError}</span>
            
            
            <label className='price' >Price</label>
            <input type='number' onChange={(i)=>handlePrice(i.target.value)}/>
            <span className="error">{priceError}</span>
            

            <div className="buttons">
            <button type="submit" className='submit'>Submit</button>
            <Link to="/">
            <button className='cancel'>Cancel</button>
            </Link>
            </div>
        </form>
    </div>
  )
}

export default ReservationForm