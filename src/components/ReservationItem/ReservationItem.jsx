import React, {useState} from 'react'
import './ReservationItem.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import DeleteModal from "../ModalMessages/DeleteModal";

function ReservationItem({onDelete, hotelName, arrival, departure, type, guests, price, id}) {

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  const handleDelete = () => {

    fetch(`${process.env.REACT_APP_API_KEY}${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          onDelete(id);
        } else {
          console.error(`Failed to delete reservation with ID ${id}`);
        }
      })
      .catch((error) => {
        console.error('Error deleting reservation:', error);
      });
  };


  return (
    <>
        <ul className='reserv-item'>
        <li>{hotelName}</li>
        <li>{arrival}</li>
        <li>{departure}</li>
        <li>{type}</li>
        <li>{guests}</li>
        <li>${price}</li>
        <li>
          <Link to={`/edit/${id}`}>
            <FontAwesomeIcon className='pen' icon={faPen} />
          </Link>
            <FontAwesomeIcon className='trash' icon={faTrash} onClick={()=>setShowDeleteModal(true)} />
        </li>
    </ul>
    <DeleteModal showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} handleDelete={handleDelete}/>
    </>
    
  )
}

export default ReservationItem;