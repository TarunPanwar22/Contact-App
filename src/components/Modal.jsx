import React from 'react'
import { createPortal } from 'react-dom'
import {AiOutlineClose} from 'react-icons/ai'
const Modal = ({onClose , isOpen , children}) => {
  return createPortal(
    <>
    
    {isOpen && ( 

        <div className=' grid place-items-center backdrop-blur h-screen w-screen absolute top-0 z-40' >
        <div className=' m-auto min-h-[200px] min-w-[80%] bg-white z-50 relative p-4'>
        
        <div className='flex justify-end'>
            <AiOutlineClose className=" text-2xl " onClick={onClose}/>
        </div>
        {children}
        </div>
        

       
        
        </div>

    )}
    
    </>
    , document.getElementById("modal-root")
  )
}

export default Modal
