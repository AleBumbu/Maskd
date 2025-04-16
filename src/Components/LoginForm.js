import {useState} from 'react';
import RedirectingButton from './RedirectingButton';
import bcrypt from "bcryptjs";
import { useNavigate } from 'react-router';

function LoginForm() {

    const navigate = useNavigate();

    const [username, setUsername] = useState(''); //declares the constant username and the method with which to change it.
    const [password, setPassword] = useState(''); //declares the constant password and the method with which to change it.
    const [mistakeMessage, setmistakeMessage]= useState(''); //changes if the user does something wrong to display a message that describes what they did wrong.

    const handleSubmit = (e) => {  //function called when the form is submitted
      e.preventDefault();  //prevents the page from being refreshed when the form is submitted
      fetch(`http://localhost:8000/login?username=${username}`) //finds an object that contains the string in the username constant
      .then(res => {
        return res.json() //any objects found are returned
      })
      .then(data => { //any objects returned are put in the data array
        if (data.length !== 0) { //if the data array is not empty
        let comparison = bcrypt.compareSync(password, data[0]?.hashedPassword);// takes the password input and hashes it using the same salt as the password it is comparing. After it compares the two hashes and determines if they match.
        comparison === true ? navigate("/mainPage" , {state : {user : username}}) : resetter(); //redirects to the main page if the passwords match and outputs a message otherwise
      } else { //if the data array is empty
        resetter() // calls the resetter function
      }
      })
    }

    const resetter = () => {
      setmistakeMessage('Invalid Credentials'); //cahnges the mistakeMessage constant to display a suitable error message
      setUsername(''); //Resets the username input to empty
      setPassword('') //Resets the password input to empty
    }
  

  return (
    <div className='accountForm'>
      <form onSubmit={handleSubmit}> 
        <label>
            Username: 
        </label>
        <input
          type = "text"
          required
          value = {username}
          onChange = {(e) => setUsername(e.target.value)}
        />
        <label>
            Password: 
        </label>
        <input
          type = "password"
          required
          value = {password}
          onChange = {(e) => setPassword(e.target.value)}
        />
        <p>{mistakeMessage}</p>
        <button className='redirectingButton'>Login</button>
        <RedirectingButton prop1 = "/signUp" prop2="Go to Sign Up" className = "bottomOfBox"/>
      </form>
    </div>
  )
}

export default LoginForm
