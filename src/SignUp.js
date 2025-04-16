import './App.css';
import SignUpForm from './Components/SignUpForm';
import RedirectingButton from './Components/RedirectingButton';

function SignUp() {
  return (
    <div className='container'>
        <div className="login">

            <h1>Sign Up</h1>

            <SignUpForm />{/* render the sign up form */}
        </div>
    </div>
  )
}

export default SignUp
