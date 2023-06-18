import React from 'react'
import Modal from './Modal'
import { Formik ,  Form , Field, ErrorMessage } from 'formik'
import {db} from '../config/Firebase'; 
import {addDoc , collection, doc, updateDoc } from 'firebase/firestore'; 
import {toast} from "react-toastify";
import * as Yup from 'yup'


const contactSchemaValidation = Yup.object().shape({
    name: Yup.string().required("Name is Required"),
    email: Yup.string().email("Invalid Email").required("Email is Required"),

})

const AddAndUpdateContact = ({isOpen , onClose , isUpdate , contact}) => {

    const addContact = async (contact) =>{
        try{
            const contactRef = collection(db , "contact");
            await addDoc(contactRef , contact); 
            onClose(); 
            toast.success("Contact Added Successfully");
        }
        catch(error){
            console.log(error);
        }
    }

    const updateContact = async (contact, id) => {
        try {
          const contactRef = doc(db, "contact", id);
          await updateDoc(contactRef, contact);
          onClose();
          toast.success("Contact Updated Successfully");
        } catch (error) {
          console.log(error);
        }
      };
    
  return (
    <div>
       <Modal isOpen={isOpen} onClose={onClose}>
       <Formik 
       validationSchema={contactSchemaValidation}
       initialValues={isUpdate ? {
        name: contact.name , 
        email: contact.email,
    }: {
        name: "", 
        email: "", 

       }}
       onSubmit={(values)=>{
        console.log(values);
        isUpdate ? updateContact(values, contact.id) : addContact(values);
       }}>
        <Form className=' flex flex-col gap-4'>
            <div className='flex flex-col gap-1'>
                <label htmlFor="name">Name</label>
                <Field name="name" className=" border h-10 pl-2"/>
                <div className='text-red-500 text-xs'>
                    <ErrorMessage name="name"/>
                </div>
           </div>
            <div className='flex flex-col gap-1'>
                <label htmlFor="email">Email</label>
                <Field name="email" className=" border h-10 pl-2"/>
                <div className='text-red-500 text-xs'>
                <ErrorMessage name="email"/>
                </div>
           </div>
           <button className=' bg-orange px-3 py-1.5 border self-end'> {isUpdate ? "Update" : "Add"} contact</button>
        </Form>
       </Formik>
       </Modal>
    </div>
  )
}

export default AddAndUpdateContact
