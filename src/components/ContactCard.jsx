import React, { useState } from 'react'
import { RiEditCircleLine } from 'react-icons/ri';
import { IoMdTrash } from 'react-icons/io';
import { HiOutlineUserCircle } from 'react-icons/hi';
import { deleteDoc , doc} from 'firebase/firestore';
import { db } from '../config/Firebase'
import AddAndUpdateContact from './AddAndUpdateContact';
import useDisclosure from '../hooks/useDisclosure';
import { toast } from 'react-toastify';
const ContactCard = ({contact}) => {

  const {isOpen , onClose, onOpen} = useDisclosure();
  const deleteContactCard = async (id)=>{
    
    try {
      await deleteDoc(doc(db, "contact", id));
      onClose();
      toast.success("Contact Deleted Successfully");  
      
    } catch (error) {
      console.log(error);
      
    }

  }
  return (
    <>
    <div key={contact.id} className=' bg-yellow flex justify-between items-center p-2 rounded-lg'>
           <div className='flex gap-1'>
            <HiOutlineUserCircle className='text-orange text-4xl'/>
           <div className=''>
              <h2 className=' font-medium'>{contact.name}</h2>
              <p className=' text-sm'>{contact.email}</p>
            </div>
           </div>
            <div className='flex text-3xl '>
              <RiEditCircleLine  className=' cursor-pointer' onClick={onOpen}/>
              <IoMdTrash className='text-orange cursor-pointer' onClick={(id)=>deleteContactCard(contact.id)}/>
            </div>
          </div>
          <AddAndUpdateContact  isUpdate isOpen={isOpen} onClose={onClose} contact={contact}/>
        </>
  )
}

export default ContactCard
