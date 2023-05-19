import {  useState } from "react";
import {  useNavigate } from "react-router-dom";
import FormInput from "../form-input/form-input.component";
import './sign-up.styles.scss';
import Button from "../button/button.component";
import { createUserDocumentFromAuth, insertUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
const defaultFormFields= {
    displayName: '',
    email:'',
    password:'',
    confirmPassword:'',

};
const SignUpForm = () =>{
    const [ formFields , SetFormFields ] = useState(defaultFormFields);
    const { displayName, email, password,confirmPassword } = formFields;
    const navigate = useNavigate();
    
    console.log('hit');

    const resetFormFields = () =>{
        SetFormFields(defaultFormFields);
    }
    const handleSubmit = async (event)=>{
        event.preventDefault();
        if(password !== confirmPassword){
            alert('Password doesnot matched');
            return;
        }
        try{
            const {user} = await insertUserWithEmailAndPassword(email,password);
            await createUserDocumentFromAuth(user, { displayName });
            resetFormFields();
            navigate("/");
        }catch(error){
            if(error.code === 'auth/email-already-in-use'){
                alert('Email is alreday used.')
            }else{
                console.log(error);
            }
        }


    }
    const handleChange = (event) =>{
        const {name, value } = event.target;
        SetFormFields({ ...formFields, [name]: value});
    };

    return(
        <div className="sign-up-container">
        <h2>Don't have an account</h2>
            <span>Sign up with your email and password! </span>
            <form onSubmit={handleSubmit} >
                <FormInput
                    label="Dispaly Name"
                    type="text" 
                    required 
                    onChange={handleChange}
                    name='displayName'
                    value={displayName}
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
                    label="Password" 
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name="password" 
                    value={password}
                />
              
                <FormInput 
                    label="Confirm Password" 
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name="confirmPassword" 
                    value={confirmPassword}
                />
                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;