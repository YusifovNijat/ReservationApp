import React from 'react'
import './DeleteModal.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const DeleteModal = ({showDeleteModal, setShowDeleteModal, handleDelete}) => {

    const className = showDeleteModal ? "delete-modal" : "delete-modal noShow";


  return (
    <div className={className}>
        <FontAwesomeIcon icon={faExclamationTriangle} />
        <div className="delete-text">
            <h2>Are you sure?</h2>
            <p>This action cannot be undone. All values associated with this field will be lost</p>
        </div>
        <div className="deleteModal-buttons">
            <button className="yes" onClick={handleDelete}>yes</button>
            <button className='no' onClick={()=>setShowDeleteModal(false)}>no</button>
        </div>
    </div>
  )
}

export default DeleteModal;