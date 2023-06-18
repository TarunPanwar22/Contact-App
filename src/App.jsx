import React, { useState } from 'react'
import Navbar from './components/Navbar'
import {FiSearch} from 'react-icons/fi'
import {AiFillPlusCircle} from 'react-icons/ai'
import {HiOutlineUserCircle} from 'react-icons/hi';
import { useEffect } from 'react';
import {collection, getDocs, onSnapshot} from 'firebase/firestore'
import { db } from './config/Firebase';
import {IoMdTrash} from 'react-icons/io';
import {RiEditCircleLine} from 'react-icons/ri';
import ContactCard from './components/ContactCard';
import Modal from './components/Modal';
import AddAndUpdateContact from './components/AddAndUpdateContact';
import useDisclosure from './hooks/useDisclosure';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFoundContact from './components/NotFoundContact';
const App = () => {

  const [contacts , setContacts ] = useState([]);
  const {isOpen , onClose , onOpen } = useDisclosure();

  useEffect(()=>{

    const getContacts = async() =>{

      try {
       
        const contactRef = collection(db , "contact"); 
        // const contactSnapshot = await getDocs(contactRef);
        onSnapshot( contactRef , (snapshot) =>{

          const contactList = snapshot.docs.map((doc)=>{
            return ({
              ...doc.data(),
              id: doc.id
            })
          })
          setContacts(contactList);
          return contactList;

        })
      } 
      catch (error) {
        console.log(error);        
      }


    
    }

    getContacts();

  }, [])

  const filterContacts = (e)=>{
    const value = e.target.value; 
    const contactRef = collection(db , "contact"); 
        // const contactSnapshot = await getDocs(contactRef);
        onSnapshot( contactRef , (snapshot) =>{

          const contactList = snapshot.docs.map((doc)=>{
            return ({
              ...doc.data(),
              id: doc.id
            })
          })


          const filteredContacts = contactList.filter(contact => contact.name.toLowerCase().includes(value.toLowerCase()))

          
          setContacts(filteredContacts);
          
          
          return filteredContacts;
          
        })

  }

  return (

    <>
    
    <div className='max-w-[370px] mx-auto px-4'>
      <Navbar/>
      <div className=' flex gap-2'>
      <div className=' flex relative items-center ml-1 flex-grow'>
        <FiSearch className=' text-white text-3xl absolute'/>
        <input onChange={filterContacts} type="text" className=' border bg-transparent rounded-md border-white h-10 flex-grow text-white pl-9'/>
      </div>
      <div className=' text-5xl text-white cursor-pointer'>
        <AiFillPlusCircle onClick={onOpen}/>
      </div>
      </div>

      <div className=' mt-4 gap-4 flex flex-col'>
        {contacts.length <=0 ? <NotFoundContact/> : contacts.map(contact => (
          <ContactCard key={contact.id} contact={contact}/>
        ))}
      </div>
    </div>
    <AddAndUpdateContact contact = {contacts} isOpen={isOpen} onClose={onClose}/>
    <ToastContainer position='bottom-center'/>
    </>
  )
}

export default App
