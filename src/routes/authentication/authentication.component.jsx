import './authenticate-style.scss';
import SignUpForm from "../../components/sign-up/sign-up.component";
import SignInForm from "../../components/sign-up/sign-in.component";
const Authentication = ()=>{
    return (
        <div className="authenticate-container">
        <SignInForm />
        <SignUpForm />
        </div>
        
    )
}

export default Authentication;