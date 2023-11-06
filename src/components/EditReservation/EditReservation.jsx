import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link, useNavigate } from 'react-router-dom';
import '../ReservationForm/ReservationForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';

function EditReservation() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [hotelNameError, setHotelNameError] = useState('');
  const [priceError, setPriceError] = useState('');
  const [guestsError, setGuestsError] = useState('');
  const [dateError, setDateError] = useState('');

  const [reservation, setReservation] = useState({
    arrival: new Date(),
    departure: new Date(),
    hotel_name: '',
    price: '',
    guestsNumber: '',
    typeOfRoom: 'Single',
  });

  useEffect(() => {
    fetch(`https://app-nijat78-dev.apps.sandbox-m3.1530.p1.openshiftapps.com/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setReservation({
          arrival: new Date(data.arrival),
          departure: new Date(data.departure),
          hotel_name: data.hotel_name,
          price: data.price,
          guestsNumber: data.guestsNumber,
          typeOfRoom: data.typeOfRoom,
        });
      })
      .catch((error) => console.error('Error fetching reservation details:', error));
  }, [id]);

  const handleChange = (e) => {
    e.preventDefault();
    clearValidationErrors();

    const { name, value } = e.target;

    setReservation({
      ...reservation,
      [name]: value,
    });

    if (name === 'hotel_name' && !value.trim()) {
      setHotelNameError('Hotel name cannot be empty.');
    }

    if (name === 'price') {
      const priceValue = parseFloat(value);
      if (isNaN(priceValue) || priceValue <= 0) {
        setPriceError('Price must be a positive number.');
      }
    }

    if (name === 'guestsNumber') {
      const guestsValue = parseInt(value, 10);
      if (isNaN(guestsValue) || guestsValue <= 0) {
        setGuestsError('Guests must be a positive number.');
      }
    }

    if (name === 'departure' && reservation.arrival > new Date(value)) {
      setDateError('Departure date cannot be earlier than arrival date.');
    }
  };

  const handleUpdateReservation = () => {
    clearValidationErrors();

    if (!reservation.hotel_name.trim()) {
      setHotelNameError('Hotel name cannot be empty.');
      return;
    }

    const priceValue = parseFloat(reservation.price);
    if (isNaN(priceValue) || priceValue <= 0) {
      setPriceError('Price must be a positive number.');
      return;
    }

    const guestsValue = parseInt(reservation.guestsNumber, 10);
    if (isNaN(guestsValue) || guestsValue <= 0) {
      setGuestsError('Guests must be a positive number.');
      return;
    }

    if (reservation.departure < reservation.arrival) {
      setDateError('Departure date cannot be earlier than arrival date.');
      return;
    }

   
    fetch(`https://app-nijat78-dev.apps.sandbox-m3.1530.p1.openshiftapps.com/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        arrival: reservation.arrival,
        departure: reservation.departure,
        hotel_name: reservation.hotel_name,
        price: priceValue, 
        guestsNumber: guestsValue, 
        typeOfRoom: reservation.typeOfRoom,
      })
    })
      .then((response) => {
        if (response.ok) {
          console.log('Reservation updated successfully');
          navigate('/');
        } else {
          console.error('Failed to update reservation');
        }
      })
      .catch((error) => console.error('Error updating reservation:', error));
  };

  const clearValidationErrors = () => {
    setHotelNameError('');
    setPriceError('');
    setGuestsError('');
    setDateError('');
  };

  return (
    <div className="reserv-form">
      <h1>Edit Reservation</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>Hotel name</label>
        <input
          type="text"
          name="hotel_name"
          value={reservation.hotel_name}
          onChange={handleChange}
        />
        <span className="error">{hotelNameError}</span>

        <div className="date-container">
          <label>Arrival</label>
          <div className="date">
            <DatePicker
              selected={reservation.arrival}
              onChange={(date) =>
                setReservation({ ...reservation, arrival: date })
              }
              dateFormat="dd/MM/yyyy"
            />
            <FontAwesomeIcon icon={faCalendar} />
          </div>
          <label>Departure</label>
          <div className="date">
            <DatePicker
              selected={reservation.departure}
              onChange={(date) =>
                setReservation({ ...reservation, departure: date })
              }
              dateFormat="dd/MM/yyyy"
            />
            <FontAwesomeIcon icon={faCalendar} />
          </div>
          <span className="error-dt">{dateError}</span>
        </div>

        <label>Room type</label>
        <select
          name="typeOfRoom"
          value={reservation.typeOfRoom}
          onChange={handleChange}
        >
          <option value="Single">Single</option>
          <option value="Double">Double</option>
          <option value="Suit">Suit</option>
        </select>

        <label>Guests</label>
        <input
          type="number"
          name="guestsNumber"
          value={reservation.guestsNumber}
          onChange={handleChange}
        />
        <span className="error">{guestsError}</span>

        <label className="price">Price</label>
        <input
          type="number"
          name="price"
          value={reservation.price}
          onChange={handleChange}
        />
        <span className="error">{priceError}</span>

        <div className="buttons">
          <button className="submit" onClick={handleUpdateReservation}>
            Update
          </button>
          <Link to="/">
            <button className="cancel">Cancel</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default EditReservation;


