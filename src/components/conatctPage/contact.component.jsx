import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import {createContactDocument , getAllContactMessage} from '../../utils/firebase/firebase.utils';
import './contact.style.scss';
const defaultFormFields= {
    name: '',
    email:'',
    phone:'',
    subject:'',
    message:''

};
const Contact = () => {
    const [ formFields , SetFormFields ] = useState(defaultFormFields);
    const { name, email, phone, subject, message } = formFields;
    const [contactMail, setContactMail] = useState('');

    const [contactList, setContactList] = useState([]);
    const getContactData = async () =>{
        const resultData= await getAllContactMessage();
        console.log(resultData);
        const data = resultData.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
          }));
          setContactList(data);
    }
    const resetFormFields = () =>{
        SetFormFields(defaultFormFields);
    }
    const handleSubmit = async (event) =>{
        event.preventDefault();
        const response = await createContactDocument(formFields);
        setContactMail(response);
        resetFormFields();
  
    }
    const handleChange = (event) =>{
        const {name, value } = event.target;
        SetFormFields({ ...formFields, [name]: value});
    };
    return(
        <div className="container">
       {contactMail ? (<h2>Thank for contact with us we will reach you soon on your provided email id: {contactMail}</h2>):('')}
            <span>Fill the form to contact with us </span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Dispaly Name"
                    type="text" 
                    required 
                    onChange={handleChange}
                    name="name"
                    value={name}
                />
                
                <FormInput 
                    label="Email" 
                    type="email" 
                    required 
                    onChange={handleChange} 
                    name="email" 
                    value={email}
                />
                
                <FormInput 
                    label="phone" 
                    type="text" 
                    required 
                    onChange={handleChange} 
                    name="phone" 
                    value={phone}
                />
              
                <FormInput 
                    label="Subject" 
                    type="text" 
                    required 
                    onChange={handleChange} 
                    name="subject" 
                    value={subject}
                />
                <FormInput 
                    label="Message" 
                    type="text" 
                    required 
                    onChange={handleChange} 
                    name="message" 
                    value={message}
                />
                <Button type="submit">Contact Us</Button>
            </form>
            
            
        </div>
        
    )

}

export default Contact;