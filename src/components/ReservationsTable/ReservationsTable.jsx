import React, {useState, useEffect} from 'react'
import ReservationItem from '../ReservationItem/ReservationItem'
import './ReservationsTable.css'
import RingLoader from 'react-spinners/RingLoader';

function ReservationsTable() {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [reservList, setReservList] = useState([]);

  const onDelete = (id) => {
    const updatedReservations = reservList.filter((reservation) => reservation.id !== id);
    setReservList(updatedReservations);
  };

  useEffect(()=>{
    fetch(process.env.REACT_APP_API_KEY)
    .then(res=>res.json())
    .then((result)=>{
      console.log(result);
      setIsLoaded(true);
      setReservList(result);
    }, (error)=>{
      setIsLoaded(true);
      setError(error);
    })
  },[])

  if(error){
    return <div>Error!!!</div>;
  } else if(!isLoaded){
    return       <RingLoader
    color="#000"
  />
  } else {
    return (
      <div className="reserv-table">
          {reservList.map(reserv=>{
            return <ReservationItem onDelete={onDelete} key={reserv.id} hotelName = {reserv.hotel_name} arrival = {reserv.arrival} departure={reserv.departure} type ={reserv.typeOfRoom} guests={reserv.guestsNumber} price={reserv.price} id={reserv.id}/>
      })}
      </div>
    )
  }
}

export default ReservationsTable;