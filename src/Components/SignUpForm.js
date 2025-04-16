import {useState} from 'react';
import RedirectingButton from './RedirectingButton';
import bcrypt from "bcryptjs";
import { useNavigate } from 'react-router';

function SignUpForm() {

    const navigate = useNavigate(); //calll the use navigate hook to be used later in the function

    const [username, setUsername] = useState(''); //declares the constant username and the method with which to change it.
    const [password, setPassword] = useState(''); //declares the constant password and the method with which to change it.
    const [passwordCheck, setPasswordCheck] = useState(''); //declares the constant passwordCheck and the method with which to change it.
    const [mistakeMessage, setmistakeMessage]= useState(''); //changes if the user does something wrong to display a message that describes what they did wrong.
    const handleSubmit = (e) => {
      e.preventDefault(); //prevents the page from refreshing on submit
      
      fetch(`http://localhost:8000/accounts?username=${username}`) //finds an object that contains the string in the username constant
        .then(res => {
          return res.json() //any objects found are returned
        })
        .then(data => { //any objects returned are put in the data array
          data === true ? usernameInUse() : newAccountMaker() //If data is true the usernameInUse function runs and if usernameMatch is false the mewAccountMaker function runs

        })
      
    }
    const newAccountMaker = () => {
      if (password === passwordCheck) { //security measure against mistyping, checks that the 2 password user inputs are the same.
        const salt = bcrypt.genSaltSync(10); //generates a salt to be used while hashing. 
        const hashedPassword = bcrypt.hashSync(password , salt); //hashes the password from the user input using the newly generated salt.
        const newAccount = { username, hashedPassword } //the username and password hash are put in a Javascript object to be used when posting it to the JSON file.
        console.log(JSON.stringify(newAccount))
        fetch("http://localhost:8000/newAccount", { //makes a request to the API
          method: "POST", //specifies that the request is a POST HTTP request
          headers: {"Content-Type": "application/json"}, //specifies that the body, or payload, is a JSON string
          body: JSON.stringify(newAccount)//turns the Javascript object into a JSON string and is specified as the main body of the POST request, to be added to the JSON file
        }).then(() => { 
          navigate("/mainPage" , {state : {user : username}}); //takes the user to the main page.
        })
      } else {
        setmistakeMessage('Passwords need to match!'); //sets the variable that displays a message telling the user they have made a mistake in inputting the password to the correct message.
        setUsername(''); //Resets the username input to empty
        setPassword(''); //Resets the password input to empty
        setPasswordCheck('') //Resets the second password input to empty
      }
    }
    const usernameInUse = () => {
      setmistakeMessage('Username already in use!'); //sets the variable that displays a message telling the user they have made a mistake in inputting the password to the correct message.
      setUsername(''); //Resets the username input to empty
      setPassword(''); //Resets the password input to empty
      setPasswordCheck('') //Resets the second password input to empty
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
          onChange = {(e) => setUsername(e.target.value.substring( 0 , 25 ))}
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
        <label>
            Re-enter password: 
        </label>
        <input
          type = "password"
          required
          value = {passwordCheck}
          onChange = {(e) => setPasswordCheck(e.target.value)}
        />
        <p>{mistakeMessage}</p>
        <button className='redirectingButton'>Sign Up</button>
        <RedirectingButton prop1 = "/" prop2="Go to Login" className = "bottomOfBox"/>
      </form>
    </div>
  )
}

export default SignUpForm