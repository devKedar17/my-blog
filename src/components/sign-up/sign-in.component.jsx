import {  useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import './sign-in.styles.scss';
import {
    signInWithGooglePopUp,
    signInAuthUserWithEmailAndPassword ,
    updateUserLoginTime
}
from '../../utils/firebase/firebase.utils';

const defaultFormFields= {
    email:'',
    password:''
};

const SignInForm = () =>{
    const [ formFields , SetFormFields ] = useState(defaultFormFields);
    const { email, password } = formFields;

    //google pop up signIn
    const logGoogleUser = async () => {
        const {user}= await signInWithGooglePopUp();
        // console.log(user);
        // const userDocRef= await createUserDocumentFromAuth(user);
    }

    const resetFormFields = () =>{
        SetFormFields(defaultFormFields);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            const {user}  = await signInAuthUserWithEmailAndPassword(email,password);
            console.log(user);
            await updateUserLoginTime(user);
            resetFormFields();
        }catch(error){
            console.log(error);
            if(error.code === 'auth/wrong-password'){
                alert('Please Enter a valid password.');
            }else if(error.code === 'auth/user-not-found'){
                alert('Invalid Login')
            }else{
                alert('Logged In')
                //console.log(error);
            }
        }

    }
    const handleChange = (event) =>{
        const {name, value } = event.target;
        SetFormFields({ ...formFields, [name]: value});
    };

    return(
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password! </span>
            <form onSubmit={handleSubmit}>
                
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
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type='button' buttonType='google' onClick={logGoogleUser}>Google Sign In</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;
